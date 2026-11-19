import type { FormClass, PersonClass } from "@data";
import { loadStaticRecords } from "@repo/server";

/** Form whose id is stored on the person, including unpublished forms. */
export const contactFormId = (
	categories: readonly string[] | null | undefined
) => {
	const formIds = new Set(
		(loadStaticRecords("Form", { states: null }) as unknown as FormClass[]).map(
			(form) => form.objectId
		)
	);
	return (categories ?? []).find((id) => formIds.has(id)) ?? null;
};

export const contactFormIdForPerson = (personId: string) => {
	const person = (
		loadStaticRecords("Person", { states: null }) as unknown as PersonClass[]
	).find((item) => item.objectId === personId);
	return contactFormId(person?.categories);
};
