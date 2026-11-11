import path from "node:path";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { monorepoCompiler } from "../../vite.config.ts";
import { serverDataPlugin } from "@repo/server/vite";
import { contentPlugin } from "@repo/core/vite";
import { extraClasses, supplementFields } from "./src/server/snapshot-fields.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith("GATSBY_") || !value) {
      continue;
    }
    const unprefixed = key.slice("GATSBY_".length);
    env[unprefixed] ??= value;
    env[`VITE_${unprefixed}`] ??= value;
  }
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return mergeConfig(monorepoCompiler, {
    cacheDir: path.resolve(import.meta.dirname, ".cache/vite"),
    publicDir: "static",
    server: {
      port: 4003,
      fs: {
        allow: [path.resolve(import.meta.dirname, "../..")],
      },
    },
    resolve: {
      alias: {
        "@data": path.resolve(import.meta.dirname, "./data/index.ts"),
      },
    },
    ssr: {
      noExternal: ["@repo/core", "@repo/server", "@tanstack/react-router"],
    },
    optimizeDeps: {
      exclude: ["@repo/server"],
      holdUntilCrawlEnd: true,
      include: ["@tanstack/react-router"],
    },
    plugins: [
      serverDataPlugin({
        env,
        outputDir: "data",
        filesDir: "data/files",
        states: null,
        recordScope: "module",
        supplementFields,
        extraClasses,
      }),
      contentPlugin({
        routesDir: "src/routes",
        outputDir: "data",
        env,
      }),
      tsconfigPaths(),
      tanstackStart(),
      nitro(process.env.VERCEL ? { preset: "vercel" } : {}),
      viteReact(),
    ],
  });
});
