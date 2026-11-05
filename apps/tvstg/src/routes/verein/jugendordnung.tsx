import { createFileRoute } from "@tanstack/react-router";
import { getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Jugendordnung from "../../content/Jugendordnung/Jugendordnung";

export const Route = createFileRoute("/verein/jugendordnung")({
  loader: async () => ({
    patstore: await getWebpageData({ data: { paths: ["/jugendordnung"] } }),
  }),
  head: () => ({
    meta: seo({
      title: "Jugendordnung",
      description: "Die Jugendordnung des TV Freiburg St. Georgen von 1897 e.V.",
    }),
  }),
  component: JugendordnungPage,
});

function JugendordnungPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Jugendordnung />
    </PatstoreScope>
  );
}
