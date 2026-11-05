import * as fs from "node:fs";
import * as path from "node:path";
import type { Plugin } from "vite";
import { writeContentArtifacts, writeStubContentArtifacts } from "./codegen.ts";
import { toLocale } from "./locale.ts";
import { buildManifest, writeManifest } from "./manifest.ts";
import type { CmsRestEnv } from "./patstore-rest.ts";
import { contentMapFromDefaults, syncManifestToPatStore } from "./sync.ts";
import { flattenManifestToPaths } from "./flatten.ts";

export type ContentPluginOptions = {
  /** Directory of TanStack route files. Default: `src/routes`. */
  routesDir?: string;
  /** Manifest and content output. Default: `data`. */
  outputDir?: string;
  className?: string;
  fieldName?: string;
  schemaFieldName?: string;
  projectPointerClassName?: string | null;
  /** Push the scanned field schema to PatStore. Default: on, unless `VITE_CMS_CONTENT_SYNC=false`. */
  sync?: boolean;
  strictSync?: boolean;
  env?: Record<string, string | undefined>;
};

function pick(env: Record<string, string | undefined>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = env[key];
    if (value) {
      return value;
    }
  }
  return undefined;
}

function readRestEnv(env: Record<string, string | undefined>, options: ContentPluginOptions): CmsRestEnv | null {
  const apiUrl = pick(env, ["VITE_PATSTORE_API_URL", "PATSTORE_API_URL"]);
  const appId = pick(env, ["VITE_PATSTORE_APP_ID", "PATSTORE_APP_ID"]);
  const projectId = pick(env, ["VITE_PATSTORE_PROJECT_ID", "PATSTORE_PROJECT_ID"]);
  const restKey = pick(env, ["VITE_PATSTORE_REST_KEY", "PATSTORE_REST_KEY"]);
  if (!apiUrl || !appId || !projectId || !restKey) {
    return null;
  }
  const defaultLang = pick(env, ["DEFAULT_LANG", "VITE_DEFAULT_LANG"]) ?? "de";
  return {
    apiUrl,
    appId,
    projectId,
    restKey,
    className: options.className ?? pick(env, ["VITE_CMS_CONTENT_CLASS"]) ?? "Webpage",
    fieldName: options.fieldName ?? pick(env, ["VITE_CMS_CONTENT_FIELD"]) ?? "page_data",
    schemaFieldName: options.schemaFieldName ?? pick(env, ["VITE_CMS_CONTENT_SCHEMA_FIELD"]) ?? "page_content",
    projectPointerClassName:
      options.projectPointerClassName !== undefined
        ? options.projectPointerClassName
        : (pick(env, ["VITE_PATSTORE_PROJECT_CLASS"]) ?? "Project"),
    defaultLang: toLocale(defaultLang) === "default" ? defaultLang : defaultLang,
  };
}

function stringAliases(alias: unknown): Record<string, string> {
  const aliases: Record<string, string> = {};
  const entries = Array.isArray(alias) ? alias : alias && typeof alias === "object" ? Object.entries(alias) : [];
  if (Array.isArray(alias)) {
    for (const entry of alias as Array<{ find?: unknown; replacement?: unknown }>) {
      if (typeof entry.find === "string" && typeof entry.replacement === "string") {
        aliases[entry.find] = entry.replacement;
      }
    }
    return aliases;
  }
  for (const [key, value] of entries as Array<[string, unknown]>) {
    if (typeof value === "string") {
      aliases[key] = value;
    }
  }
  return aliases;
}

export function contentPlugin(options: ContentPluginOptions = {}): Plugin {
  let outputDir = path.resolve(process.cwd(), options.outputDir ?? "data");
  let root = process.cwd();
  let resolvedEnv: Record<string, string | undefined> = options.env ?? {};
  let aliases: Record<string, string> = {};
  let lastSignature = "";

  const runPipeline = async () => {
    const routesDir = path.resolve(root, options.routesDir ?? "src/routes");
    const defaultLang = pick(resolvedEnv, ["DEFAULT_LANG", "VITE_DEFAULT_LANG"]) ?? "de";
    const manifest = buildManifest(routesDir, aliases);
    const signature = JSON.stringify(manifest);
    if (signature === lastSignature) {
      return false;
    }
    lastSignature = signature;
    writeManifest(outputDir, manifest);

    const pageCount = Object.keys(manifest.pages).length;
    const fieldCount = Object.values(manifest.pages).reduce(
      (sum, pageManifest) => sum + flattenManifestToPaths(pageManifest).length,
      0,
    );
    console.log(`CMS content: scanned ${pageCount} page(s), ${fieldCount} field(s)`);

    const syncEnabled = options.sync ?? resolvedEnv.VITE_CMS_CONTENT_SYNC !== "false";
    if (!syncEnabled || pageCount === 0) {
      if (!syncEnabled) {
        console.log("CMS content sync disabled (VITE_CMS_CONTENT_SYNC=false)");
      }
      writeContentArtifacts(outputDir, contentMapFromDefaults(manifest, defaultLang));
      return true;
    }

    const restEnv = readRestEnv(resolvedEnv, options);
    if (!restEnv) {
      console.warn("CMS content sync skipped — PatStore env is incomplete. Using scanned defaults.");
      writeContentArtifacts(outputDir, contentMapFromDefaults(manifest, defaultLang));
      return true;
    }

    try {
      const content = await syncManifestToPatStore({
        env: restEnv,
        manifest,
        log: (message) => console.log(`   ${message}`),
      });
      writeContentArtifacts(outputDir, content);
      console.log(`CMS content synced with PatStore "${restEnv.className}"`);
    } catch (error) {
      console.error("CMS content sync failed:", error);
      if (options.strictSync) {
        throw error;
      }
      console.warn("Falling back to scanned defaults.");
      writeContentArtifacts(outputDir, contentMapFromDefaults(manifest, defaultLang));
    }
    return true;
  };

  return {
    name: "repo-core-content",
    enforce: "pre",
    configResolved(config) {
      root = config.root;
      outputDir = path.resolve(root, options.outputDir ?? "data");
      resolvedEnv = { ...config.env, ...options.env };
      aliases = stringAliases(config.resolve.alias);
    },
    async buildStart() {
      if (!fs.existsSync(outputDir)) {
        writeStubContentArtifacts(outputDir);
      }
      await runPipeline();
    },
    configureServer(server) {
      const watchDir = path.resolve(root, "src");
      if (!fs.existsSync(watchDir)) {
        return;
      }
      let pending = false;
      fs.watch(watchDir, { recursive: true }, (_event, filename) => {
        if (!filename || !/\.(tsx|tsrx|ts)$/.test(filename) || filename.includes(".generated") || pending) {
          return;
        }
        pending = true;
        setTimeout(() => {
          pending = false;
          runPipeline()
            .then((changed) => {
              if (changed) {
                server.ws.send({ type: "full-reload" });
              }
            })
            .catch((error: unknown) => {
              console.error("CMS content re-scan failed:", error);
            });
        }, 150);
      });
    },
  };
}

export { buildManifest, writeManifest } from "./manifest.ts";
export { scanSourceContent } from "./scan-content.ts";
export { contentMapFromDefaults, syncManifestToPatStore } from "./sync.ts";
