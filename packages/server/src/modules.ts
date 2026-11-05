import { getCollectionKey, getStorageKey } from "./collection-keys.ts";
import type { DataField, ModuleField, PatStoreEnv, PatStoreModule } from "./types.ts";

const ENV_GROUPS = {
  graphqlUrl: [
    "VITE_PATSTORE_GRAPHQL_API_URL",
    "PATSTORE_GRAPHQL_API_URL",
  ],
  appId: ["VITE_PATSTORE_APP_ID", "PATSTORE_APP_ID"],
  projectId: [
    "VITE_PATSTORE_PROJECT_ID",
    "PATSTORE_PROJECT_ID",
  ],
  restKey: [
    "VITE_PATSTORE_REST_KEY",
    "PATSTORE_REST_KEY",
  ],
  apiUrl: ["VITE_PATSTORE_API_URL", "PATSTORE_API_URL"],
  fileUrl: [
    "VITE_PATSTORE_FILE_URL",
    "PATSTORE_FILE_URL",
  ],
} as const;

function readNamed(
  source: Record<string, string | undefined>,
  names: readonly string[],
): string | undefined {
  if (!Array.isArray(names)) {
    throw new Error(`Expected an array of names, got ${typeof names}`);
  }
    for (const name of names) {
    const value = source[name];
    if (value) {
      return value;
    }
  }
  return undefined;
}

export function readPatStoreEnv(
  source: Record<string, string | undefined>,
): PatStoreEnv | null {
  const graphqlUrl = readNamed(source, ENV_GROUPS.graphqlUrl);
  const appId = readNamed(source, ENV_GROUPS.appId);
  const projectId = readNamed(source, ENV_GROUPS.projectId);
  const restKey = readNamed(source, ENV_GROUPS.restKey);
  if (!graphqlUrl || !appId || !projectId || (!restKey)) {
    return null;
  }
  return {
    graphqlUrl,
    appId,
    projectId,
    restKey,
    apiUrl: readNamed(source, ENV_GROUPS.apiUrl),
    fileUrl: readNamed(source, ENV_GROUPS.fileUrl),
  };
}

/** Dynamic lookup so Vite does not inline secrets into a client bundle. */
export function readProcessEnv(): Record<string, string | undefined> {
  const source: Record<string, string | undefined> = {};
  const names = Object.values(ENV_GROUPS).flat();
  for (const name of names) {
    source[name] = process.env[name];
  }
  return source;
}

const USER_TOKENS = new Set(["user", "created_by", "updated_by", "_user"]);

export function isUserPointerField(field: {
  id?: string;
  type?: string;
  name?: string;
}): boolean {
  return [field.id, field.type, field.name].some((value) => {
    if (typeof value !== "string") {
      return false;
    }
    return USER_TOKENS.has(value.trim().toLowerCase().replace(/^_/, ""));
  });
}

export function unwrapElement(value: unknown): unknown {
  if (!value || typeof value !== "object" || Array.isArray(value) || !("value" in value)) {
    return value;
  }
  const keys = Object.keys(value);
  if (!keys.every((key) => key === "value" || key === "__typename")) {
    return value;
  }
  return (value as { value: unknown }).value;
}

export function normalizeValue(value: unknown): unknown {
  const unwrapped = unwrapElement(value);
  if (Array.isArray(unwrapped)) {
    return unwrapped.map((entry) => unwrapElement(entry));
  }
  return unwrapped;
}

export function normalizeRecord<T extends Record<string, unknown>>(record: T): T {
  const next: Record<string, unknown> = { ...record };
  for (const [key, value] of Object.entries(next)) {
    next[key] = normalizeValue(value);
  }
  return next as T;
}

function asField(entry: unknown): ModuleField | null {
  const value = unwrapElement(entry);
  if (!value || typeof value !== "object") {
    return null;
  }
  const field = value as Partial<ModuleField>;
  if (!field.id || !field.type) {
    return null;
  }
  return {
    id: String(field.id),
    label: String(field.label ?? field.id),
    required: Boolean(field.required),
    type: String(field.type),
    active: field.active !== false,
    position: Number(field.position ?? 0),
  };
}

function asDataField(entry: unknown): DataField | null {
  const value = unwrapElement(entry);
  if (!value || typeof value !== "object") {
    return null;
  }
  const field = value as Partial<DataField>;
  const name = field.name || field.id;
  if (!name) {
    return null;
  }
  return {
    id: String(field.id ?? name),
    type: String(field.type ?? "input"),
    label: String(field.label ?? name),
    name: String(name),
    position: Number(field.position ?? 0),
  };
}

function asList<T>(value: unknown, map: (entry: unknown) => T | null): T[] {
  const unwrapped = unwrapElement(value);
  const list = Array.isArray(unwrapped) ? unwrapped : unwrapped ? [unwrapped] : [];
  return list.flatMap((entry) => {
    const item = map(entry);
    return item ? [item] : [];
  });
}

export function normalizeModule(node: Record<string, unknown>): PatStoreModule {
  const fields = asList(node.fields, asField);
  if (node.connected_class === "Image" && !fields.some((field) => field.id === "file")) {
    fields.push({
      id: "file",
      label: "File",
      required: false,
      type: "file",
      active: true,
      position: 0,
    });
  }
  return {
    objectId: String(node.objectId ?? ""),
    name: String(node.name ?? ""),
    connected_class: String(node.connected_class ?? ""),
    fields,
    data_fields: asList(node.data_fields, asDataField),
  };
}

export function activeFields(module: PatStoreModule): ModuleField[] {
  return module.fields
    .filter(
      (field) =>
        field.active &&
        field.id &&
        field.id !== "createdAt" &&
        field.id !== "updatedAt" &&
        field.id !== "objectId" &&
        !isUserPointerField(field),
    )
    .sort((a, b) => a.position - b.position);
}

export function moduleHasStateField(module: PatStoreModule): boolean {
  return module.fields.some((field) => field.active && field.id === "state");
}

export function findModule(
  modules: readonly PatStoreModule[],
  className: string,
): PatStoreModule | undefined {
  const trimmed = className.trim();
  return modules.find((module) => {
    return (
      module.connected_class === trimmed ||
      module.connected_class.toLowerCase() === trimmed.toLowerCase() ||
      getStorageKey(module.connected_class) === trimmed ||
      getCollectionKey(module.connected_class) === trimmed
    );
  });
}
