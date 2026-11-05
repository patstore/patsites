import { createGraphQLClient, fetchClassRecords, fetchModules } from "./fetch.ts";
import { findModule, readPatStoreEnv, readProcessEnv } from "./modules.ts";
import { getStaticSnapshot, readSnapshotModules } from "./snapshot.ts";
import { filterByStates } from "./state.ts";
import type { DataContext } from "./types.ts";

/**
 * Live GraphQL read for server rendering.
 * Import this from server code only. Credentials are read from `process.env`
 * at call time and are not referenced as `VITE_*` identifiers.
 */
export async function loadLiveRecords<
  T extends Record<string, unknown> = Record<string, unknown>,
>(className: string, context: DataContext): Promise<T[]> {
  if ("window" in globalThis) {
    throw new Error("Server-rendered PatStore data can only be loaded on the server.");
  }
  const env = readPatStoreEnv(readProcessEnv());
  if (!env) {
    throw new Error(
      "PatStore is not configured. Set PATSTORE_GRAPHQL_API_URL, PATSTORE_APP_ID, PATSTORE_PROJECT_ID, and PATSTORE_REST_KEY.",
    );
  }

  const client = createGraphQLClient(env);
  const cachedModules = readSnapshotModules(getStaticSnapshot());
  const modules =
    cachedModules.length > 0 ? cachedModules : await fetchModules(client, env.projectId);
  const module = findModule(modules, className);
  if (!module) {
    return [];
  }

  const records = await fetchClassRecords(client, module, env.projectId, context.states);
  return filterByStates(records, context.states) as T[];
}
