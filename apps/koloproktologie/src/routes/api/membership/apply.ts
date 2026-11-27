import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { ValidationError } from "yup";
import countries from "../../../components/Application/constants/countries_de";
import validationSchema from "../../../components/Application/constants/validation_schema";
import getEmailArray from "../../../components/Application/functions/getEmails";
import { sessionApi } from "../../../server/auth";

const FORM_ID = "vlb5giBjHl";
const MEMBER_ROLE_ID = "tEsx6N2IUm";

type Values = Record<string, unknown>;

function asRecord(value: unknown): Record<string, unknown> | undefined {
	return value && typeof value === "object" && !Array.isArray(value)
		? (value as Record<string, unknown>)
		: undefined;
}

function text(value: unknown): string {
	return typeof value === "string" ? value : "";
}

function salutation(value: unknown): string | null {
	const rendered = text(value).trim();
	if (
		!rendered ||
		rendered === "Keine Angabe" ||
		rendered === "Keine Anrede"
	) {
		return null;
	}
	return rendered;
}

function countryName(code: unknown): string {
	return (
		countries.find((country) => country.value === code)?.label ?? text(code)
	);
}

/**
 * Validates and normalizes the request body with the same schema the form
 * uses. Unknown keys are dropped, so only known fields end up in Parse.
 */
async function validate(
	body: Record<string, unknown>
): Promise<{ values: Values } | { message: string; errors: string[] }> {
	try {
		const values = (await validationSchema.validate(body, {
			abortEarly: false,
			stripUnknown: true
		})) as Values;
		return { values };
	} catch (error) {
		if (error instanceof ValidationError) {
			const errors = Array.from(new Set(error.errors));
			return { message: errors.join(" "), errors };
		}
		throw error;
	}
}

