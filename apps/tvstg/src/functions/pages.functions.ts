import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getBerlinDateParts } from "../provider/functions/berlinTime";
import { getCollection } from "@server/patstore.server";
import { byDateDesc, selectPageContent, withImages } from "@server/site-data.server";

/** CMS-managed page content, see `selectPageContent`. */
export const getWebpageData = createServerFn({ method: "GET" })
  .validator(
    z.object({
      paths: z.array(z.string().min(1)).max(5).default([]),
      contentIds: z.array(z.string().min(1)).max(5).default([]),
    }),
  )
  .handler(async ({ data }) => withImages(await selectPageContent(data)));

export const getDownloadsData = createServerFn({ method: "GET" }).handler(async () =>
  withImages({ Download: await getCollection("Download") }),
);

export const getPersonsData = createServerFn({ method: "GET" }).handler(async () =>
  withImages({ Person: await getCollection("Person") }),
);

/** Job postings with the groups and contact persons they reference. */
export const getJobsData = createServerFn({ method: "GET" }).handler(async () => {
  const [entries, groups, persons] = await Promise.all([
    getCollection("Entry"),
    getCollection("Group"),
    getCollection("Person"),
  ]);
  const jobs = entries.sort(
      (a, b) =>
        new Date(b.date || b.createdAt || "").getTime() -
        new Date(a.date || a.createdAt || "").getTime(),
    );
  const groupIds = new Set(jobs.map((job) => job.group));
  const contactIds = new Set(jobs.map((job) => job.contact));

  return withImages({
    Entry: jobs,
    Group: groups.filter((group) => groupIds.has(group.objectId)),
    Person: persons.filter((person) => contactIds.has(person.objectId)),
  });
});

export const getFormByTitle = createServerFn({ method: "GET" })
  .validator(z.object({ title: z.string().min(1) }))
  .handler(async ({ data }) => ({
    Form: (await getCollection("Form")).filter((form) => form.title === data.title),
  }));

/** Appointments of one Berlin calendar year; defaults to the current one. */
export const getAppointmentsByYear = createServerFn({ method: "GET" })
  .validator(z.object({ jahr: z.number().int().min(2000).max(2100).optional() }))
  .handler(async ({ data }) => {
    const currentYear = getBerlinDateParts(Date.now()).year;
    const jahr = data.jahr ?? currentYear;
    const appointments = (await getCollection("Appointment")).filter(
      (appointment) =>
        appointment.date?.start &&
        getBerlinDateParts(appointment.date.start).year === jahr,
    );
    return {
      jahr,
      currentYear,
      patstore: await withImages({ Appointment: appointments }),
    };
  });
