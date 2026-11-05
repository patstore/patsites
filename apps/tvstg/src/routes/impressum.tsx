import { createFileRoute } from "@tanstack/react-router";
import { getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Impressum from "../content/Impressum/Impressum";

export const Route = createFileRoute("/impressum")({
  loader: async () => ({
    patstore: await getWebpageData({ data: { paths: ["impressum"] } }),
  }),
  head: () => ({ meta: seo({ title: "Impressum" }) }),
  component: ImpressumPage,
});

function ImpressumPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Impressum />
    </PatstoreScope>
  );
}
