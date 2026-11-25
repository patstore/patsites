import type { LocalizationConfig } from "@repo/core";
import { canonicalPagePath, localizePath } from "@repo/core";

export const siteLocalization: LocalizationConfig = {
	languages: ["de", "en"],
	defaultLanguage: "de"
};

function isKnownPage(canonicalPath: string): boolean {
	return (
		canonicalPath === "/" ||
		canonicalPath === "/about" ||
		canonicalPath === "/datenschutz" ||
		canonicalPath === "/athletes" ||
		canonicalPath.startsWith("/athletes/")
	);
}

/** Localized URL for a known page. Unknown paths fall back to the localized home page. */
export function toLocalizedHref(pathname: string, language: string): string {
	const canonical = canonicalPagePath(pathname, siteLocalization);
	if (!isKnownPage(canonical)) {
		return localizePath("/", language, siteLocalization);
	}
	return localizePath(canonical, language, siteLocalization);
}
