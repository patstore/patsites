import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Verein from "../../content/Verein/Verein";

export const Route = createFileRoute("/verein/vorstand")({
  head: () => ({
    meta: seo({
      title: "Vorstand",
      description: "In aller Kürze das Wesentliche über den Verein.",
    }),
  }),
  component: Verein,
});
