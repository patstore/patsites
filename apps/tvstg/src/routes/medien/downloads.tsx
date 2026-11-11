import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Downloads from "../../content/Downloads/Downloads";

export const Route = createFileRoute("/medien/downloads")({
  head: () => ({
    meta: seo({ title: "Downloads", description: "Dokumente und Downloads" }),
  }),
  component: Downloads,
});
