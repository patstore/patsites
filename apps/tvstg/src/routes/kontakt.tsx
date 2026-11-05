import { createFileRoute } from "@tanstack/react-router";
import { getFormByTitle, getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Kontakt from "../content/Kontakt/Kontakt";

export const Route = createFileRoute("/kontakt")({
  loader: async () => {
    const [page, form] = await Promise.all([
      getWebpageData({ data: { paths: ["kontakt"], contentIds: ["contact_page"] } }),
      getFormByTitle({ data: { title: "Kontaktformular" } }),
    ]);
    return { patstore: { ...page, ...form } };
  },
  head: () => ({
    meta: seo({
      title: "Kontakt",
      description:
        "Hast Du Fragen zum Sportangebot, unseren Veranstaltungen oder dem Verein? Schreibe uns oder ruf an.",
    }),
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Kontakt />
    </PatstoreScope>
  );
}
