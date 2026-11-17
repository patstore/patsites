import type { ExtraClassFetch, SupplementalField } from "@repo/server/vite";

const text = (id: string): SupplementalField => ({ id, type: "string" });
const gallery: SupplementalField = { id: "gallery", type: "gallery" };

/**
 * Columns this site reads that are not declared on the PatStore module.
 * The snapshot generator skips a name the GraphQL type does not have.
 */
export const supplementFields: Record<string, SupplementalField[]> = {
	Category: [text("title"), text("image"), gallery],
	Entry: [
		text("title"),
		text("text"),
		text("image"),
		text("state"),
		text("date"),
		text("lang"),
		gallery
	],
	Event: [
		text("title"),
		text("location"),
		text("image"),
		text("state"),
		gallery
	],
	Image: [
		text("title"),
		text("description"),
		{ id: "active", type: "checkbox" },
		gallery
	],
	Person: [
		text("title"),
		text("description"),
		text("text"),
		text("image"),
		text("state"),
		text("date"),
		text("slug"),
		gallery
	],
	Webpage: [
		text("path"),
		text("text"),
		text("subtitle"),
		text("label"),
		text("state"),
		text("date"),
		text("image"),
		{ id: "content", type: "edit_webpage_components" },
		gallery
	]
};

export const extraClasses: ExtraClassFetch[] = [];
