import type { LocalizationConfig } from "@repo/core";

export interface HeaderNavItem {
	path: string;
	label: string;
}

const NAV_BY_LANGUAGE: Record<string, HeaderNavItem[]> = {
	de: [
		{ path: "/gallery", label: "Galerie" },
		{ path: "/athletes", label: "Athleten" },
		{ path: "/calendar", label: "Kalender" },
		{ path: "/about", label: "Über uns" }
	],
	en: [
		{ path: "/gallery", label: "Gallery" },
		{ path: "/athletes", label: "Athletes" },
		{ path: "/calendar", label: "Calendar" },
		{ path: "/about", label: "About" }
	]
};

export function getHeaderNavItems(
	language: string,
	fallback: LocalizationConfig["defaultLanguage"]
): HeaderNavItem[] {
	return NAV_BY_LANGUAGE[language] ?? NAV_BY_LANGUAGE[fallback] ?? [];
}
