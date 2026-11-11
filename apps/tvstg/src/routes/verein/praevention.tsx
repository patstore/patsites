import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Praevention from "../../content/Praevention/Praevention";

export const Route = createFileRoute("/verein/praevention")({
  head: () => ({
    meta: seo({
      title: "Prävention",
      description:
        "Kinder und Jugendschutz bildet ein zentrales Thema in unserem Verein. Erfahre hier alles über unsere Arbeit.",
    }),
  }),
  component: Praevention,
});
