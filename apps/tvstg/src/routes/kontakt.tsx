import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Kontakt from "../content/Kontakt/Kontakt";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: seo({
      title: "Kontakt",
      description:
        "Hast Du Fragen zum Sportangebot, unseren Veranstaltungen oder dem Verein? Schreibe uns oder ruf an.",
    }),
  }),
  component: Kontakt,
});
