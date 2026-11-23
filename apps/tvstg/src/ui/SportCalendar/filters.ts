import { z } from "zod";
import genders from "./constants/genders";

const GENDER_VALUES = genders.map((gender) => gender.value) as [
	(typeof genders)[number]["value"],
	...(typeof genders)[number]["value"][]
];

/** URL search params of pages that embed the training calendar. */
export const sportCalendarSearchSchema = z.object({
	suche: z.string().trim().max(100).default("").catch(""),
	alter: z.coerce.number().int().min(0).max(99).optional().catch(undefined),
	geschlecht: z.enum(GENDER_VALUES).default("all").catch("all"),
	/** `objectId` of the selected Fachbereich or Sportart. */
	kategorie: z.string().trim().max(60).optional().catch(undefined),
	/** Slug of the group whose slide-in is open (shown masked as its own URL). */
	gruppe: z.string().trim().max(120).optional().catch(undefined)
});

export type SportCalendarFilters = z.infer<typeof sportCalendarSearchSchema>;

export const SPORT_CALENDAR_DEFAULTS = {
	suche: "",
	geschlecht: "all"
} satisfies Partial<SportCalendarFilters>;

/** Splits a search query into its elements; each one is shown as a tag. */
export const parseSearchTerms = (value: string): string[] => {
	const seen = new Set<string>();
	return value
		.split(/[\s,]+/)
		.map((term) => term.trim())
		.filter((term) => {
			const key = term.toLowerCase();
			if (!term || seen.has(key)) {
				return false;
			}
			seen.add(key);
			return true;
		});
};
