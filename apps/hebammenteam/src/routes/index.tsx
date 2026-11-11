import { createFileRoute } from "@tanstack/react-router";
import { getWebpageData } from "@functions/pages.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Home from "../content/Home/Home";

export const Route = createFileRoute("/")({
  loader: async () => ({
    patstore: await getWebpageData({ data: { paths: ["/", "/start"] } }),
  }),
  head: () => ({ meta: seo({ title: "Start" }) }),
  component: HomePage,
});

function HomePage() {
  const { patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Home />
    </PatstoreScope>
  );
}
