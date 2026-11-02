import * as fs from "node:fs";
import * as path from "node:path";

const SOURCE_EXT = new Set([".tsx", ".tsrx"]);
const LANG_SEGMENTS = new Set(["$lang", "{-$lang}", "(lang)"]);

export type RouteFile = {
  file: string;
  cmsPath: string | null;
};

function isSplat(segment: string): boolean {
  return segment === "$" || segment === "splat" || segment.startsWith("...");
}

/** TanStack file route → canonical CMS path. Language prefixes are removed. API and splat routes are skipped. */
export function cmsPathForRouteFile(relativeFile: string): string | null {
  const normalized = relativeFile.replace(/\\/g, "/");
  const extension = path.posix.extname(normalized);
  if (!SOURCE_EXT.has(extension)) {
    return null;
  }
  const withoutExt = normalized.slice(0, -extension.length);
  const parts = withoutExt.split("/");
  if (parts.some((part) => part === "api" || part.startsWith("__") || isSplat(part))) {
    return null;
  }

  const segments: string[] = [];
  for (const part of parts) {
    if (part === "index" || part === "route" || LANG_SEGMENTS.has(part)) {
      continue;
    }
    if (part.startsWith("(") && part.endsWith(")") && part !== "(lang)") {
      continue;
    }
    if (part.startsWith("_")) {
      continue;
    }
    segments.push(part);
  }

  return `/${segments.join("/")}`.replace(/\/+/g, "/") || "/";
}

export function listRouteFiles(routesDir: string): RouteFile[] {
  const files: RouteFile[] = [];

  const walk = (directory: string) => {
    if (!fs.existsSync(directory)) {
      return;
    }
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "api" || entry.name === "node_modules") {
          continue;
        }
        walk(absolute);
        continue;
      }
      const relative = path.relative(routesDir, absolute);
      files.push({ file: absolute, cmsPath: cmsPathForRouteFile(relative) });
    }
  };

  walk(routesDir);
  return files;
}
