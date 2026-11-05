import { createFileRoute } from "@tanstack/react-router";
import { getLatestArticles } from "@functions/articles.functions";
import { deferSidebarData } from "@functions/site.functions";
import { seo } from "@components";
import { PatstoreScope } from "@provider";
import Home, { HOME_ARTICLE_COUNT, HOME_SIDEBAR_CATEGORY } from "../content/Home/Home";

export const Route = createFileRoute("/")({
  loader: async () => {
    const sidebar = deferSidebarData({
      category: HOME_SIDEBAR_CATEGORY,
      allNews: true,
      allEvents: true,
    });
    const patstore = await getLatestArticles({ data: { limit: HOME_ARTICLE_COUNT } });
    return { patstore, sidebar };
  },
  head: () => ({ meta: seo() }),
  component: HomePage,
});

function HomePage() {
  const { patstore, sidebar } = Route.useLoaderData();

  return (
    <PatstoreScope data={patstore}>
      <Home sidebar={sidebar} />
    </PatstoreScope>
  );
}
