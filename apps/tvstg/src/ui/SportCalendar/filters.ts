import { z } from "zod";
import genders from "./constants/genders";

const GENDER_VALUES = genders.map((gender) => gender.value) as [
  (typeof genders)[number]["value"],
  ...(typeof genders)[number]["value"][],
];

/** URL search params of pages that embed the training calendar. */
export const sportCalendarSearchSchema = z.object({
  suche: z.string().trim().max(100).default("").catch(""),
  alter: z.coerce.number().int().min(0).max(99).optional().catch(undefined),
  geschlecht: z.enum(GENDER_VALUES).default("all").catch("all"),
});

export type SportCalendarFilters = z.infer<typeof sportCalendarSearchSchema>;

export const SPORT_CALENDAR_DEFAULTS = {
  suche: "",
  geschlecht: "all",
} satisfies Partial<SportCalendarFilters>;
