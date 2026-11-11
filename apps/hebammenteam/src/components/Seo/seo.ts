export const SITE_NAME = "Hebammen-Team";
const DEFAULT_DESCRIPTION = "Begleitung in Schwangerschaft, Geburt und Wochenbett.";

/** Route `head().meta` entries for a page. */
export const seo = ({
  title,
  description,
  image,
}: {
  title?: string | null;
  description?: string | null;
  image?: string | null;
} = {}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const summary = description || DEFAULT_DESCRIPTION;

  return [
    { title: fullTitle },
    { name: "description", content: summary },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: summary },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "de_DE" },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: summary },
    ...(image
      ? [
          { property: "og:image", content: image },
          { name: "twitter:image", content: image },
        ]
      : []),
  ];
};

/** Plain-text excerpt of CMS HTML for meta descriptions. */
export const excerpt = (html: string | null | undefined, length = 160) => {
  const text = (html ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
};
