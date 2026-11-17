export const SITE_NAME = "No Co Girls";

const DEFAULT_DESCRIPTION = "Pictures and news from women's Nordic Combined.";

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
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: summary }
	];
};
