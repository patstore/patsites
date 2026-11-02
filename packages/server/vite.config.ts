import { defineConfig, mergeConfig } from "vite";
import { resolve } from "node:path";
import { monorepoCompiler } from "../../vite.config.ts";

const external = [
  "graphql",
  "graphql-request",
  "vite",
  "zod",
];

export default mergeConfig(
  monorepoCompiler,
  defineConfig({
    build: {
      emptyOutDir: true,
      lib: {
        entry: resolve("src/index.ts"),
        formats: ["es"],
        fileName: "index",
      },
      rollupOptions: {
        external,
      },
    },
  }),
);
