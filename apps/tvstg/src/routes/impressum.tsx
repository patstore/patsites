import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Impressum from "../content/Impressum/Impressum";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: seo({ title: "Impressum" }) }),
  component: Impressum,
});
