import { defineConfig, type UserConfig } from "vite";

/**
 * Shared compiler settings for this monorepo.
 * Apps and packages merge these defaults into their own Vite config.
 * Turborepo runs each package's `vite build` / `vite dev` script.
 */
export const monorepoCompiler = {
  build: {
    sourcemap: true,
    target: "es2022",
  },
} satisfies UserConfig;

export default defineConfig(monorepoCompiler);
