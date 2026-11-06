import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { slugify } from "../provider/functions/slugify";
import { getCollection } from "@server/patstore.server";
import {
  byDateDesc,
  summarizeArticle,
  withImages,
} from "@server/site-data.server";

const SPORT_PAGE_ARTICLES = 4;

/** Training groups and their coaches, used by the calendar, team tiles and slide-ins. */
export const getTrainingData = createServerFn({ method: "GET" }).handler(async () => {
  const [groups, persons] = await Promise.all([
    getCollection("Group"),
    getCollection("Person"),
  ]);
  return withImages({ Group: groups, Person: persons });
});

export const getSportCategory = createServerFn({ method: "GET" })
  .validator(
    z.object({
      fachbereich: z.string().min(1),
      sportart: z.string().min(1).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const categories = await getCollection("Category");
    const matchesSlug = (title: string | null, slug: string) =>
      Boolean(title) && slugify(title as string) === slug;

    const fachbereich = categories.find(
      (category) =>
        category.type === "fachbereiche" && matchesSlug(category.title, data.fachbereich),
    );
    if (!fachbereich) {
      return null;
    }
    if (!data.sportart) {
      return { fachbereich, sportart: null, patstore: {} };
    }

    const sportart = fachbereich.categories
      .map((id) => categories.find((category) => category.objectId === id))
      .find((category) => category && matchesSlug(category.title, data.sportart!));
    if (!sportart) {
      return null;
    }

    const articles = (await getCollection("Article"))
      .filter((article) => article.categories.includes(sportart.objectId))
      .sort(byDateDesc)
      .slice(0, SPORT_PAGE_ARTICLES)
      .map(summarizeArticle);

    return {
      fachbereich,
      sportart,
      patstore: await withImages({ Article: articles }),
    };
  });
