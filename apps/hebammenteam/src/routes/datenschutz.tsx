import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@components";
import Privacy from "../content/Privacy/Privacy";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({ meta: seo({ title: "Datenschutz" }) }),
  component: Privacy,
});
