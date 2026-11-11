import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Jugendordnung from "../../content/Jugendordnung/Jugendordnung";

export const Route = createFileRoute("/verein/jugendordnung")({
  head: () => ({
    meta: seo({
      title: "Jugendordnung",
      description: "Die Jugendordnung des TV Freiburg St. Georgen von 1897 e.V.",
    }),
  }),
  component: Jugendordnung,
});
