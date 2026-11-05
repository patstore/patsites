export interface ModuleField {
  id: string;
  label: string;
  required: boolean;
  type: string;
  active: boolean;
  position: number;
}

export interface DataField {
  id: string;
  type: string;
  label: string;
  name: string;
  position: number;
}

export interface PatStoreModule {
  objectId: string;
  name: string;
  connected_class: string;
  fields: ModuleField[];
  data_fields: DataField[];
}

export interface DownloadedFile {
  objectId: string;
  originalUrl: string;
  localPath: string;
  filename: string;
  type: "image" | "document";
}

export interface ContentMeta {
  generatedAt: string;
  projectId: string;
  moduleCount: number;
  /** States requested while generating this snapshot. Null means every state. */
  states: string[] | null;
}

export interface ContentSnapshot {
  _meta?: ContentMeta;
  _modules?: PatStoreModule[];
  downloadedFiles?: DownloadedFile[];
  [key: string]: unknown;
}

export type DataMode = "static" | "ssr";

/**
 * Where records come from, and which `state` values are included.
 * `states: null` includes every state. Any other list is an exact allow-list,
 * for example `["published"]`, `["draft", "published"]`, or `["review"]`.
 */
export interface DataContext {
  mode: DataMode;
  states: readonly string[] | null;
}

/**
 * Filled in by an app's generated `data/schema.ts` so `Application` matches
 * the modules and active fields of that database.
 */
export interface ApplicationModules {}

export type Application = {
  [K in keyof ApplicationModules]: ApplicationModules[K];
};

export interface PatStoreEnv {
  graphqlUrl: string;
  appId: string;
  projectId: string;
  restKey?: string;
  apiUrl?: string;
  fileUrl?: string;
}
