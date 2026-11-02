export type CmsFieldType = "text" | "richtext" | "image" | "link" | "file" | "collection";

export type CmsFieldNode = {
  type: CmsFieldType;
  label: string;
  default: unknown;
  /** Present only when `type === "collection"` — schema for one repeated item. */
  fields?: Record<string, CmsFieldNode>;
};

export type CmsSectionNode = {
  type: string;
  label: string;
  content: Record<string, CmsNode>;
};

export type CmsNode = CmsFieldNode | CmsSectionNode;

export function isSectionNode(node: CmsNode): node is CmsSectionNode {
  return "content" in node;
}

export type CmsPageManifest = Record<string, CmsNode>;

export type LocalizedPageContent = {
  default: CmsPageManifest;
  [locale: string]: CmsPageManifest;
};

export type CmsManifest = {
  pages: Record<string, CmsPageManifest>;
};

export type CmsPathValue = {
  path: string;
  value: unknown;
};

export type CmsContentMap = {
  _meta: {
    generatedAt: string;
    projectId: string;
    source: "cms" | "defaults";
    languages: string[];
  };
  pages: Record<string, CmsPathValue[]>;
};

export type CmsContentFile = CmsContentMap;
