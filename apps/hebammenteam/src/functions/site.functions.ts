import { createServerFn } from "@tanstack/react-start";
import { getCollection } from "@server/patstore.server";
import { selectPageContent, withImages } from "@server/site-data.server";

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
      Image: [],
    }),
  };
});
