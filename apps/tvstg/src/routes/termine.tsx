import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Termine from "../content/Termine/Termine";

export const Route = createFileRoute("/termine")({
  head: () => ({
    meta: seo({
      title: "Termine",
      description:
        "Was steht an? Kommende Termine und Veranstaltungen unseres Vereins und der Abteilungen siehst Du hier.",
    }),
  }),
  component: TerminePage,
});

function TerminePage() {
  return <Termine />;
}
