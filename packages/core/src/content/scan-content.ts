import type { CmsFieldNode, CmsNode, CmsPageManifest, CmsSectionNode } from "./types.ts";

type ParsedTag = {
  tagName: string;
  attrs: Record<string, string>;
  selfClosing: boolean;
  start: number;
  end: number;
};

const ATTR_REGEX = /([a-zA-Z_:][-\w:.]*)\s*(?:=\s*("([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g;
const TAG_REGEX = /<([A-Za-z][\w.-]*)((?:"[^"]*"|'[^']*'|\{[^}]*\}|[^>])*?)(\/?)>/g;

const SECTION_TAG = "Section";
const FIELD_TAG = "Field";
const IMAGE_FIELD_TAG = "ImageField";
const LINK_FIELD_TAG = "LinkField";
const RICH_TEXT_FIELD_TAG = "RichTextField";
const DOWNLOAD_FIELD_TAG = "DownloadField";
const COLLECTION_FIELD_TAG = "CollectionField";
const LEAF_TAGS = new Set([
  FIELD_TAG,
  IMAGE_FIELD_TAG,
  LINK_FIELD_TAG,
  RICH_TEXT_FIELD_TAG,
  DOWNLOAD_FIELD_TAG,
]);

function parseAttrs(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  let match: RegExpExecArray | null;
  ATTR_REGEX.lastIndex = 0;
  while ((match = ATTR_REGEX.exec(attrString))) {
    const name = match[1];
    if (!name) {
      continue;
    }
    attrs[name] = match[3] ?? match[4] ?? match[5] ?? "";
  }
  return attrs;
}

function findTags(source: string): ParsedTag[] {
  const tags: ParsedTag[] = [];
  let match: RegExpExecArray | null;
  TAG_REGEX.lastIndex = 0;
  while ((match = TAG_REGEX.exec(source))) {
    if (source[match.index + 1] === "/") {
      continue;
    }
    const tagName = match[1];
    if (!tagName) {
      continue;
    }
    tags.push({
      tagName,
      attrs: parseAttrs(match[2] ?? ""),
      selfClosing: match[3] === "/",
      start: match.index,
      end: TAG_REGEX.lastIndex,
    });
  }
  return tags;
}

function findMatchingClose(source: string, tag: ParsedTag): { innerEnd: number; outerEnd: number } | null {
  const tagNameEsc = tag.tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const openRe = new RegExp(`<${tagNameEsc}(?=[\\s/>])[^>]*>`, "g");
  const closeRe = new RegExp(`</${tagNameEsc}\\s*>`, "g");
  let depth = 1;
  let pos = tag.end;

  while (depth > 0) {
    closeRe.lastIndex = pos;
    const closeMatch = closeRe.exec(source);
    if (!closeMatch) {
      return null;
    }

    openRe.lastIndex = pos;
    const openMatch = openRe.exec(source);
    if (openMatch && openMatch.index < closeMatch.index && !openMatch[0].endsWith("/>")) {
      depth += 1;
      pos = openMatch.index + openMatch[0].length;
      continue;
    }

    depth -= 1;
    if (depth === 0) {
      return { innerEnd: closeMatch.index, outerEnd: closeMatch.index + closeMatch[0].length };
    }
    pos = closeMatch.index + closeMatch[0].length;
  }

  return null;
}

function stripJsxExpressions(text: string): string {
  return text.replace(/\{\s*(['"`])([\s\S]*?)\1\s*\}/g, "$2").replace(/\{[^{}]*\}/g, "").trim();
}

function normalizeWhitespace(text: string): string {
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function readInnerText(source: string, tag: ParsedTag): string {
  if (tag.selfClosing) {
    return "";
  }
  const close = findMatchingClose(source, tag);
  if (!close) {
    return "";
  }
  return normalizeWhitespace(stripJsxExpressions(source.slice(tag.end, close.innerEnd)));
}

function humanizeKey(key: string): string {
  return key
    .split(".")
    .map((segment) =>
      segment
        .replace(/[-_]+/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase()),
    )
    .join(" ");
}

function labelFor(tag: ParsedTag, key: string): string {
  return tag.attrs.label?.trim() || humanizeKey(key);
}

function buildLeafField(source: string, tag: ParsedTag, key: string): CmsFieldNode {
  const label = labelFor(tag, key);
  if (tag.tagName === IMAGE_FIELD_TAG) {
    return { type: "image", label, default: tag.attrs.src ?? "" };
  }
  if (tag.tagName === DOWNLOAD_FIELD_TAG) {
    return { type: "file", label, default: tag.attrs.href ?? "" };
  }
  const text = readInnerText(source, tag);
  if (tag.tagName === LINK_FIELD_TAG) {
    return { type: "link", label, default: { text, href: tag.attrs.href ?? "" } };
  }
  if (tag.tagName === RICH_TEXT_FIELD_TAG) {
    return { type: "richtext", label, default: text };
  }
  return { type: "text", label, default: text };
}

function buildCollectionField(source: string, tag: ParsedTag, key: string): CmsFieldNode | null {
  const close = findMatchingClose(source, tag);
  if (!close) {
    return null;
  }
  const inner = source.slice(tag.end, close.innerEnd);
  const itemFields: Record<string, CmsFieldNode> = {};
  for (const innerTag of findTags(inner)) {
    if (!LEAF_TAGS.has(innerTag.tagName)) {
      continue;
    }
    const fieldKey = innerTag.attrs.id;
    if (!fieldKey) {
      continue;
    }
    itemFields[fieldKey] = buildLeafField(inner, innerTag, fieldKey);
  }
  const sampleRow: Record<string, unknown> = {};
  for (const [fieldKey, schema] of Object.entries(itemFields)) {
    sampleRow[fieldKey] = schema.default;
  }
  return { type: "collection", label: labelFor(tag, key), fields: itemFields, default: [sampleRow] };
}

function scanScope(source: string, insideSection: boolean): Record<string, CmsNode> {
  const nodes: Record<string, CmsNode> = {};
  const consumedRanges: Array<[number, number]> = [];
  const isConsumed = (pos: number) => consumedRanges.some(([start, end]) => pos >= start && pos < end);
  const tags = findTags(source);

  for (const tag of tags) {
    if (tag.tagName !== SECTION_TAG || tag.selfClosing || isConsumed(tag.start)) {
      continue;
    }
    const sectionKey = tag.attrs.id;
    if (!sectionKey) {
      continue;
    }
    const close = findMatchingClose(source, tag);
    if (!close) {
      continue;
    }
    consumedRanges.push([tag.start, close.outerEnd]);
    const section: CmsSectionNode = {
      type: tag.attrs.type?.trim() || "section",
      label: labelFor(tag, sectionKey),
      content: scanScope(source.slice(tag.end, close.innerEnd), true),
    };
    nodes[sectionKey] = section;
  }

  if (!insideSection) {
    return nodes;
  }

  for (const tag of tags) {
    if (tag.tagName !== COLLECTION_FIELD_TAG || tag.selfClosing || isConsumed(tag.start)) {
      continue;
    }
    const collectionKey = tag.attrs.id;
    if (!collectionKey) {
      continue;
    }
    const field = buildCollectionField(source, tag, collectionKey);
    if (!field) {
      continue;
    }
    const close = findMatchingClose(source, tag);
    if (close) {
      consumedRanges.push([tag.start, close.outerEnd]);
    }
    nodes[collectionKey] = field;
  }

  for (const tag of tags) {
    if (isConsumed(tag.start) || !LEAF_TAGS.has(tag.tagName)) {
      continue;
    }
    const fieldKey = tag.attrs.id;
    if (!fieldKey) {
      continue;
    }
    nodes[fieldKey] = buildLeafField(source, tag, fieldKey);
  }

  return nodes;
}

/** Collects `<Section>` / field markers. Fields outside a section are ignored. */
export function scanSourceContent(source: string): CmsPageManifest {
  return scanScope(source, false);
}