export const Route = createFileRoute("/api/membership/apply")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const validated = await validate(await readBody(request));
					if (!("values" in validated)) {
						return Response.json(
							{
								message: validated.message,
								error: validated.message,
								errors: validated.errors
							},
							{ status: 400 }
						);
					}
					const values = validated.values;

					// SEPA data is irrelevant (and possibly stale) when paying by invoice
					if (values.billing !== "sepa") {
						values.account_owner = "";
						values.sepa_country = "";
						values.sepa_iban = "";
						values.sepa_bic = "";
					}

					const title = salutation(values.title);
					const email = text(values.email);
					const fullName = `${text(values.first_name)} ${text(values.last_name)}`;
					const submittedAt = new Date().toISOString();
					const newsletter = values.newsletter === true;
					const newsletterEmail = newsletter
						? values.newsletter_email === "existing"
							? email
							: text(values.newsletter_email_address)
						: "";

					const created = asRecord(
						asRecord(
							await sessionApi.callFunction(
								"create_user_from_data",
								{
									pre_title: values.pre_title,
									title,
									project_id: sessionApi.config.projectId,
									name: fullName,
									email,
									first_name: values.first_name,
									last_name: values.last_name,
									password: values.password,
									roles: [MEMBER_ROLE_ID],
									data: {
										// Prefills the (non-public) member search profile
										dgk: {
											address: text(values.street),
											title: text(values.pre_title),
											name: fullName,
											postal_code: text(values.zip),
											city: text(values.city),
											country: countryName(values.country)
										},
										bcd: {
											klinikposition: "",
											fachrichtung: "",
											belegklinik: "",
											tel: "",
											fax: "",
											email: "",
											location: ""
										},
										// Application data that has no dedicated field
										application: {
											submitted_at: submittedAt,
											orderly_member:
												values.orderly_member === true,
											date_of_birth: text(
												values.date_of_birth
											),
											phone: text(values.phone),
											billing: text(values.billing),
											state_examination: text(
												values.state_examination
											),
											state_examination_location: text(
												values.state_examination_location
											),
											approbation: text(
												values.approbation
											),
											approbation_location: text(
												values.approbation_location
											),
											promotion: text(values.promotion),
											promotion_location: text(
												values.promotion_location
											),
											habilitation: text(
												values.habitilation
											),
											habilitation_location: text(
												values.habitilation_location
											),
											consent: {
												data_protection:
													values.data_protection ===
													true,
												statue: values.statue === true,
												accepted_at: submittedAt
											}
										}
									},
									newsletter_optin: newsletter,
									newsletter_email: newsletterEmail,
									type: "dgk",
									settings: {
										dgk: { accept_search: false },
										bcd: { publish_specialist: false }
									},
									emails: getEmailArray(
										"dgk",
										email,
										newsletterEmail || undefined
									)
								}
							)
						)?.result
					);
					if (created?.success !== true) {
						const message =
							typeof created?.message === "string"
								? created.message
								: "Der Antrag konnte nicht gesendet werden.";
						return Response.json(
							{ message, error: message, type: created?.type },
							{
								status:
									created?.type === "user-exists"
										? 409
										: created?.type === "user-not-created"
											? 500
											: 400
							}
						);
					}

					// From here on the account exists. A failing notification or
					// Item must not turn the request into an error: the applicant
					// could not retry (the e-mail address is already taken).
					const userId =
						typeof created.user_id === "string"
							? created.user_id
							: undefined;

					let notified = false;
					try {
						const notification = asRecord(
							asRecord(
								await sessionApi.callFunction(
									"send_form_notification",
									{
										project_id: sessionApi.config.projectId,
										form_id: FORM_ID,
										form_data: {
											Anrede: title ? title : "-",
											Titel:
												text(values.pre_title) || "-",
											Vorname: values.first_name,
											Nachname: values.last_name,
											Email: email,
											Telefon: values.phone,
											Adresse: values.street,
											PLZ: values.zip,
											Ort: values.city,
											Land: countryName(values.country),
											Geburtsdatum: values.date_of_birth,
											Ordentliches_Mitglied:
												values.orderly_member === true
													? "Ja"
													: "Nein",
											Newsletter: newsletter
												? "Ja"
												: "Nein",
											Newsletter_Email: newsletter
												? newsletterEmail
												: "-",
											Newsletter_Optin_Datum: newsletter
												? submittedAt
												: "-",
											Staatsexamen:
												values.state_examination,
											Staatsexamenort:
												values.state_examination_location,
											Approbation: values.approbation,
											Approbationort:
												values.approbation_location,
											Promotion: values.promotion,
											Promotionort:
												values.promotion_location,
											Habilitation: values.habitilation,
											Habilitationort:
												values.habitilation_location,
											Mitgliedsbeitrag:
												values.billing === "bill"
													? "Rechnung"
													: "SEPA-Lastschrift",
											Kontoinhaber:
												values.account_owner || "-",
											SEPA_Land:
												values.sepa_country || "-",
											IBAN: values.sepa_iban || "-",
											BIC: values.sepa_bic || "-",
											Datenschutz: "Ja",
											Satzung: "Ja"
										}
									}
								)
							)?.result
						);
						notified = notification?.success === true;
						if (!notified) {
							console.error(
								"send_form_notification failed",
								notification
							);
						}
					} catch (notificationError) {
						console.error(
							"send_form_notification failed",
							notificationError
						);
					}

					// Never store the passwords. `notification_sent` stops the Item
					// afterSave hook from notifying the recipients a second time.
					const { password: _password, ...stored } = values;
					const { password_confirm: _confirm, ...dataObject } =
						stored;
					let itemCreated = false;
					for (
						let attempt = 0;
						attempt < 2 && !itemCreated;
						attempt++
					) {
						try {
							await sessionApi.createObject("Item", {
								data: {
									name: fullName,
									...dataObject,
									title,
									user_id: userId,
									notification_sent: notified
								},
								reference_id: FORM_ID,
								type: "form"
							});
							itemCreated = true;
						} catch (itemError) {
							console.error(
								"Item could not be created",
								itemError
							);
						}
					}

					if (!itemCreated && !notified) {
						const message =
							"Ihr Konto wurde angelegt, der Antrag konnte jedoch nicht übermittelt werden. Bitte kontaktieren Sie die Geschäftsstelle.";
						return Response.json(
							{
								message,
								error: message,
								type: "application-lost"
							},
							{ status: 502 }
						);
					}

					return Response.json({ ok: true });
				} catch (error) {
					return parseErrorResponse(error);
				}
			}
		}
	}
});
