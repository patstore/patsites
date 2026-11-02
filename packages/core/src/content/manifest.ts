import * as fs from "node:fs";
import * as path from "node:path";
import { isSectionNode, type CmsManifest, type CmsPageManifest } from "./types.ts";
import { listRouteFiles } from "./routes.ts";
import { scanSourceContent } from "./scan-content.ts";
import {
  NAMESPACE_EXPORT,
  declaresExport,
  extractImportBindings,
  extractReExports,
  resolveImportSpecifier,
} from "./resolve-imports.ts";

const IN_PROGRESS = Symbol("cms-content:scan-in-progress");

type ScanContext = {
  aliases: Record<string, string>;
  sources: Map<string, string>;
  modules: Map<string, CmsPageManifest | typeof IN_PROGRESS>;
  exports: Map<string, CmsPageManifest | typeof IN_PROGRESS>;
};

function readSource(filePath: string, context: ScanContext): string {
  const cached = context.sources.get(filePath);
  if (cached !== undefined) {
    return cached;
  }
  const source = fs.readFileSync(filePath, "utf-8");
  context.sources.set(filePath, source);
  return source;
}

function mergeNodes(base: CmsPageManifest, extra: CmsPageManifest): CmsPageManifest {
  const merged: CmsPageManifest = { ...base };
  for (const [key, node] of Object.entries(extra)) {
    const previous = merged[key];
    if (previous && isSectionNode(previous) && isSectionNode(node)) {
      merged[key] = {
        type: node.type,
        label: node.label,
        content: mergeNodes(previous.content, node.content),
      };
      continue;
    }
    merged[key] = node;
  }
  return merged;
}

function scanModule(filePath: string, context: ScanContext): CmsPageManifest {
  const cached = context.modules.get(filePath);
  if (cached === IN_PROGRESS) {
    return {};
  }
  if (cached) {
    return cached;
  }
  context.modules.set(filePath, IN_PROGRESS);
  const source = readSource(filePath, context);
  let merged: CmsPageManifest = { ...scanSourceContent(source) };

  for (const binding of extractImportBindings(source)) {
    const resolved = resolveImportSpecifier(binding.specifier, filePath, context.aliases);
    if (!resolved) {
      continue;
    }
    if (binding.namespace) {
      merged = mergeNodes(merged, scanModule(resolved, context));
      continue;
    }
    for (const name of binding.names) {
      merged = mergeNodes(merged, scanExportedComponent(resolved, name, context));
    }
  }

  context.modules.set(filePath, merged);
  return merged;
}

function moduleProvidesExport(
  filePath: string,
  exportName: string,
  context: ScanContext,
  visited: Set<string>,
): boolean {
  if (visited.has(filePath)) {
    return false;
  }
  visited.add(filePath);
  const source = readSource(filePath, context);
  if (declaresExport(source, exportName)) {
    return true;
  }
  for (const reExport of extractReExports(source)) {
    if (reExport.names) {
      if (reExport.names.some((entry) => entry.exported === exportName)) {
        return true;
      }
      continue;
    }
    const target = resolveImportSpecifier(reExport.specifier, filePath, context.aliases);
    if (target && moduleProvidesExport(target, exportName, context, visited)) {
      return true;
    }
  }
  return false;
}

function resolveExportedComponent(filePath: string, exportName: string, context: ScanContext): CmsPageManifest {
  const source = readSource(filePath, context);
  const starSpecifiers: string[] = [];
  for (const reExport of extractReExports(source)) {
    if (!reExport.names) {
      starSpecifiers.push(reExport.specifier);
      continue;
    }
    const alias = reExport.names.find((entry) => entry.exported === exportName);
    if (!alias) {
      continue;
    }
    const target = resolveImportSpecifier(reExport.specifier, filePath, context.aliases);
    if (!target) {
      return {};
    }
    return alias.local === NAMESPACE_EXPORT
      ? scanModule(target, context)
      : scanExportedComponent(target, alias.local, context);
  }

  if (starSpecifiers.length > 0 && !declaresExport(source, exportName)) {
    for (const specifier of starSpecifiers) {
      const target = resolveImportSpecifier(specifier, filePath, context.aliases);
      if (target && moduleProvidesExport(target, exportName, context, new Set())) {
        return scanExportedComponent(target, exportName, context);
      }
    }
    return {};
  }

  return scanModule(filePath, context);
}

function scanExportedComponent(filePath: string, exportName: string, context: ScanContext): CmsPageManifest {
  const cacheKey = `${filePath}::${exportName}`;
  const cached = context.exports.get(cacheKey);
  if (cached === IN_PROGRESS) {
    return {};
  }
  if (cached) {
    return cached;
  }
  context.exports.set(cacheKey, IN_PROGRESS);
  const resolved = resolveExportedComponent(filePath, exportName, context);
  context.exports.set(cacheKey, resolved);
  return resolved;
}

function layoutRank(file: string): number {
  return /[/\\]route\.(tsx?|tsrx)$/.test(file) ? 0 : 1;
}

/** Scans TanStack route files and the components they import. */
export function buildManifest(routesDir: string, aliases: Record<string, string> = {}): CmsManifest {
  const pages: Record<string, CmsPageManifest> = {};
  const context: ScanContext = {
    aliases,
    sources: new Map(),
    modules: new Map(),
    exports: new Map(),
  };

  const files = listRouteFiles(routesDir)
    .filter((route): route is { file: string; cmsPath: string } => route.cmsPath !== null)
    .sort((a, b) => layoutRank(a.file) - layoutRank(b.file));

  for (const route of files) {
    const fields = scanModule(route.file, context);
    if (Object.keys(fields).length === 0) {
      continue;
    }
    const existing = pages[route.cmsPath];
    pages[route.cmsPath] = existing ? mergeNodes(existing, fields) : fields;
  }

  return { pages };
}

export function writeManifest(outputDir: string, manifest: CmsManifest): void {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "cms-manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");
}
