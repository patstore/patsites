import path from "node:path";
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { monorepoCompiler } from "../../vite.config.ts";
import { serverDataPlugin } from "@repo/server/vite";
import {
    extraClasses,
    supplementFields
} from "./src/server/snapshot-fields.ts";

const appDir = import.meta.dirname;
const uiSrc = path.resolve(appDir, "ui");

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) {
            process.env[key] = value;
        }
    }

    return mergeConfig(monorepoCompiler, {
        cacheDir: path.resolve(appDir, ".cache/vite"),
        server: {
            port: 4005,
            fs: {
                allow: [path.resolve(appDir, "../..")]
            }
        },
        resolve: {
            alias: [
                { find: "@/ui", replacement: path.join(uiSrc, "ui") },
                { find: "@/settings", replacement: path.join(uiSrc, "settings") },
                { find: "@/styles", replacement: path.join(uiSrc, "styles") },
                {
                    find: "@components",
                    replacement: path.join(appDir, "src/components/index.ts")
                },
                {
                    find: "@content",
                    replacement: path.join(appDir, "src/content/index.ts")
                },
                {
                    find: "@data",
                    replacement: path.join(appDir, "data/index.ts")
                },
                { find: /^@\//, replacement: path.join(appDir, "src") + "/" }
            ]
        },
        ssr: {
            noExternal: [
                "@repo/core",
                "@repo/provider",
                "@repo/server",
                "@tanstack/react-router",
                "react-icons"
            ]
        },
        optimizeDeps: {
            exclude: ["@repo/server"],
            holdUntilCrawlEnd: true,
            include: ["@tanstack/react-router"]
        },
        plugins: [
            serverDataPlugin({
                env,
                outputDir: "data",
                filesDir: "data/files",
                states: null,
                recordScope: "module",
                supplementFields,
                extraClasses
            }),
            tsconfigPaths(),
            tanstackStart(),
            nitro({
                ...(process.env.VERCEL ? { preset: "vercel" as const } : {}),
                publicAssets: [
                    {
                        dir: "data/files",
                        baseURL: "data/files"
                    }
                ]
            }),
            viteReact({
                jsxImportSource: "@emotion/react"
            })
        ]
    });
});
