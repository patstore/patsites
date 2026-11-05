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
  if (env.restKey) {
    headers["X-Parse-Rest-Api-Key"] = env.restKey;
  }
  return headers;
}

export function createGraphQLClient(env: PatStoreEnv): GraphQLClient {
  return new GraphQLClient(env.graphqlUrl, { headers: authHeaders(env) });
}

export type RecordScope = "project" | "module";

export function recordsWhere(
  scope: RecordScope,
  ids: { projectId: string; moduleId: string },
  states: Record<string, unknown> | null,
): Record<string, unknown> {
  const where: Record<string, unknown> =
    scope === "module"
      ? { module: { have: { objectId: { equalTo: ids.moduleId } } } }
      : { project: { have: { objectId: { equalTo: ids.projectId } } } };
  if (states) {
    where.state = states;
  }
  return where;
}

function projectWhere(projectId: string, states: Record<string, unknown> | null): Record<string, unknown> {
  return recordsWhere("project", { projectId, moduleId: "" }, states);
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
  scope: RecordScope = "project",
): Promise<Record<string, unknown>[]> {
  const className = module.connected_class;
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(className)) {
    throw new Error(`Unsupported class name: ${className}`);
  }
  let selection = buildSelection(module);
  const where = recordsWhere(
    scope,
    { projectId, moduleId: module.objectId },
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

export interface SupplementalField {
  id: string;
  type?: string;
}

export interface ExtraClassFetch {
  className: string;
  /** Read this class from the module whose `connected_class` matches. */
  moduleClass: string;
  fields?: readonly SupplementalField[];
  dataFields?: PatStoreModule["data_fields"];
}

export async function fetchStaticRecords(
  env: PatStoreEnv,
  options: {
    states?: readonly string[] | null;
    filesDir?: string;
    downloadFiles?: boolean;
    recordScope?: RecordScope;
    supplementFields?: Record<string, readonly SupplementalField[]>;
    extraClasses?: readonly ExtraClassFetch[];
  } = {},
): Promise<StaticRecords> {
  const client = createGraphQLClient(env);
  const scope = options.recordScope ?? "project";
  const modules = applySupplementalFields(
    await fetchModules(client, env.projectId),
    options.supplementFields,
  );
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
    const records = await fetchClassRecords(client, module, env.projectId, states, scope);
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

  for (const extra of options.extraClasses ?? []) {
    const source = modules.find((module) => module.connected_class === extra.moduleClass);
    if (!source || seen.has(extra.className) || !shouldStoreClass(extra.className)) {
      continue;
    }
    seen.add(extra.className);
    const module = syntheticModule(source, extra);
    modules.push(module);
    const records = await fetchClassRecords(client, module, env.projectId, states, scope);
    if (downloader) {
      const fileFields = module.fields
        .filter((field) => isDownloadableFileField(field))
        .map((field) => field.id);
      for (const record of records) {
        await downloader.attachFiles(record, fileFields);
      }
    }
    collections[getStorageKey(extra.className)] = records;
    console.log(`Fetched ${extra.className} → ${getStorageKey(extra.className)} (${records.length})`);
  }

  return {
    modules,
    collections,
    downloadedFiles: downloader?.list() ?? [],
  };
}

function applySupplementalFields(
  modules: PatStoreModule[],
  extra: Record<string, readonly SupplementalField[]> | undefined,
): PatStoreModule[] {
  if (!extra) {
    return modules;
  }
  return modules.map((module) => {
    const additions = extra[module.connected_class];
    if (!additions?.length) {
      return module;
    }
    return {
      ...module,
      fields: mergeFields(module.fields, additions),
    };
  });
}

function syntheticModule(source: PatStoreModule, extra: ExtraClassFetch): PatStoreModule {
  return {
    objectId: source.objectId,
    name: extra.className,
    connected_class: extra.className,
    fields: mergeFields([], extra.fields ?? []),
    data_fields: extra.dataFields ? [...extra.dataFields] : [],
  };
}

function mergeFields(
  fields: PatStoreModule["fields"],
  additions: readonly SupplementalField[],
): PatStoreModule["fields"] {
  const wanted = new Set(additions.map((field) => field.id).filter(Boolean));
  const merged = fields.map((field) =>
    wanted.has(field.id) ? { ...field, active: true } : field,
  );
  const seen = new Set(merged.map((field) => field.id));
  for (const field of additions) {
    if (!field.id || seen.has(field.id)) {
      continue;
    }
    seen.add(field.id);
    merged.push({
      id: field.id,
      label: field.id,
      required: false,
      type: field.type ?? "string",
      active: true,
      position: merged.length,
    });
  }
  return merged;
}
