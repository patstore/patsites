import { createFileRoute } from "@tanstack/react-router";
import { getDownloadsData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Veroeffentlichungen from "../../content/Veroeffentlichungen/Veroeffentlichungen";

export const Route = createFileRoute("/medien/veroeffentlichungen")({
  loader: async () => ({ patstore: await getDownloadsData() }),
  head: () => ({
    meta: seo({
      title: "Veröffentlichungen",
      description: "Unsere Zeitschriften und Flyer hier in digitaler Form.",
    }),
  }),
  component: VeroeffentlichungenPage,
});

function VeroeffentlichungenPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Veroeffentlichungen />
    </PatstoreScope>
  );
}
