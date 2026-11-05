import { createFileRoute } from "@tanstack/react-router";
import { getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Verein from "../../content/Verein/Verein";

export const Route = createFileRoute("/verein/vorstand")({
  loader: async () => ({
    patstore: await getWebpageData({ data: { paths: ["vorstand"] } }),
  }),
  head: () => ({
    meta: seo({
      title: "Vorstand",
      description: "In aller Kürze das Wesentliche über den Verein.",
    }),
  }),
  component: VorstandPage,
});

function VorstandPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Verein />
    </PatstoreScope>
  );
}
