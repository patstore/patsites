export const SITE_NAME = "HGS Haus- und Grundstückservice GmbH";

const DEFAULT_DESCRIPTION = "Wir halten ihr Haus und Grundstück in Schuss.";

/** Route `head().meta` entries for a page. */
export const seo = ({
	title,
	description
}: {
	title?: string | null;
	description?: string | null;
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
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: summary }
	];
};
