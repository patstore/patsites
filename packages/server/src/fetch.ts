import { GraphQLClient } from "graphql-request";
import { getCollectionKey, getStorageKey, shouldStoreClass } from "./collection-keys.ts";
import {
  buildSelection,
  isDownloadableFileField,
  selectionWithoutMissingField,
} from "./fields.ts";
import { FileDownloader } from "./files.ts";
import { moduleHasStateField, normalizeModule, normalizeRecord } from "./modules.ts";
import { stateWhere } from "./state.ts";
import type { DownloadedFile, PatStoreEnv, PatStoreModule } from "./types.ts";

export interface StaticRecords {
  modules: PatStoreModule[];
  collections: Record<string, Record<string, unknown>[]>;
  downloadedFiles: DownloadedFile[];
}

function authHeaders(env: PatStoreEnv): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Parse-Application-Id": env.appId,
  };
  if (env.masterKey) {
    headers["X-Parse-Master-Key"] = env.masterKey;
  }
  if (env.restKey) {
    headers["X-Parse-Rest-Api-Key"] = env.restKey;
  }
  return headers;
}

export function createGraphQLClient(env: PatStoreEnv): GraphQLClient {
  return new GraphQLClient(env.graphqlUrl, { headers: authHeaders(env) });
}

function projectWhere(projectId: string, states: Record<string, unknown> | null): Record<string, unknown> {
  const where: Record<string, unknown> = {
    project: { have: { objectId: { equalTo: projectId } } },
  };
  if (states) {
    where.state = states;
  }
  return where;
}

const MODULE_SELECTION = `
  name
  connected_class
  fields { ... on Element { value } }
  data_fields { ... on Element { value } }
`;

export async function fetchModules(
  client: GraphQLClient,
  projectId: string,
): Promise<PatStoreModule[]> {
  const query = `
    query ServerModules($params: ModuleWhereInput, $first: Int, $skip: Int, $order: [ModuleOrder!]) {
      modules(where: $params, first: $first, skip: $skip, order: $order) {
        count
        edges { node { id objectId ${MODULE_SELECTION} } }
      }
    }
  `;
  return paginate(client, query, "modules", projectWhere(projectId, null), (node) =>
    normalizeModule(node),
  );
}

export async function fetchClassRecords(
  client: GraphQLClient,
  module: PatStoreModule,
  projectId: string,
  states: readonly string[] | null,
): Promise<Record<string, unknown>[]> {
  const className = module.connected_class;
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(className)) {
    throw new Error(`Unsupported class name: ${className}`);
  }
  let selection = buildSelection(module);
  const where = projectWhere(
    projectId,
    moduleHasStateField(module) ? stateWhere(states) : null,
  );
  const collectionKey = getCollectionKey(className);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const query = `
      query ServerFind${className}($params: ${className}WhereInput, $first: Int, $skip: Int, $order: [${className}Order!]) {
        ${collectionKey}(where: $params, first: $first, skip: $skip, order: $order) {
          count
          edges { node { id objectId ${selection} } }
        }
      }
    `;
    try {
      return await paginate(client, query, collectionKey, where, (node) =>
        normalizeRecord(node),
      );
    } catch (error) {
      const next = selectionWithoutMissingField(selection, error);
      if (!next) {
        console.error(
          `PatStore fetch failed for ${className}:`,
          error instanceof Error ? error.message : error,
        );
        return [];
      }
      selection = next;
    }
  }

  return [];
}

async function paginate<T>(
  client: GraphQLClient,
  query: string,
  collectionKey: string,
  params: Record<string, unknown>,
  mapNode: (node: Record<string, unknown>) => T,
): Promise<T[]> {
  const pageSize = 100;
  let skip = 0;
  let total = Infinity;
  const records: T[] = [];

  while (skip < total) {
    const data = await client.request<
      Record<string, { count?: number; edges?: { node: Record<string, unknown> }[] }>
    >(query, {
      params,
      first: pageSize,
      skip,
      order: ["createdAt_DESC"],
    });
    const connection = data[collectionKey];
    const batch = connection?.edges?.map((edge) => mapNode(edge.node)) ?? [];
    total = connection?.count ?? batch.length;
    records.push(...batch);
    skip += pageSize;
    if (batch.length < pageSize) {
      break;
    }
  }

  return records;
}

export async function fetchStaticRecords(
  env: PatStoreEnv,
  options: {
    states?: readonly string[] | null;
    filesDir?: string;
    downloadFiles?: boolean;
  } = {},
): Promise<StaticRecords> {
  const client = createGraphQLClient(env);
  const modules = await fetchModules(client, env.projectId);
  const collections: Record<string, Record<string, unknown>[]> = {};
  const seen = new Set<string>();
  const downloader =
    options.downloadFiles === false || !options.filesDir
      ? null
      : new FileDownloader(options.filesDir);
  const states = options.states ?? null;

  for (const module of modules) {
    const className = module.connected_class;
    if (!className || seen.has(className) || !shouldStoreClass(className)) {
      continue;
    }
    seen.add(className);
    const records = await fetchClassRecords(client, module, env.projectId, states);
    if (downloader) {
      const fileFields = module.fields
        .filter((field) => isDownloadableFileField(field))
        .map((field) => field.id);
      for (const record of records) {
        await downloader.attachFiles(record, fileFields);
      }
    }
    collections[getStorageKey(className)] = records;
    console.log(`Fetched ${className} → ${getStorageKey(className)} (${records.length})`);
  }

  return {
    modules,
    collections,
    downloadedFiles: downloader?.list() ?? [],
  };
}
