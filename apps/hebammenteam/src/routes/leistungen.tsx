import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Services from "../content/Services/Services";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: seo({
      title: "Leistungen",
      description: "Vorsorge, Geburt, Wochenbett und Beratung.",
    }),
  }),
  component: Services,
});
