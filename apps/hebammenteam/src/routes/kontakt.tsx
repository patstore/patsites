import { createFileRoute } from "@tanstack/react-router";
import { getFormByTitle, getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Contact from "../content/Contact/Contact";

export const Route = createFileRoute("/kontakt")({
  loader: async () => {
    const [page, form] = await Promise.all([
      getWebpageData({ data: { paths: ["/kontakt"] } }),
      getFormByTitle({ data: { title: "Kontaktformular" } }),
    ]);
    return { patstore: { ...page, ...form } };
  },
  head: () => ({
    meta: seo({
      title: "Kontakt",
      description: "Schreiben Sie dem Hebammen-Team.",
    }),
  }),
  component: ContactPage,
});

function ContactPage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Contact />
    </PatstoreScope>
  );
}
