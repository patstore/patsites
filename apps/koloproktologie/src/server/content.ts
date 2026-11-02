import "@data";
import { createDataContext, loadContent, type DataContext, type DataMode } from "@repo/server";

export { createDataContext, loadContent };
export type { DataContext, DataMode };

/** Snapshot read. `states` can be any CMS state allow-list. */
export const publishedStatic = createDataContext({
  mode: "static",
  states: ["published"],
});

/**
 * Load records for this request.
 * `mode: "static"` reads the generated snapshot, including during server rendering.
 * `mode: "ssr"` fetches from PatStore on the server, with the same state allow-list.
 * Choose `states` on the server. Do not forward an unsanitized client value when
 * that would expose unpublished records.
 */
export const loadServerContent = loadContent;
