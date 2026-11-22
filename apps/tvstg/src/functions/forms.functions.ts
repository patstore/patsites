import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createObject, getCollection } from "@server/patstore.server";

const fieldValue = z.union([
	z.string().max(5000),
	z.number(),
	z.boolean(),
	z.array(z.string().max(500)).max(50)
]);

export const submitFormEntry = createServerFn({ method: "POST" })
	.validator(
		z.object({
			formId: z.string().min(1),
			values: z.record(z.string(), fieldValue),
			honeypot: z.string().optional()
		})
	)
	.handler(async ({ data }) => {
		// Bots fill the hidden field; pretend success so they don't retry.
		if (data.honeypot) {
			return { ok: true as const };
		}

		const form = (await getCollection("Form")).find(
			(item) => item.objectId === data.formId
		);
		if (!form) {
			throw new Error("Unknown form");
		}

		const allowedFields = new Set<string>(
			form.form_fields.map((field: { name: string }) => field.name)
		);
		const values = Object.fromEntries(
			Object.entries(data.values).filter(([name]) =>
				allowedFields.has(name)
			)
		);

		await createObject("Item", {
			data: values,
			reference_id: form.objectId,
			type: "form"
		});
		return { ok: true as const };
	});

export const submitContactMessage = createServerFn({ method: "POST" })
	.validator(
		z.object({
			name: z.string().trim().min(1).max(200),
			email: z.email(),
			message: z.string().trim().min(1).max(5000)
		})
	)
	.handler(async ({ data }) => {
		await createObject("Forms", { type: "contact", data });
		return { ok: true as const };
	});

const PERSON_CONTACT_FORM_ID = "GGIBq5E6GA";

const formFieldNames = (fields: unknown) =>
	Array.isArray(fields)
		? fields.flatMap((field: { name?: string; id?: string }) => {
				const name = field?.name?.trim() || field?.id?.trim();
				return name ? [name] : [];
			})
		: [];

export const submitPersonContact = createServerFn({ method: "POST" })
	.validator(
		z.object({
			person: z.string().trim().min(1).max(200),
			gruppe: z.string().trim().max(300),
			email: z.email(),
			telefon: z.string().trim().max(80),
			betreff: z.string().trim().min(1).max(300),
			text: z.string().trim().min(1).max(5000),
			honeypot: z.string().optional()
		})
	)
	.handler(async ({ data }) => {
		if (data.honeypot) {
			return { ok: true as const };
		}

		const values: Record<string, string> = {
			person: data.person,
			gruppe: data.gruppe,
			email: data.email,
			telefon: data.telefon,
			betreff: data.betreff,
			text: data.text
		};
		const form = (await getCollection("Form")).find(
			(item) => item.objectId === PERSON_CONTACT_FORM_ID
		);
		const fieldNames = formFieldNames(form?.form_fields);

		let submissionValues: Record<string, string> = values;
		if (fieldNames.length > 0) {
			const byName = new Map(
				Object.entries(values).map(([name, value]) => [
					name.toLowerCase(),
					value
				])
			);
			const filtered = Object.fromEntries(
				fieldNames.flatMap((name) => {
					const value = byName.get(name.toLowerCase());
					return value === undefined ? [] : [[name, value]];
				})
			);
			if (Object.keys(filtered).length > 0) {
				submissionValues = filtered;
			}
		}

		const included = new Set(
			Object.keys(submissionValues).map((name) => name.toLowerCase())
		);
		if (!included.has("email")) {
			submissionValues = { ...submissionValues, email: data.email };
		}

		await createObject("Item", {
			data: submissionValues,
			reference_id: PERSON_CONTACT_FORM_ID,
			type: "form"
		});
		return { ok: true as const };
	});
