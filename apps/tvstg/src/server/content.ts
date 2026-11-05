import "@data";
import { createDataContext, loadContent, type DataContext, type DataMode } from "@repo/server";

export { createDataContext, loadContent };
export type { DataContext, DataMode };

/**
 * Snapshot read. The Vite plugin stores every state; this allow-list
 * keeps published records, plus records that have no state field.
 */
export const publishedStatic = createDataContext({
  mode: "static",
  states: ["published"],
});

/** Live PatStore read during server rendering, with the same state allow-list. */
export const publishedSsr = createDataContext({
  mode: "ssr",
  states: ["published"],
});

export const loadServerContent = loadContent;
