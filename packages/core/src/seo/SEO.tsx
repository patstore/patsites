/** @jsxImportSource react */
import type { SeoData } from "./types.ts";

function robotsContent(data: SeoData): string | null {
  const flags = [data.noindex ? "noindex" : "", data.nofollow ? "nofollow" : ""].filter(Boolean);
  return flags.length > 0 ? flags.join(", ") : null;
}

/**
 * Renders document metadata. Place it in `<head>`.
 * Pass server data through `resolveSeo` first when a CMS record exists; otherwise pass static data.
 */
export function SEO({
  title,
  description,
  keywords,
  author,
  image,
  url,
  type = "website",
  siteName,
  locale,
  twitterCard = "summary_large_image",
  twitterHandle,
  canonicalUrl,
  noindex = false,
  nofollow = false,
  structuredData,
}: SeoData) {
  const robots = robotsContent({ title, description, noindex, nofollow });
  const canonical = canonicalUrl || url;

  return (
    <>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {author ? <meta name="author" content={author} /> : null}
      {robots ? <meta name="robots" content={robots} /> : null}
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:type" content={type} />
      {siteName ? <meta property="og:site_name" content={siteName} /> : null}
      {locale ? <meta property="og:locale" content={locale} /> : null}
      {url ? <meta property="og:url" content={url} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      {twitterHandle ? <meta name="twitter:site" content={twitterHandle} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </>
  );
}
