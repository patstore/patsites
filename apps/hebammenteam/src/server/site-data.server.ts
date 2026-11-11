import "@tanstack/react-start/server-only";
import type { PatstoreData, PatstoreWebpage } from "@types";
import { canonicalPath } from "../provider/functions/paths";
import { getCollection } from "./patstore.server";

function collectImageIds(value: unknown, ids: Set<string>) {
  if (!value || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectImageIds(item, ids));
    return;
  }

  const record = value as Record<string, unknown>;
  for (const key of ["image", "portrait"] as const) {
    if (typeof record[key] === "string" && record[key]) {
      ids.add(record[key] as string);
    }
  }
  if (Array.isArray(record.gallery)) {
    record.gallery.forEach((id) => typeof id === "string" && ids.add(id));
  }
  if (record.type === "image" && typeof record.value === "string") {
    ids.add(record.value);
  }
  collectImageIds(record.content, ids);
  collectImageIds(record.data, ids);
}

/**
 * Webpages whose path equals one of `paths`, content blocks addressed by
 * `contentIds`, and the table blocks either of them embed.
 * Matching is exact, so `/kurse` does not include `/kurse/rueckbildung`.
 */
export async function selectPageContent({
  paths = [],
  contentIds = [],
}: {
  paths?: string[];
  contentIds?: string[];
}): Promise<Pick<PatstoreData, "Webpage" | "Content">> {
  const [webpages, contents] = await Promise.all([
    getCollection("Webpage"),
    getCollection("Content"),
  ]);

  const wanted = new Set(paths.map((path) => canonicalPath(path)));
  const pages = webpages.filter((page) => wanted.has(canonicalPath(page.path)));
  const blocks = contents.filter(
    (content) => content.content_id && contentIds.includes(content.content_id),
  );
  const embeddedIds = new Set(
    [...pages.flatMap((page) => page.content ?? []), ...blocks.map((block) => block.data)]
      .filter((item): item is { type?: string; value?: string } =>
        Boolean(item && typeof item === "object"),
      )
      .filter((item) => item.type === "table" && typeof item.value === "string")
      .map((item) => item.value as string),
  );
  const tables = contents.filter((content) => embeddedIds.has(content.objectId));

  return { Webpage: pages, Content: [...blocks, ...tables] };
}

export function findWebpage(
  pages: PatstoreWebpage[],
  paths: string[],
): PatstoreWebpage | undefined {
  const wanted = new Set(paths.map((path) => canonicalPath(path)));
  return pages.find((page) => wanted.has(canonicalPath(page.path)));
}

/** Attach exactly the image records referenced by the given data. */
export async function withImages(data: PatstoreData): Promise<PatstoreData> {
  const ids = new Set<string>();
  for (const [className, items] of Object.entries(data)) {
    if (className !== "Image") {
      collectImageIds(items, ids);
    }
  }
  if (ids.size === 0) {
    return data;
  }

  const images = await getCollection("Image");
  return { ...data, Image: images.filter((image) => ids.has(image.objectId)) };
}
