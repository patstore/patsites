import { shouldStoreClass } from "./collection-keys.ts";
import { readSnapshotRecords, getStaticSnapshot } from "./snapshot.ts";
import { createDataContext, filterByStates } from "./state.ts";
import type { DataContext } from "./types.ts";

const PRIVATE_CLASSES = new Set(["User", "_User", "Email"]);

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

function readDraftModeFlag(): string | undefined {
  if (process.env.VITE_DRAFT_MODE) {
    return process.env.VITE_DRAFT_MODE;
  }
  try {
    return import.meta.env?.VITE_DRAFT_MODE;
  } catch {
    return undefined;
  }
}

/** `VITE_DRAFT_MODE=true` loads live PatStore records, including unpublished ones. */
export function isDraftMode(): boolean {
  return readDraftModeFlag() === "true";
}

/**
 * Public content for one class.
 * Draft mode off reads the published snapshot. Draft mode on fetches PatStore
 * and keeps every state. Account classes are refused.
 */
export async function fetchCollection<
  T extends Record<string, unknown> = Record<string, unknown>,
>(className: string): Promise<T[]> {
  const name = className.trim();
  if (!name || PRIVATE_CLASSES.has(name) || !shouldStoreClass(name)) {
    throw new Error(
      `${name || "This class"} is not public content. Account data is loaded through the session routes.`,
    );
  }
  const context = createDataContext({
    mode: isDraftMode() ? "ssr" : "static",
    states: isDraftMode() ? null : ["published"],
  });
  // The published snapshot is bundled in the client. Live PatStore reads stay on the server.
  if ("window" in globalThis) {
    if (context.mode !== "static") {
      throw new Error("fetchCollection can only be called on the server.");
    }
    return loadStaticRecords<T>(name, context);
  }
  return loadContent<T>(name, context);
}
