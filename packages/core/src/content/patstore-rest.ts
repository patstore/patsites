import { toLocale } from "./locale.ts";
import type { CmsPathValue, LocalizedPageContent } from "./types.ts";

export type CmsRestEnv = {
  apiUrl: string;
  appId: string;
  masterKey?: string;
  restKey?: string;
  projectId: string;
  className: string;
  fieldName: string;
  schemaFieldName: string;
  projectPointerClassName: string | null;
  defaultLang: string;
};

type WebpageRecord = {
  objectId: string;
  pageData: CmsPathValue[];
  schema: unknown;
};

function authHeaders(env: CmsRestEnv): Record<string, string> {
  const headers: Record<string, string> = { "X-Parse-Application-Id": env.appId };
  if (env.masterKey) {
    headers["X-Parse-Master-Key"] = env.masterKey;
  } else if (env.restKey) {
    headers["X-Parse-Rest-Api-Key"] = env.restKey;
  }
  return headers;
}

function projectFieldValue(env: CmsRestEnv): unknown {
  if (!env.projectPointerClassName) {
    return env.projectId;
  }
  return { __type: "Pointer", className: env.projectPointerClassName, objectId: env.projectId };
}

async function parseRestRequest<T>(
  env: CmsRestEnv,
  method: "GET" | "POST" | "PUT",
  urlPath: string,
  body?: unknown,
): Promise<T> {
  const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}${urlPath}`, {
    method,
    headers: {
      ...authHeaders(env),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`PatStore REST ${method} ${urlPath} failed (${response.status}): ${text}`);
  }
  return (await response.json()) as T;
}

function normalizePageData(value: unknown): CmsPathValue[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((entry): entry is CmsPathValue => Boolean(entry) && typeof entry === "object" && "path" in entry)
    .map((entry) => ({ path: String(entry.path), value: entry.value }));
}

async function queryWebpage(env: CmsRestEnv, where: unknown): Promise<Record<string, unknown> | null> {
  const query = `where=${encodeURIComponent(JSON.stringify(where))}&limit=1`;
  const data = await parseRestRequest<{ results: Array<Record<string, unknown>> }>(
    env,
    "GET",
    `/classes/${env.className}?${query}`,
  );
  return data.results?.[0] ?? null;
}

function toWebpageRecord(result: Record<string, unknown>, env: CmsRestEnv): WebpageRecord {
  return {
    objectId: String(result.objectId),
    pageData: normalizePageData(result[env.fieldName]),
    schema: result[env.schemaFieldName] ?? null,
  };
}

export async function findWebpageByPath(env: CmsRestEnv, pagePath: string): Promise<WebpageRecord | null> {
  const exact = await queryWebpage(env, { project: projectFieldValue(env), path: pagePath });
  return exact ? toWebpageRecord(exact, env) : null;
}

export async function fetchProjectLanguages(env: CmsRestEnv): Promise<string[]> {
  try {
    const className = env.projectPointerClassName ?? "Project";
    const project = await parseRestRequest<{ settings?: { languages?: unknown } }>(
      env,
      "GET",
      `/classes/${className}/${env.projectId}`,
    );
    const languages = project.settings?.languages;
    if (Array.isArray(languages) && languages.length > 0 && languages.every((lang) => typeof lang === "string")) {
      const locales = [
        ...new Set(languages.map((lang) => toLocale(lang)).filter((locale) => locale !== "default")),
      ];
      if (locales.length > 0) {
        return locales;
      }
    }
  } catch {
    // A missing Project falls back to the default language.
  }
  const fallback = toLocale(env.defaultLang);
  return fallback === "default" ? [] : [fallback];
}

/** Writes the field schema. Existing `page_data` values are left untouched. */
export async function updateWebpage(
  env: CmsRestEnv,
  objectId: string,
  schema: LocalizedPageContent,
): Promise<void> {
  await parseRestRequest(env, "PUT", `/classes/${env.className}/${objectId}`, {
    [env.schemaFieldName]: schema,
  });
}

/** Creates a page record and seeds `page_data` from the scanned defaults. */
export async function createWebpage(
  env: CmsRestEnv,
  pagePath: string,
  schema: LocalizedPageContent,
  pageData: CmsPathValue[],
): Promise<WebpageRecord> {
  const created = await parseRestRequest<Record<string, unknown>>(env, "POST", `/classes/${env.className}`, {
    project: projectFieldValue(env),
    path: pagePath,
    [env.schemaFieldName]: schema,
    [env.fieldName]: pageData,
  });
  return toWebpageRecord({ ...created, [env.fieldName]: pageData, [env.schemaFieldName]: schema }, env);
}
