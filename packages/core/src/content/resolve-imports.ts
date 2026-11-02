import * as fs from "node:fs";
import * as path from "node:path";

const IMPORT_CLAUSE_REGEX = /\bimport\b(?!\s*\()([^;'"]*?)\bfrom\s*['"]([^'"]+)['"]/g;
const REEXPORT_CLAUSE_REGEX = /\bexport\b([^;'"]*?)\bfrom\s*['"]([^'"]+)['"]/g;
const CANDIDATE_SUFFIXES = ["", ".tsrx", ".ts", ".tsx", "/index.tsrx", "/index.ts", "/index.tsx"];

export const NAMESPACE_EXPORT = "*";

export type ImportedBinding = {
  specifier: string;
  names: string[];
  namespace: boolean;
};

export type ReExportedBinding = {
  specifier: string;
  names: Array<{ exported: string; local: string }> | null;
};

function parseNamedClause(list: string): Array<{ exported: string; local: string }> {
  const entries: Array<{ exported: string; local: string }> = [];
  for (const raw of list.split(",")) {
    const part = raw.trim().replace(/^type\s+/, "");
    if (!part) {
      continue;
    }
    const [local, exported] = part.split(/\s+as\s+/).map((segment) => segment.trim());
    if (local) {
      entries.push({ local, exported: exported || local });
    }
  }
  return entries;
}

export function extractImportBindings(source: string): ImportedBinding[] {
  const bindings: ImportedBinding[] = [];
  let match: RegExpExecArray | null;
  IMPORT_CLAUSE_REGEX.lastIndex = 0;
  while ((match = IMPORT_CLAUSE_REGEX.exec(source))) {
    const clause = match[1] ?? "";
    const specifier = match[2] ?? "";
    if (/^\s*type\b/.test(clause)) {
      continue;
    }
    if (clause.includes("*")) {
      bindings.push({ specifier, names: [], namespace: true });
      continue;
    }
    const names: string[] = [];
    const named = /\{([^}]*)\}/.exec(clause);
    if (named?.[1]) {
      names.push(...parseNamedClause(named[1]).map((entry) => entry.local));
    }
    const defaultBinding = clause.replace(/\{[^}]*\}/, "").replace(/,/g, " ").trim();
    if (/^[\w$]+$/.test(defaultBinding)) {
      names.push("default");
    }
    bindings.push({ specifier, names, namespace: false });
  }
  return bindings;
}

export function extractReExports(source: string): ReExportedBinding[] {
  const reExports: ReExportedBinding[] = [];
  let match: RegExpExecArray | null;
  REEXPORT_CLAUSE_REGEX.lastIndex = 0;
  while ((match = REEXPORT_CLAUSE_REGEX.exec(source))) {
    const clause = match[1] ?? "";
    const specifier = match[2] ?? "";
    const namespaceAlias = /\*\s+as\s+([\w$]+)/.exec(clause);
    if (namespaceAlias?.[1]) {
      reExports.push({ specifier, names: [{ exported: namespaceAlias[1], local: NAMESPACE_EXPORT }] });
      continue;
    }
    if (clause.includes("*")) {
      reExports.push({ specifier, names: null });
      continue;
    }
    const named = /\{([^}]*)\}/.exec(clause);
    reExports.push({ specifier, names: named?.[1] ? parseNamedClause(named[1]) : [] });
  }
  return reExports;
}

export function declaresExport(source: string, exportName: string): boolean {
  if (exportName === "default") {
    return /\bexport\s+default\b/.test(source);
  }
  const escaped = exportName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const declaration = new RegExp(
    `\\bexport\\s+(?:declare\\s+)?(?:async\\s+)?(?:function|class|const|let|var)\\s+${escaped}\\b`,
  );
  if (declaration.test(source)) {
    return true;
  }
  const localExportList = /\bexport\s*\{([^}]*)\}(?!\s*from)/g;
  let match: RegExpExecArray | null;
  while ((match = localExportList.exec(source))) {
    if (parseNamedClause(match[1] ?? "").some((entry) => entry.exported === exportName)) {
      return true;
    }
  }
  return false;
}

function candidatePaths(basePath: string): string[] {
  const candidates = CANDIDATE_SUFFIXES.map((suffix) => basePath + suffix);
  const jsExtension = /\.jsx?$/.exec(basePath);
  if (jsExtension) {
    const withoutExtension = basePath.slice(0, -jsExtension[0].length);
    candidates.push(...[".tsrx", ".ts", ".tsx"].map((extension) => withoutExtension + extension));
  }
  return candidates;
}

function tryResolveFile(basePath: string): string | null {
  for (const candidate of candidatePaths(basePath)) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function aliasSubpathBase(target: string): string {
  try {
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      return target;
    }
  } catch {
    // Fall through to the file's directory.
  }
  return path.dirname(target);
}

export function resolveImportSpecifier(
  specifier: string,
  importingFile: string,
  aliases: Record<string, string>,
): string | null {
  if (specifier.startsWith(".")) {
    return tryResolveFile(path.resolve(path.dirname(importingFile), specifier));
  }
  const entries = Object.entries(aliases).sort((a, b) => b[0].length - a[0].length);
  for (const [alias, target] of entries) {
    if (specifier === alias) {
      return tryResolveFile(target);
    }
    if (specifier.startsWith(`${alias}/`)) {
      return tryResolveFile(path.join(aliasSubpathBase(target), specifier.slice(alias.length + 1)));
    }
  }
  return null;
}
