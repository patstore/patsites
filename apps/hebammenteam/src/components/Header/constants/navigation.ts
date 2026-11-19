export const mainNav = [
	{ label: "Team", to: "/team" },
	{ label: "Kurse", to: "/kurse" },
	{ label: "Leistungen", to: "/leistungen" },
	{ label: "Kontakt", to: "/kontakt" }
] as const;

export const legalNav = [
	{ label: "Impressum", to: "/impressum" },
	{ label: "Datenschutz", to: "/datenschutz" }
] as const;

export type NavItem = (typeof mainNav)[number] | (typeof legalNav)[number];
