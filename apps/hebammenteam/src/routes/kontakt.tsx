import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Contact from "../content/Contact/Contact";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: seo({
      title: "Kontakt",
      description: "Schreiben Sie dem Hebammen-Team.",
    }),
  }),
  component: Contact,
});
