import { createFileRoute } from "@tanstack/react-router";
import {
  getDownloadsData,
  getPersonsData,
  getWebpageData,
} from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Praevention from "../../content/Praevention/Praevention";

export const Route = createFileRoute("/verein/praevention")({
  loader: async () => {
    const [page, persons, downloads] = await Promise.all([
      getWebpageData({ data: { paths: ["praevention", "/verein/praevention"] } }),
      getPersonsData(),
      getDownloadsData(),
    ]);
    return { patstore: { ...page, ...persons, ...downloads } };
  },
  head: () => ({
    meta: seo({
      title: "Prävention",
      description:
        "Kinder und Jugendschutz bildet ein zentrales Thema in unserem Verein. Erfahre hier alles über unsere Arbeit.",
    }),
  }),
  component: PraeventionPage,
});

function PraeventionPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Praevention />
    </PatstoreScope>
  );
}
