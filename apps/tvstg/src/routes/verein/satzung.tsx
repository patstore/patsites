import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Satzung from "../../content/Satzung/Satzung";

export const Route = createFileRoute("/verein/satzung")({
  head: () => ({
    meta: seo({
      title: "Satzung",
      description: "Die Satzung des TV Freiburg St. Georgen von 1897 e.V.",
    }),
  }),
  component: Satzung,
});
