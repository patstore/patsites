import type { AuthConfig } from "./types.ts";

export class ParseFailure extends Error {
  status: number;
  details: unknown;

  constructor(status: number, details: unknown) {
    super(messageFrom(details) ?? `Parse request failed (${status})`);
    this.name = "ParseFailure";
    this.status = status;
    this.details = details;
  }
}

export function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return undefined;
}

export function messageFrom(details: unknown): string | undefined {
  const record = asRecord(details);
  const error = record?.error;
  if (typeof error === "string" && error.length > 0) {
    return error;
  }
  const message = record?.message;
  if (typeof message === "string" && message.length > 0) {
    return message;
  }
  return undefined;
}

export async function readBody(request: Request): Promise<Record<string, unknown>> {
  return asRecord(await request.json().catch(() => ({}))) ?? {};
}

export function parseErrorResponse(error: unknown, fallback = "Serverfehler"): Response {
  if (error instanceof ParseFailure) {
    return Response.json(
      { message: error.message, error: error.message },
      { status: error.status },
    );
  }
  return Response.json({ message: fallback }, { status: 500 });
}

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function parseFetch(
  config: AuthConfig,
  path: string,
  options: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
    sessionToken?: string;
  },
): Promise<unknown> {
  const headers: Record<string, string> = {
    "X-Parse-Application-Id": config.appId,
    "X-Parse-REST-API-Key": config.restKey,
    Accept: "application/json",
  };
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (options.sessionToken) {
    headers["X-Parse-Session-Token"] = options.sessionToken;
  }

  const response = await fetch(joinUrl(config.apiUrl, path), {
    method: options.method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ParseFailure(response.status, data);
  }
  return data;
}

const FUNCTION_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;
const WRITABLE_CLASSES = new Set(["Item", "Location"]);

export async function callFunction(
  config: AuthConfig,
  name: string,
  payload: unknown,
  sessionToken?: string,
): Promise<unknown> {
  if (!FUNCTION_NAME.test(name)) {
    throw new ParseFailure(400, { error: "Unsupported function" });
  }
  return parseFetch(config, `/functions/${name}`, {
    method: "POST",
    body: payload,
    sessionToken,
  });
}

const OBJECT_ID = /^[A-Za-z0-9]+$/;

export async function updateUser(
  config: AuthConfig,
  sessionToken: string,
  userId: string,
  fields: Record<string, unknown>,
): Promise<void> {
  if (!OBJECT_ID.test(userId)) {
    throw new ParseFailure(400, { error: "Unsupported user" });
  }
  await parseFetch(config, `/classes/_User/${userId}`, {
    method: "PUT",
    body: fields,
    sessionToken,
  });
}

export async function createObject(
  config: AuthConfig,
  className: string,
  fields: Record<string, unknown>,
  sessionToken?: string,
): Promise<Record<string, unknown>> {
  if (!WRITABLE_CLASSES.has(className)) {
    throw new ParseFailure(400, { error: "Unsupported class" });
  }
  const created = asRecord(
    await parseFetch(config, `/classes/${className}`, {
      method: "POST",
      body: fields,
      sessionToken,
    }),
  );
  if (!created || typeof created.objectId !== "string") {
    throw new ParseFailure(500, { error: "Empty response" });
  }
  return created;
}
