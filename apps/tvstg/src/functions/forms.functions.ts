import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createObject, getCollection } from "@server/patstore.server";

const fieldValue = z.union([
  z.string().max(5000),
  z.number(),
  z.boolean(),
  z.array(z.string().max(500)).max(50),
]);

export const submitFormEntry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      formId: z.string().min(1),
      values: z.record(z.string(), fieldValue),
      honeypot: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    // Bots fill the hidden field; pretend success so they don't retry.
    if (data.honeypot) {
      return { ok: true as const };
    }

    const form = (await getCollection("Form")).find(
      (item) => item.objectId === data.formId,
    );
    if (!form) {
      throw new Error("Unknown form");
    }

    const allowedFields = new Set<string>(
      form.form_fields.map((field: { name: string }) => field.name),
    );
    const values = Object.fromEntries(
      Object.entries(data.values).filter(([name]) => allowedFields.has(name)),
    );

    await createObject("Item", {
      data: values,
      reference_id: form.objectId,
      type: "form",
    });
    return { ok: true as const };
  });

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(1).max(200),
      email: z.email(),
      message: z.string().trim().min(1).max(5000),
    }),
  )
  .handler(async ({ data }) => {
    await createObject("Forms", { type: "contact", data });
    return { ok: true as const };
  });
