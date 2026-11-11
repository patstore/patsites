import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Veroeffentlichungen from "../../content/Veroeffentlichungen/Veroeffentlichungen";

export const Route = createFileRoute("/medien/veroeffentlichungen")({
  head: () => ({
    meta: seo({
      title: "Veröffentlichungen",
      description: "Unsere Zeitschriften und Flyer hier in digitaler Form.",
    }),
  }),
  component: Veroeffentlichungen,
});
