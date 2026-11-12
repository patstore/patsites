import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createObject, getCollection } from "@server/patstore.server";

const COURSE_REGISTRATION_FORM_ID = "KEXkmbSYHF";

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(1).max(200),
      email: z.email(),
      message: z.string().trim().min(1).max(5000),
      honeypot: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (data.honeypot) {
      return { ok: true as const };
    }

    await createObject("Forms", {
      type: "contact",
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });
    return { ok: true as const };
  });

export const submitCourseRegistration = createServerFn({ method: "POST" })
  .validator(
    z.object({
      eventId: z.string().trim().min(1).max(80),
      eventTitle: z.string().trim().max(300),
      nachname: z.string().trim().min(1).max(200),
      vorname: z.string().trim().min(1).max(200),
      geburtsdatum: z.string().trim().max(40),
      strasse: z.string().trim().max(300),
      plzOrt: z.string().trim().max(200),
      telefon: z.string().trim().max(80),
      mobil: z.string().trim().max(80),
      email: z.email(),
      kursbeginn: z.string().trim().max(500),
      krankenversicherung: z.string().trim().max(200),
      kassenNr: z.string().trim().max(80),
      versNr: z.string().trim().max(80),
      partnerName: z.string().trim().max(200),
      kind: z.string().trim().max(40),
      geburtstermin: z.string().trim().max(40),
      privacy: z.literal(true),
      honeypot: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (data.honeypot) {
      return { ok: true as const };
    }

    const values: Record<string, string> = {
      kurs: data.eventTitle,
      kursId: data.eventId,
      nachname: data.nachname,
      vorname: data.vorname,
      geburtsdatum: data.geburtsdatum,
      strasse: data.strasse,
      plzOrt: data.plzOrt,
      telefon: data.telefon,
      mobil: data.mobil,
      email: data.email,
      kursbeginn: data.kursbeginn,
      krankenversicherung: data.krankenversicherung,
      kassenNr: data.kassenNr,
      versNr: data.versNr,
      versicherungsNr: data.versNr,
      partnerName: data.partnerName,
      partner: data.partnerName,
      kind: data.kind,
      geburtstermin: data.geburtstermin,
    };

    const form = (await getCollection("Form")).find(
      (item) => item.objectId === COURSE_REGISTRATION_FORM_ID,
    );
    const fieldNames = Array.isArray(form?.form_fields)
      ? form.form_fields.flatMap((field: { name?: string; id?: string }) => {
          const name = field.name?.trim() || field.id?.trim();
          return name ? [name] : [];
        })
      : [];
    let submissionValues = values;
    if (fieldNames.length > 0) {
      const allowedFields = new Set(fieldNames);
      const filtered = Object.fromEntries(
        Object.entries(values).filter(([name]) => allowedFields.has(name)),
      );
      if (Object.keys(filtered).length > 0) {
        submissionValues = filtered;
      }
    }

    await createObject("Item", {
      data: submissionValues,
      reference_id: COURSE_REGISTRATION_FORM_ID,
      type: "form",
    });
    return { ok: true as const };
  });
