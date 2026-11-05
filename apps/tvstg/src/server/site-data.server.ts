import "@tanstack/react-start/server-only";
import type { PatstoreArticle, PatstoreData } from "@types";
import { getCollection } from "./patstore.server";

export const isPublished = (item: { state: string | null }) =>
  item.state === "published";

export const byDateDesc = (a: { date: string | null }, b: { date: string | null }) =>
  new Date(b.date || "").getTime() - new Date(a.date || "").getTime();

/** List views never render the article body or gallery, so keep them off the wire. */
export const summarizeArticle = (article: PatstoreArticle): PatstoreArticle => ({
  ...article,
  text: null,
  gallery: [],
});

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
  collectImageIds(record.team, ids);
  collectImageIds(record.content, ids);
  collectImageIds(record.data, ids);
}

/**
 * Webpages whose path contains one of `paths`, content blocks addressed by
 * `contentIds`, and the table blocks either of them embed.
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

  const pages = webpages.filter((page) =>
    paths.some((path) => page.path?.includes(path)),
  );
  const blocks = contents.filter(
    (content) => content.content_id && contentIds.includes(content.content_id),
  );
  const embeddedIds = new Set(
    [...pages.flatMap((page) => page.content), ...blocks.map((block) => block.data)]
      .filter((item) => item?.type === "table")
      .map((item) => item.value as string),
  );
  const tables = contents.filter((content) => embeddedIds.has(content.objectId));

  return { Webpage: pages, Content: [...blocks, ...tables] };
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
