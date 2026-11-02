import { flattenManifestToPaths } from "./flatten.ts";
import { pageContentKeys, toLocale } from "./locale.ts";
import { buildLocalizedPageContent, schemasEqual } from "./page-content.ts";
import { createWebpage, fetchProjectLanguages, findWebpageByPath, updateWebpage, type CmsRestEnv } from "./patstore-rest.ts";
import type { CmsContentMap, CmsManifest, CmsPageManifest, CmsPathValue } from "./types.ts";

export type SyncManifestOptions = {
  env: CmsRestEnv;
  manifest: CmsManifest;
  log?: (message: string) => void;
};

function initialPageData(pageManifest: CmsPageManifest, locales: string[]): CmsPathValue[] {
  const base = flattenManifestToPaths(pageManifest);
  const prefixed = pageContentKeys(locales)
    .filter((locale) => locale !== "default")
    .flatMap((locale) => base.map((entry) => ({ path: `${locale}.${entry.path}`, value: entry.value })));
  return [...base, ...prefixed];
}

/**
 * For each scanned page, create or update one record.
 * `page_content` is the field schema and is replaced when the scan drifts.
 * `page_data` is written only when the record is created, so CMS edits are kept.
 */
export async function syncManifestToPatStore(options: SyncManifestOptions): Promise<CmsContentMap> {
  const log = options.log ?? (() => {});
  const locales = await fetchProjectLanguages(options.env);
  const contentMap: CmsContentMap = {
    _meta: {
      generatedAt: new Date().toISOString(),
      projectId: options.env.projectId,
      source: "cms",
      languages: locales,
    },
    pages: {},
  };

  for (const [pagePath, pageManifest] of Object.entries(options.manifest.pages)) {
    try {
      const existing = await findWebpageByPath(options.env, pagePath);
      const localizedSchema = buildLocalizedPageContent(pageManifest, existing?.schema, locales);
      if (!existing) {
        const created = await createWebpage(
          options.env,
          pagePath,
          localizedSchema,
          initialPageData(pageManifest, locales),
        );
        contentMap.pages[pagePath] = created.pageData;
        log(`created ${options.env.className} for "${pagePath}"`);
        continue;
      }
      if (!schemasEqual(existing.schema, localizedSchema)) {
        await updateWebpage(options.env, existing.objectId, localizedSchema);
        log(`updated ${options.env.schemaFieldName} for "${pagePath}"`);
      }
      contentMap.pages[pagePath] = existing.pageData;
    } catch (error) {
      log(`sync failed for "${pagePath}" — using scanned defaults: ${(error as Error).message}`);
      contentMap.pages[pagePath] = flattenManifestToPaths(pageManifest);
    }
  }

  return contentMap;
}

export function contentMapFromDefaults(manifest: CmsManifest, defaultLang: string): CmsContentMap {
  const locale = toLocale(defaultLang);
  const pages: CmsContentMap["pages"] = {};
  for (const [pagePath, pageManifest] of Object.entries(manifest.pages)) {
    pages[pagePath] = flattenManifestToPaths(pageManifest);
  }
  return {
    _meta: {
      generatedAt: new Date().toISOString(),
      projectId: "",
      source: "defaults",
      languages: locale === "default" ? [] : [locale],
    },
    pages,
  };
}
