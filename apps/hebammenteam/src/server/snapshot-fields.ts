import type { ExtraClassFetch, SupplementalField } from "@repo/server/vite";

const text = (id: string): SupplementalField => ({ id, type: "string" });
const gallery: SupplementalField = { id: "gallery", type: "gallery" };

/**
 * Columns this site reads that are not declared on the PatStore module.
 * The snapshot generator skips a name the GraphQL type does not have.
 */
export const supplementFields: Record<string, SupplementalField[]> = {
  Category: [
    text("title"),
    text("type"),
    text("description"),
    text("image"),
    text("category_id"),
    text("text"),
    text("label"),
    text("state"),
    text("date"),
    gallery,
  ],
  Form: [text("text"), text("label"), text("date"), text("state"), { id: "form_fields", type: "form_fields" }, gallery],
  Location: [text("text"), text("label"), text("date"), gallery],
  Person: [text("label"), text("date"), text("email"), text("image"), gallery],
  Webpage: [
    text("path"),
    text("text"),
    text("subtitle"),
    text("label"),
    text("state"),
    text("date"),
    text("image"),
    { id: "content", type: "edit_webpage_components" },
    gallery,
  ],
};

export const extraClasses: ExtraClassFetch[] = [
  {
    className: "Content",
    moduleClass: "Webpage",
    fields: [
      text("title"),
      text("label"),
      text("text"),
      text("state"),
      text("content_id"),
      { id: "active", type: "checkbox" },
      gallery,
    ],
    dataFields: [{ id: "data", type: "json", label: "data", name: "data", position: 0 }],
  },
];
