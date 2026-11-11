import { createFileRoute } from "@tanstack/react-router";
import { getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Privacy from "../content/Privacy/Privacy";

export const Route = createFileRoute("/datenschutz")({
  loader: async () => ({
    patstore: await getWebpageData({
      data: { paths: ["/datenschutz", "/datenschutzerklaerung"] },
    }),
  }),
  head: () => ({ meta: seo({ title: "Datenschutz" }) }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Privacy />
    </PatstoreScope>
  );
}
