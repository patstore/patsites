import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Datenschutz from "../content/Datenschutz/Datenschutz";

export const Route = createFileRoute("/datenschutzerklaerung")({
  head: () => ({ meta: seo({ title: "Datenschutzerklärung" }) }),
  component: Datenschutz,
});
