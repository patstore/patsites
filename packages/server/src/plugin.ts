import * as fs from "node:fs";
import * as path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { writeContentArtifacts } from "./codegen.ts";
import { fetchStaticRecords } from "./fetch.ts";
import { readPatStoreEnv } from "./modules.ts";
import { publishDownloadedFiles, publishPublicDir } from "./publish-files.ts";
import { normalizeStates } from "./state.ts";
import type { ContentSnapshot } from "./types.ts";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

export interface ServerDataPluginOptions {
  /** Env from Vite `loadEnv`. `process.env` is used as a fallback. */
  env?: Record<string, string | undefined>;
  /** Directory for the snapshot, types, and Zod schemas. Default: `data`. */
  outputDir?: string;
  /** Directory for downloaded CMS files. Default: `data/files`. */
  filesDir?: string;
  /**
   * States written into the static snapshot.
   * `null` stores every state so later reads can filter.
   */
  states?: readonly string[] | null;
  /** Import alias for the generated data barrel. Default: `@data`. */
  dataAlias?: string | false;
  downloadFiles?: boolean;
}

export function serverDataPlugin(options: ServerDataPluginOptions = {}): Plugin {
  let config: ResolvedConfig | null = null;
  let filesDir = "";

  return {
    name: "@repo/server:data",
    config() {
      if (options.dataAlias === false) {
        return {};
      }
      const alias = options.dataAlias ?? "@data";
      return {
        resolve: {
          alias: {
            [alias]: path.resolve(process.cwd(), options.outputDir ?? "data", "index.ts"),
          },
        },
      };
    },
    configResolved(resolved) {
      config = resolved;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const prefix = "/data/files/";
        const url = req.url ?? "";
        if (!url.startsWith(prefix) || !filesDir) {
          next();
          return;
        }
        const filename = decodeURIComponent(url.slice(prefix.length).split("?")[0] ?? "");
        if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
          next();
          return;
        }
        const filePath = path.join(filesDir, filename);
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          next();
          return;
        }
        const extension = path.extname(filePath).toLowerCase();
        res.setHeader("Content-Type", MIME_TYPES[extension] ?? "application/octet-stream");
        fs.createReadStream(filePath).pipe(res);
      });
    },
    async buildStart() {
      const root = config?.root ?? process.cwd();
      const outputDir = path.resolve(root, options.outputDir ?? "data");
      filesDir = path.resolve(root, options.filesDir ?? "data/files");
      const dataFile = path.join(outputDir, "build-time-data.json");
      const states = normalizeStates(options.states);
      const env = readPatStoreEnv({ ...process.env, ...options.env });

      if (!env) {
        console.warn(
          "PatStore static generation skipped. Set the VITE_PATSTORE_* URL, app, project, and a master or REST key.",
        );
        return;
      }

      console.log("PatStore static generation started");
      try {
        const fetched = await fetchStaticRecords(env, {
          states,
          filesDir,
          downloadFiles: options.downloadFiles !== false,
        });
        if (fetched.modules.length === 0) {
          throw new Error("PatStore returned no modules");
        }
        const snapshot: ContentSnapshot = {
          _meta: {
            generatedAt: new Date().toISOString(),
            projectId: env.projectId,
            moduleCount: fetched.modules.length,
            states,
          },
          _modules: fetched.modules,
          downloadedFiles: fetched.downloadedFiles,
          ...fetched.collections,
        };
        writeContentArtifacts(outputDir, snapshot);
        console.log(`PatStore snapshot written to ${outputDir}`);
      } catch (error) {
        console.error(
          "PatStore static generation failed:",
          error instanceof Error ? error.message : error,
        );
        if (fs.existsSync(dataFile)) {
          console.warn("Keeping the existing snapshot.");
          return;
        }
        throw error;
      }
    },
    closeBundle() {
      const environment = this.environment;
      const isClient =
        !environment ||
        environment.name === "client" ||
        environment.config.consumer === "client";
      if (!isClient) {
        return;
      }

      const root = config?.root ?? process.cwd();
      const configuredOutDir = environment?.config.build.outDir;
      const outDir = configuredOutDir
        ? path.resolve(root, configuredOutDir)
        : path.join(root, "dist", "client");

      publishDownloadedFiles(filesDir, outDir);
      if (environment?.config.build.copyPublicDir === false && environment.config.publicDir) {
        publishPublicDir(environment.config.publicDir, outDir);
      }
    },
  };
}
