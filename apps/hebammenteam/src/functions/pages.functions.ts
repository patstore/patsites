import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { PatstoreWebpage } from "@types";
import { courseSlug } from "../provider/functions/paths";
import { getCollection } from "@server/patstore.server";
import { findWebpage, selectPageContent, withImages } from "@server/site-data.server";

/** CMS-managed page content, see `selectPageContent`. */
export const getWebpageData = createServerFn({ method: "GET" })
  .validator(
    z.object({
      paths: z.array(z.string().min(1)).max(8).default([]),
      contentIds: z.array(z.string().min(1)).max(8).default([]),
    }),
  )
  .handler(async ({ data }) => withImages(await selectPageContent(data)));

export const getCoursesPage = createServerFn({ method: "GET" }).handler(async () => {
  const webpages = await getCollection("Webpage");
  const courses = webpages
    .filter((page) => courseSlug(page.path))
    .sort((a, b) => (a.title ?? "").localeCompare(b.title ?? "", "de"));
  const intro = findWebpage(webpages, ["/kurse"]);
  const pages = intro ? [intro, ...courses.filter((page) => page.objectId !== intro.objectId)] : courses;

  return {
    courses,
    patstore: await withImages({ Webpage: pages }),
  };
});

export const getCoursePage = createServerFn({ method: "GET" })
  .validator(z.object({ kursId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const webpages = await getCollection("Webpage");
    const course = webpages.find(
      (page) => courseSlug(page.path) === data.kursId || page.objectId === data.kursId,
    );
    if (!course) {
      return null;
    }
    const related = await selectPageContent({ paths: [course.path ?? `/kurse/${data.kursId}`] });
    const pages = mergePages(related.Webpage, [course]);
    return {
      course,
      patstore: await withImages({ ...related, Webpage: pages }),
    };
  });

export const getTeamPage = createServerFn({ method: "GET" }).handler(async () => {
  const [persons, page] = await Promise.all([
    getCollection("Person"),
    selectPageContent({ paths: ["/team"] }),
  ]);
  const sorted = [...persons].sort((a, b) =>
    (a.title ?? "").localeCompare(b.title ?? "", "de"),
  );
  return {
    persons: sorted,
    patstore: await withImages({ ...page, Person: sorted }),
  };
});

export const getFormByTitle = createServerFn({ method: "GET" })
  .validator(z.object({ title: z.string().min(1) }))
  .handler(async ({ data }) => ({
    Form: (await getCollection("Form")).filter((form) => form.title === data.title),
  }));

function mergePages(current: PatstoreWebpage[] | undefined, extra: PatstoreWebpage[]) {
  const byId = new Map<string, PatstoreWebpage>();
  for (const page of [...(current ?? []), ...extra]) {
    byId.set(page.objectId, page);
  }
  return [...byId.values()];
}
