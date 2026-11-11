import "@tanstack/react-start/server-only";
import { z } from "zod";

const envSchema = z.object({
  graphqlUrl: z.url(),
  apiUrl: z.url(),
  projectId: z.string().min(1),
  appId: z.string().min(1),
  restKey: z.string().min(1),
  masterKey: z.string().min(1).optional(),
  bytescaleAccountId: z.string().min(1).optional(),
  siteUrl: z.url().optional(),
});

export type ServerEnv = z.infer<typeof envSchema>;

const read = (name: string) =>
  process.env[name] ||
  process.env[`VITE_${name}`] ||
  process.env[`GATSBY_${name}`] ||
  undefined;

let cachedEnv: ServerEnv | null | undefined;

export function readOptionalServerEnv(): ServerEnv | null {
  if (cachedEnv !== undefined) {
    return cachedEnv;
  }

  const result = envSchema.safeParse({
    graphqlUrl: read("PATSTORE_GRAPHQL_API_URL"),
    apiUrl: read("PATSTORE_API_URL"),
    projectId: read("PATSTORE_PROJECT_ID"),
    appId: read("PATSTORE_APP_ID"),
    restKey: read("PATSTORE_REST_KEY"),
    masterKey: read("PATSTORE_MASTER_KEY"),
    bytescaleAccountId: read("BYTESCALE_ACCOUNT_ID"),
    siteUrl: process.env.SITE_URL || undefined,
  });

  cachedEnv = result.success ? result.data : null;
  return cachedEnv;
}

export function getServerEnv(): ServerEnv {
  const env = readOptionalServerEnv();
  if (!env) {
    throw new Error("Invalid server environment (see .env.example)");
  }
  return env;
}
