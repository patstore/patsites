import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Mitgliedschaft from "../content/Mitgliedschaft/Mitgliedschaft";

export const Route = createFileRoute("/mitgliedschaft")({
  head: () => ({
    meta: seo({
      title: "Mitgliedschaft",
      description:
        "Werde Mitglied im TV Freiburg St. Georgen: Online-Anmeldung, Mitgliedsantrag und Beiträge.",
    }),
  }),
  component: Mitgliedschaft,
});