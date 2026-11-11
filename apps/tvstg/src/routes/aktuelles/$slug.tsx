import { createFileRoute, notFound } from "@tanstack/react-router";
import { getArticleBySlug } from "@functions/articles.functions";
import { excerpt, seo } from "@components";
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
    return {
      meta: seo({
        title: article?.title,
        description: excerpt(article?.text),
        image: loaderData?.imageUrl,
      }),
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  return <Bericht article={article} />;
}
