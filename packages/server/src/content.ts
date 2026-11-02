import { readSnapshotRecords, getStaticSnapshot } from "./snapshot.ts";
import { filterByStates } from "./state.ts";
import type { DataContext } from "./types.ts";

export function loadStaticRecords<T extends Record<string, unknown> = Record<string, unknown>>(
  className: string,
  context: Pick<DataContext, "states">,
): T[] {
  const snapshot = getStaticSnapshot();
  if (!snapshot) {
    return [];
  }
  const records = readSnapshotRecords(snapshot, className);
  return filterByStates(records, context.states) as T[];
}

/**
 * Read one class for the given context.
 * `mode: "static"` uses the generated snapshot, including during server rendering.
 * `mode: "ssr"` loads the same class from PatStore on the server.
 * `states` is an allow-list of any CMS state, or `null` for every state.
 */
export async function loadContent<T extends Record<string, unknown> = Record<string, unknown>>(
  className: string,
  context: DataContext,
): Promise<T[]> {
  if (context.mode === "static") {
    return loadStaticRecords<T>(className, context);
  }
  const { loadLiveRecords } = await import("./live.ts");
  return loadLiveRecords<T>(className, context);
}
