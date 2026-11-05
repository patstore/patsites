import { createFileRoute } from "@tanstack/react-router";
import { getDownloadsData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Downloads from "../../content/Downloads/Downloads";

export const Route = createFileRoute("/medien/downloads")({
  loader: async () => ({ patstore: await getDownloadsData() }),
  head: () => ({
    meta: seo({ title: "Downloads", description: "Dokumente und Downloads" }),
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Downloads />
    </PatstoreScope>
  );
}
