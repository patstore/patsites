// Matches the @repo/server live-read helper. Regenerated when PatStore credentials are set.
import { createServerFn } from "@tanstack/react-start";
import { createDataContext, loadContent } from "@repo/server";
import type { ArticleClass, ImageClass } from "./types";

export const publicClassNames = ["Article", "Image"] as const;

export type PublicClassName = (typeof publicClassNames)[number];

export type PublicCollections = {
  Article: ArticleClass[];
  Image: ImageClass[];
};

export const getLiveCollection = createServerFn({ method: "GET" })
  .validator((value: unknown) => {
    const name = typeof value === "string" ? value : "";
    if (!(publicClassNames as readonly string[]).includes(name)) {
      throw new Error(`Unknown PatStore class: ${name || "empty"}`);
    }
    return name as PublicClassName;
  })
  .handler(async ({ data }): Promise<PublicCollections[typeof data]> => {
    const rows = await loadContent(data, createDataContext({ mode: "ssr", states: null }));
    return rows as unknown as PublicCollections[typeof data];
  });
