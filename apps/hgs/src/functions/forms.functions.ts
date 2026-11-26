import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createFormEntry, ensureContactForm } from "@server/patstore.server";
import type { FormFieldDefinition } from "@server/patstore.server";

/** Names match `data` keys. Labels are what patstore stores with the entry. */
export const CONTACT_FIELDS = [
	{
		name: "name",
		label: "Name",
		type: "text",
		required: true,
		placeholder: "Vor- und Nachname"
	},
	{
		name: "email",
		label: "E-Mail",
		type: "email",
		required: true,
		placeholder: "E-Mail Adresse"
	},
	{
		name: "telefon",
		label: "Telefonnummer",
		type: "text",
		required: false,
		placeholder: "Telefonnummer"
	},
	{
		name: "nachricht",
		label: "Nachricht",
		type: "textarea",
		required: true,
		placeholder: "Ihre Nachricht"
	}
] as const;

const formFields = (): FormFieldDefinition[] =>
	CONTACT_FIELDS.map((field) => ({
		id: field.name,
		name: field.name,
		type: field.type,
		required: field.required,
		options: [],
		info: "",
		description: "",
		placeholder: field.placeholder,
		label: field.label
	}));

export const submitContactMessage = createServerFn({ method: "POST" })
	.validator(
		z.object({
			name: z.string().trim().min(1).max(200),
			email: z.email(),
			telefon: z.string().trim().max(80),
			nachricht: z.string().trim().min(1).max(5000),
			honeypot: z.string().optional()
		})
	)
	.handler(async ({ data }) => {
		if (data.honeypot) {
			return { ok: true as const };
		}

		const values: Record<string, string> = {
			name: data.name,
			email: data.email,
			telefon: data.telefon,
			nachricht: data.nachricht
		};
		const submissionValues = Object.fromEntries(
			Object.entries(values).filter(([, value]) => value)
		);
		const fields = CONTACT_FIELDS.filter(
			(field) => submissionValues[field.name]
		).map((field) => ({ name: field.name, label: field.label }));

		const referenceId = await ensureContactForm(formFields());
		await createFormEntry({
			referenceId,
			data: submissionValues,
			fields
		});
		return { ok: true as const };
	});
