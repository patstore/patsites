import { createFileRoute, notFound } from "@tanstack/react-router";
import { getSportCategory, getTrainingData } from "@functions/sport.functions";
import { deferSidebarData } from "@functions/site.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import SportTemplate from "../../../content/SportTemplate/SportTemplate";

export const Route = createFileRoute("/sportarten/$fachbereich/$sportart")({
  loader: async ({ params }) => {
    const [category, training] = await Promise.all([
      getSportCategory({
        data: { fachbereich: params.fachbereich, sportart: params.sportart },
      }),
      getTrainingData(),
    ]);
    if (!category?.sportart) {
      throw notFound();
    }
    return {
      sportart: category.sportart,
      patstore: { ...training, ...category.patstore },
      sidebar: deferSidebarData({ category: category.sportart.objectId }),
    };
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
  const { sportart, patstore, sidebar } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <SportTemplate sport={sportart} sidebar={sidebar} />
    </PatstoreScope>
  );
}
