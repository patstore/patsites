import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { slugify } from "../provider/functions/slugify";
import { getCollection } from "@server/patstore.server";
import {
  byDateDesc,
  summarizeArticle,
  withImages,
} from "@server/site-data.server";

export const ARTICLES_PER_PAGE = 18;

const articlesByDate = async () => (await getCollection("Article")).sort(byDateDesc);

export const getLatestArticles = createServerFn({ method: "GET" })
  .validator(
    z.object({
      category: z.string().optional(),
      limit: z.number().int().min(1).max(ARTICLES_PER_PAGE),
    }),
  )
  .handler(async ({ data }) => {
    const articles = (await articlesByDate())
      .filter((article) => !data.category || article.categories.includes(data.category))
      .slice(0, data.limit)
      .map(summarizeArticle);

    return withImages({ Article: articles });
  });

export const getArticlePage = createServerFn({ method: "GET" })
  .validator(
    z.object({
      kategorie: z.string().optional(),
      seite: z.number().int().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const matching = (await articlesByDate()).filter(
      (article) => !data.kategorie || article.categories.includes(data.kategorie),
    );
    const pageCount = Math.ceil(matching.length / ARTICLES_PER_PAGE);
    const page = Math.min(data.seite, Math.max(pageCount, 1));
    const articles = matching
      .slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE)
      .map(summarizeArticle);

    return {
      patstore: await withImages({ Article: articles }),
      page,
      pageCount,
    };
  });

export const getArticleBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const article = (await articlesByDate()).find(
      (item) => item.title && slugify(item.title) === data.slug,
    );
    if (!article) {
      return null;
    }

    const images = await getCollection("Image");
    const imageUrl = images.find((image) => image.objectId === article.image)?.url;

    return { article, imageUrl };
  });
