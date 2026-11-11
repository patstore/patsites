import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createObject } from "@server/patstore.server";

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
