import "@tanstack/react-start/server-only";
import { slugify } from "../provider/functions/slugify";
import { groupPath } from "../ui/SportCalendar/functions/groupSlug";
import { getCollection } from "./patstore.server";
import { getServerEnv } from "./env.server";
import { isPublished } from "./site-data.server";

const STATIC_PATHS = [
	"/",
	"/termine",
	"/kontakt",
	"/mitgliedschaft",
	"/sportangebot",
	"/medien/berichte",
	"/medien/downloads",
	"/medien/veroeffentlichungen",
	"/jobboerse",
	"/verein/vorstand",
	"/verein/praevention",
	"/verein/satzung",
	"/verein/jugendordnung",
	"/impressum",
	"/datenschutzerklaerung"
];

const escapeXml = (value: string) =>
	value.replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`);

export async function buildSitemap(requestUrl: string): Promise<string> {
	const origin = (
		getServerEnv().siteUrl ?? new URL(requestUrl).origin
	).replace(/\/$/, "");
	const [articles, categories, allGroups] = await Promise.all([
		getCollection("Article"),
		getCollection("Category"),
		getCollection("Group")
	]);
	const groups = allGroups.filter(isPublished);

	const entries: { path: string; lastmod?: string | null }[] =
		STATIC_PATHS.map((path) => ({
			path
		}));

	for (const fachbereich of categories.filter(
		(category) => category.type === "fachbereiche"
	)) {
		if (!fachbereich.title) continue;
		const base = `/sportangebot/${slugify(fachbereich.title)}`;
		entries.push({ path: base });
		for (const id of fachbereich.categories) {
			const sportart = categories.find(
				(category) => category.objectId === id
			);
			if (sportart?.title) {
				entries.push({ path: `${base}/${slugify(sportart.title)}` });
			}
		}
	}

	for (const group of groups) {
		if (group.title && group.times?.length > 0) {
			entries.push({ path: groupPath(group, groups) });
		}
	}

	for (const article of articles.filter(isPublished)) {
		if (article.title) {
			entries.push({
				path: `/aktuelles/${slugify(article.title)}`,
				lastmod: article.date
			});
		}
	}

	const urls = entries.map(({ path, lastmod }) => {
		const date = lastmod ? new Date(lastmod) : null;
		const lastmodTag =
			date && !Number.isNaN(date.getTime())
				? `<lastmod>${date.toISOString().slice(0, 10)}</lastmod>`
				: "";
		return `<url><loc>${escapeXml(origin + path)}</loc>${lastmodTag}</url>`;
	});

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
}
