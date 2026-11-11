import { createFileRoute, notFound } from "@tanstack/react-router";
import { getSportCategory } from "@functions/sport.functions";
import { seo } from "@components";
import SportTemplate from "../../../content/SportTemplate/SportTemplate";

export const Route = createFileRoute("/sportarten/$fachbereich/$sportart")({
  loader: async ({ params }) => {
    const category = await getSportCategory({
      data: { fachbereich: params.fachbereich, sportart: params.sportart },
    });
    if (!category?.sportart) {
      throw notFound();
    }
    return { sportart: category.sportart };
  },
  head: ({ loaderData }) => ({
    meta: seo({
      title: loaderData?.sportart.title,
      description: loaderData?.sportart.description,
    }),
  }),
  component: SportartPage,
});

function SportartPage() {
  const { sportart } = Route.useLoaderData();

  return <SportTemplate sport={sportart} />;
}
