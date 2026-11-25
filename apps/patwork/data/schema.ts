// Matches the @repo/server schema barrel. Regenerated when PatStore credentials are set.
import { z } from "zod";

const record = {
  objectId: z.string(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  categories: z.array(z.string()).nullable().optional()
};

export const downloadSchema = z.looseObject({
  ...record,
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  filePath: z.string().optional()
});

export const articleSchema = z.looseObject({
  ...record,
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  gallery: z.array(z.string()).nullable().optional(),
  date: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  data: z
    .object({
      vorschaubild: z.union([z.string(), z.array(z.string())]).nullable().optional(),
      kategorie: z.string().nullable().optional(),
      leistungen: z.string().nullable().optional(),
      Jahr: z.string().nullable().optional()
    })
    .nullable()
    .optional()
});

export const userSchema = z.looseObject({
  ...record,
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional()
});

export const imageSchema = z.looseObject({
  ...record,
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  filePath: z.string().optional()
});

export const categorySchema = z.looseObject({
  ...record,
  title: z.string().nullable().optional()
});

export const webpageSchema = z.looseObject({
  ...record,
  path: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
  title: z.string().nullable().optional()
});

export const emailSchema = z.looseObject({
  ...record,
  title: z.string().nullable().optional()
});

export const bookingSchema = z.looseObject(record);

export const formSchema = z.looseObject({
  ...record,
  title: z.string().nullable().optional(),
  filePath: z.string().optional()
});

export const applicationSchemas = {
  Download: downloadSchema,
  Article: articleSchema,
  User: userSchema,
  Image: imageSchema,
  Category: categorySchema,
  Webpage: webpageSchema,
  Email: emailSchema,
  Booking: bookingSchema,
  Form: formSchema
} as const;

export type Application = {
  [K in keyof typeof applicationSchemas]: z.infer<(typeof applicationSchemas)[K]>;
};

declare module "@repo/server" {
  interface ApplicationModules {
    Download: z.infer<typeof downloadSchema>;
    Article: z.infer<typeof articleSchema>;
    User: z.infer<typeof userSchema>;
    Image: z.infer<typeof imageSchema>;
    Category: z.infer<typeof categorySchema>;
    Webpage: z.infer<typeof webpageSchema>;
    Email: z.infer<typeof emailSchema>;
    Booking: z.infer<typeof bookingSchema>;
    Form: z.infer<typeof formSchema>;
  }
}
