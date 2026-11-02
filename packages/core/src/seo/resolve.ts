import type { SeoData } from "./types.ts";

function text(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: unknown }).url;
    return typeof url === "string" && url.trim() ? url.trim() : undefined;
  }
  return undefined;
}

function flag(value: unknown): boolean | undefined {
  if (typeof value === "boolean") {
    return value;
  }
  return undefined;
}

const aliases: Record<string, keyof SeoData> = {
  title: "title",
  meta_title: "title",
  metaTitle: "title",
  seo_title: "title",
  description: "description",
  meta_description: "description",
  metaDescription: "description",
  seo_description: "description",
  keywords: "keywords",
  author: "author",
  image: "image",
  og_image: "image",
  url: "url",
  canonicalUrl: "canonicalUrl",
  canonical_url: "canonicalUrl",
  siteName: "siteName",
  site_name: "siteName",
  locale: "locale",
  twitterHandle: "twitterHandle",
  twitter_handle: "twitterHandle",
};

/** Server record wins when a field is present. Static `fallback` covers everything else. */
export function resolveSeo(server: unknown, fallback: SeoData): SeoData {
  if (!server || typeof server !== "object") {
    return fallback;
  }

  const record = server as Record<string, unknown>;
  const next: SeoData = { ...fallback };

  for (const [key, target] of Object.entries(aliases)) {
    const value = text(record[key]);
    if (!value) {
      continue;
    }
    if (target === "title" || target === "description") {
      next[target] = value;
      continue;
    }
    Object.assign(next, { [target]: value });
  }

  const noindex = flag(record.noindex);
  const nofollow = flag(record.nofollow);
  if (noindex !== undefined) {
    next.noindex = noindex;
  }
  if (nofollow !== undefined) {
    next.nofollow = nofollow;
  }
  if (record.structuredData && typeof record.structuredData === "object") {
    next.structuredData = record.structuredData as Record<string, unknown>;
  }

  return next;
}
