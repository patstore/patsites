import { createFileRoute } from "@tanstack/react-router";
import { getDownloadsData, getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Mitgliedschaft from "../content/Mitgliedschaft/Mitgliedschaft";

export const Route = createFileRoute("/mitgliedschaft")({
  loader: async () => {
    const [page, downloads] = await Promise.all([
      getWebpageData({ data: { paths: ["/mitgliedschaft"] } }),
      getDownloadsData(),
    ]);
    return { patstore: { ...page, ...downloads } };
  },
  head: () => ({
    meta: seo({
      title: "Mitgliedschaft",
      description:
        "Werde Mitglied im TV Freiburg St. Georgen: Online-Anmeldung, Mitgliedsantrag und Beiträge.",
    }),
  }),
  component: MitgliedschaftPage,
});

function MitgliedschaftPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Mitgliedschaft />
    </PatstoreScope>
  );
}
