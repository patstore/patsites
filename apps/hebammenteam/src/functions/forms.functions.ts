import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { loadStaticRecords } from "@repo/server";
import type { FormClass } from "@data";
import { createObject, getCollection } from "@server/patstore.server";
import { contactFormIdForPerson } from "./contactForm";

const COURSE_REGISTRATION_FORM_ID = "KEXkmbSYHF";

/** Names match `data` keys; labels are what the after-save email prints. */
const COURSE_REGISTRATION_FIELDS = [
	{ name: "kurs", label: "Kurs" },
	{ name: "kursbeginn", label: "Kursbeginn am / Uhrzeit" },
	{ name: "vorname", label: "Vorname" },
	{ name: "nachname", label: "Nachname" },
	{ name: "geburtsdatum", label: "Geburtsdatum" },
	{ name: "strasse", label: "Straße" },
	{ name: "plzOrt", label: "PLZ / Ort" },
	{ name: "telefon", label: "Telefon-Nr." },
	{ name: "mobil", label: "Mobil" },
	{ name: "email", label: "E-Mail" },
	{ name: "krankenversicherung", label: "Krankenvers." },
	{ name: "kassenNr", label: "Kassen-Nr." },
	{ name: "versNr", label: "Vers.-Nr." },
	{ name: "partnerName", label: "Name des Partners / der Partnerin" },
	{ name: "kind", label: "Wievieltes Kind?" },
	{ name: "geburtstermin", label: "Voraussichtlicher Geburtstermin" }
] as const;

export const submitContactMessage = createServerFn({ method: "POST" })
	.validator(
		z.object({
			name: z.string().trim().min(1).max(200),
			email: z.email(),
			message: z.string().trim().min(1).max(5000),
			honeypot: z.string().optional()
		})
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
				message: data.message
			}
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
			honeypot: z.string().optional()
		})
	)
	.handler(async ({ data }) => {
		if (data.honeypot) {
			return { ok: true as const };
		}

		const values: Record<string, string> = {
			name: [data.vorname, data.nachname].filter(Boolean).join(" "),
			kurs: data.eventTitle,
			kursId: data.eventId,
			vorname: data.vorname,
			nachname: data.nachname,
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
			partnerName: data.partnerName,
			kind: data.kind,
			geburtstermin: data.geburtstermin
		};
		const submissionValues = Object.fromEntries(
			Object.entries(values).filter(([, value]) => value)
		);
		const fields = COURSE_REGISTRATION_FIELDS.filter(
			(field) => submissionValues[field.name]
		);

		await createObject("Item", {
			data: submissionValues,
			fields,
			reference_id: COURSE_REGISTRATION_FORM_ID,
			type: "form"
		});
		return { ok: true as const };
	});

const formFieldNames = (fields: unknown) =>
	Array.isArray(fields)
		? fields.flatMap((field: { name?: string; id?: string }) => {
				const name = field?.name?.trim() || field?.id?.trim();
				return name ? [name] : [];
			})
		: [];

export const submitPersonMessage = createServerFn({ method: "POST" })
	.validator(
		z.object({
			personId: z.string().trim().min(1).max(80),
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

		const formId = contactFormIdForPerson(data.personId);
		if (!formId) {
			throw new Error("Unknown form");
		}

		const values: Record<string, string> = {
			email: data.email,
			telefon: data.telefon,
			betreff: data.betreff,
			text: data.text
		};
		const liveForm = (await getCollection("Form")).find(
			(item) => item.objectId === formId
		);
		const snapshotForm = (
			loadStaticRecords("Form", {
				states: null
			}) as unknown as FormClass[]
		).find((item) => item.objectId === formId);
		const fieldNames = formFieldNames(
			liveForm?.form_fields?.length
				? liveForm.form_fields
				: snapshotForm?.form_fields
		);
		let submissionValues = values;
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
		if (data.telefon && !included.has("telefon")) {
			submissionValues = {
				...submissionValues,
				telefon: data.telefon
			};
		}

		await createObject("Item", {
			data: submissionValues,
			reference_id: formId,
			type: "form"
		});
		return { ok: true as const };
	});
