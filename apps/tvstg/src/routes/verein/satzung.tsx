import { createFileRoute } from "@tanstack/react-router";
import { getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Satzung from "../../content/Satzung/Satzung";

export const Route = createFileRoute("/verein/satzung")({
  loader: async () => ({
    patstore: await getWebpageData({ data: { paths: ["satzung"] } }),
  }),
  head: () => ({
    meta: seo({
      title: "Satzung",
      description: "Die Satzung des TV Freiburg St. Georgen von 1897 e.V.",
    }),
  }),
  component: SatzungPage,
});

function SatzungPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Satzung />
    </PatstoreScope>
  );
}
