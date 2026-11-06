import path from "node:path";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { monorepoCompiler } from "../../vite.config.ts";
import { serverDataPlugin } from "@repo/server/vite";
import { contentPlugin } from "@repo/core/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return mergeConfig(monorepoCompiler, {
    cacheDir: path.resolve(import.meta.dirname, ".cache/vite"),
    publicDir: "static",
    server: {
      port: 3000,
      fs: {
        allow: [path.resolve(import.meta.dirname, "../..")],
      },
    },
    resolve: {
      alias: {
        "@data": path.resolve(import.meta.dirname, "./data/index.ts"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    ssr: {
      noExternal: [
        "@apollo/client",
        "@apollo/client/core",
        "@apollo/client/react",
        "@repo/core",
        "@repo/server",
        "@tanstack/react-router",
        "lodash-es",
        "date-fns",
      ],
    },
    optimizeDeps: {
      exclude: ["@repo/server"],
      holdUntilCrawlEnd: true,
      include: [
        "@apollo/client/core",
        "@apollo/client/react",
        "@tanstack/react-router",
        "lodash-es",
        "date-fns",
      ],
    },
    plugins: [
      serverDataPlugin({
        env,
        outputDir: "data",
        filesDir: "data/files",
        states: null,
      }),
      contentPlugin({
        routesDir: "src/routes",
        outputDir: "data",
        env,
      }),
      tsconfigPaths(),
      tanstackStart(),
      nitro({
        publicAssets: [
          {
            baseURL: "/",
            dir: path.resolve(import.meta.dirname, "static"),
            fallthrough: true,
          },
        ],
        routeRules: {
          "/app/profile": {
            redirect: { to: "/app/benutzerkonto", status: 301 },
          },
        },
      }),
      viteReact({
        jsxImportSource: "@emotion/react",
      }),
    ],
  });
});
