export type LocalizationConfig = {
  /** URL prefixes that select a language, for example `["de", "en"]`. */
  languages: readonly string[];
  /** Language served without a prefix. */
  defaultLanguage: string;
};

export function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (path === "" || path === "/") {
    return "/";
  }
  return path.replace(/\/+$/, "") || "/";
}

export function languageFromPath(pathname: string, config: LocalizationConfig): string | null {
  const segment = normalizePath(pathname).split("/").filter(Boolean)[0];
  if (segment && config.languages.includes(segment) && segment !== config.defaultLanguage) {
    return segment;
  }
  return null;
}

/** Strips a non-default language prefix. CMS content is keyed by this path. */
export function canonicalPagePath(pathname: string, config: LocalizationConfig): string {
  const path = normalizePath(pathname);
  const language = languageFromPath(path, config);
  if (!language) {
    return path;
  }
  const rest = path.slice(language.length + 1);
  return rest === "" ? "/" : rest;
}

export function localizePath(pathname: string, targetLanguage: string, config: LocalizationConfig): string {
  const base = canonicalPagePath(pathname, config);
  if (targetLanguage === config.defaultLanguage || !config.languages.includes(targetLanguage)) {
    return base;
  }
  return base === "/" ? `/${targetLanguage}` : `/${targetLanguage}${base}`;
}

export function resolveDocumentLang(pathname: string, config: LocalizationConfig): string {
  return languageFromPath(pathname, config) ?? config.defaultLanguage;
}

export function isSamePagePath(currentPath: string, canonicalPath: string, config: LocalizationConfig): boolean {
  return canonicalPagePath(currentPath, config) === canonicalPagePath(canonicalPath, config);
}

export function isRoutablePath(pathname: string, routes: readonly string[]): boolean {
  const path = normalizePath(pathname);
  return routes.some((route) => normalizePath(route) === path);
}

/** Localized URL when that path is in `routes`; otherwise the canonical path. */
export function resolveLocalizedPath(
  canonicalPath: string,
  language: string,
  config: LocalizationConfig,
  routes: readonly string[],
): string {
  const localized = localizePath(canonicalPath, language, config);
  return isRoutablePath(localized, routes) ? localized : canonicalPagePath(canonicalPath, config);
}
