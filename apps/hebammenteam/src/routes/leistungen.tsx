import { createFileRoute } from "@tanstack/react-router";
import { getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Services from "../content/Services/Services";

export const Route = createFileRoute("/leistungen")({
  loader: async () => ({
    patstore: await getWebpageData({ data: { paths: ["/leistungen"] } }),
  }),
  head: () => ({
    meta: seo({
      title: "Leistungen",
      description: "Vorsorge, Geburt, Wochenbett und Beratung.",
    }),
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Services />
    </PatstoreScope>
  );
}
