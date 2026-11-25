import type { ExtraClassFetch, SupplementalField } from "@repo/server/vite";

const text = (id: string): SupplementalField => ({ id, type: "string" });
const gallery: SupplementalField = { id: "gallery", type: "gallery" };

/**
 * Columns this site reads that are not always declared on the PatStore module.
 * The snapshot generator skips a name the GraphQL type does not have.
 */
export const supplementFields: Record<string, SupplementalField[]> = {
    Article: [
        text("title"),
        text("description"),
        text("text"),
        text("image"),
        text("state"),
        text("date"),
        text("link"),
        text("slug"),
        gallery
    ],
    Category: [text("title"), text("label"), text("state"), gallery],
    Download: [
        text("title"),
        text("description"),
        text("state"),
        gallery
    ],
    Form: [text("title"), text("text"), text("label"), text("state"), gallery],
    Image: [text("title"), text("description"), gallery],
    Webpage: [
        text("path"),
        text("text"),
        text("label"),
        text("state"),
        text("date"),
        text("image"),
        gallery
    ]
};

export const extraClasses: ExtraClassFetch[] = [];
