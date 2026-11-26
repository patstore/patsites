import path from "node:path";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { monorepoCompiler } from "../../vite.config.ts";

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
			port: 4006,
			fs: {
				allow: [path.resolve(import.meta.dirname, "../..")]
			}
		},
		ssr: {
			noExternal: ["@repo/core", "@repo/server", "@tanstack/react-router"]
		},
		optimizeDeps: {
			exclude: ["@repo/server"],
			holdUntilCrawlEnd: true,
			include: ["@tanstack/react-router"]
		},
		plugins: [
			tsconfigPaths(),
			tanstackStart(),
			nitro(process.env.VERCEL ? { preset: "vercel" } : {}),
			viteReact()
		]
	});
});
