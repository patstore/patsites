import { createFileRoute, notFound } from "@tanstack/react-router";
import { getArticleBySlug } from "@functions/articles.functions";
import { excerpt, seo } from "@components";
import { PatstoreScope } from "@provider";
import Bericht from "../../content/Bericht/Bericht";

export const Route = createFileRoute("/aktuelles/$slug")({
  loader: async ({ params }) => {
    const result = await getArticleBySlug({ data: { slug: params.slug } });
    if (!result) {
      throw notFound();
    }
    return result;
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    const image = loaderData?.patstore.Image?.find(
      (item) => item.objectId === article?.image,
    );
    return {
      meta: seo({
        title: article?.title,
        description: excerpt(article?.text),
        image: image?.url,
      }),
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, patstore } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Bericht article={article} />
    </PatstoreScope>
  );
}
