import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { PatstoreData } from "@types";
import { getCollection } from "@server/patstore.server";
import { getServerEnv } from "@server/env.server";
import { byDateDesc, selectPageContent, withImages } from "@server/site-data.server";

const SIDEBAR_ITEMS = 5;
const NEWS_WINDOW_MS = 60 * 24 * 60 * 60_000;

const FOOTER_CONTENT_IDS = ["footer_address", "footer_contact"];

/** Data every page shares: categories and locations are referenced site-wide, plus the footer. */
export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const [categories, locations, footer] = await Promise.all([
    getCollection("Category"),
    getCollection("Location"),
    selectPageContent({ contentIds: FOOTER_CONTENT_IDS }),
  ]);

  return {
    patstore: await withImages({
      Category: categories,
      Location: locations,
      Content: footer.Content,
    }),
    config: {
      bytescaleAccountId: getServerEnv().bytescaleAccountId ?? null,
    },
  };
});

/**
 * Sidebar news and events as an unawaited promise for loaders to stream.
 * A failure degrades to an empty sidebar instead of failing the page.
 */
export const deferSidebarData = (data: {
  category?: string;
  allNews?: boolean;
  allEvents?: boolean;
}): Promise<PatstoreData> =>
  getSidebarData({ data }).catch((error: unknown) => {
    console.error("[sidebar] failed to load", error);
    return {};
  });

export const getSidebarData = createServerFn({ method: "GET" })
  .validator(
    z.object({
      category: z.string().optional(),
      allNews: z.boolean().default(false),
      allEvents: z.boolean().default(false),
    }),
  )
  .handler(async ({ data }) => {
    const [entries, appointments] = await Promise.all([
      getCollection("Entry"),
      getCollection("Appointment"),
    ]);
    const now = Date.now();
    const inCategory = (item: { categories: string[] }) =>
      Boolean(data.category && item.categories.includes(data.category));

    const news = entries
      .filter((entry) => {
        const time = entry.date ? new Date(entry.date).getTime() : NaN;
        return time <= now && time >= now - NEWS_WINDOW_MS;
      })
      .filter((entry) => data.allNews || inCategory(entry))
      .sort(byDateDesc)
      .slice(0, SIDEBAR_ITEMS);

    const events = appointments
      .filter((event) => new Date(event.date?.start).getTime() > now)
      .filter((event) => data.allEvents || inCategory(event))
      .sort(
        (a, b) => new Date(a.date.start).getTime() - new Date(b.date.start).getTime(),
      )
      .slice(0, SIDEBAR_ITEMS);

    return withImages({ Entry: news, Appointment: events });
  });
