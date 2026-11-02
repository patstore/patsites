import { toLocale } from "./locale.ts";
import type { CmsContentFile, CmsPathValue } from "./types.ts";

const LOCALE_PATH = /^[a-z]{2}-[A-Z]{2}\./;

export function isCmsContentReady(content: CmsContentFile): boolean {
  return Boolean(content._meta?.generatedAt);
}

export function getAllPageContent(content: CmsContentFile): CmsContentFile["pages"] {
  return content.pages ?? {};
}

/**
 * Resolves one page's entries for `locale`.
 * Unprefixed paths are the default. `de-DE.page.hero.title` overrides that path for `de`.
 */
export function getPageContent(
  content: CmsContentFile,
  pagePath: string,
  locale: string,
): Record<string, unknown> {
  const entries = content.pages?.[pagePath];
  if (!Array.isArray(entries)) {
    return {};
  }
  const resolved: Record<string, unknown> = {};
  for (const entry of entries) {
    if (!entry || typeof entry.path !== "string" || LOCALE_PATH.test(entry.path)) {
      continue;
    }
    resolved[entry.path] = entry.value;
  }
  const languages = content._meta?.languages ?? [];
  if (languages.length <= 1) {
    return resolved;
  }
  const prefix = `${toLocale(locale)}.`;
  for (const entry of entries) {
    if (!entry || typeof entry.path !== "string" || !entry.path.startsWith(prefix)) {
      continue;
    }
    resolved[entry.path.slice(prefix.length)] = entry.value;
  }
  return resolved;
}

export function pageEntries(content: CmsContentFile, pagePath: string): CmsPathValue[] {
  const entries = content.pages?.[pagePath];
  return Array.isArray(entries) ? entries : [];
}

export function bindCmsContent(content: CmsContentFile) {
  return {
    isCmsContentReady: () => isCmsContentReady(content),
    getAllPageContent: () => getAllPageContent(content),
    getPageContent: (pagePath: string, locale: string) => getPageContent(content, pagePath, locale),
    pageEntries: (pagePath: string) => pageEntries(content, pagePath),
  };
}
