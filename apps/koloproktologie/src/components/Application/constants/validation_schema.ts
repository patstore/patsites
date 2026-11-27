import * as Yup from "yup";
import { electronicFormatIBAN, isValidBIC, isValidIBAN } from "ibantools";
import { isFuture } from "date-fns/isFuture";
import { isValid } from "date-fns/isValid";
import { parse } from "date-fns/parse";

// This schema is used by the form (client) and by /api/membership/apply
// (server). On the server the validated result is also used as the
// normalized, whitelisted payload (see `transform` calls below).

const isRealPastDate = (value?: string) => {
	if (!value) {
		return false;
	}
	const date = parse(value, "dd.MM.yyyy", new Date());
	return isValid(date) && !isFuture(date) && date.getFullYear() >= 1900;
};

const isPhoneNumber = (value?: string) => {
	if (!value || !/^\+?[0-9\s()/.-]+$/.test(value)) {
		return false;
	}
	const digits = value.replace(/\D/g, "").length;
	return digits >= 6 && digits <= 15;
};

const normalizeIban = (value: unknown) =>
	typeof value === "string"
		? (electronicFormatIBAN(value) ??
			value.replace(/\s/g, "").toUpperCase())
		: value;

const normalizeBic = (value: unknown) =>
	typeof value === "string" ? value.replace(/\s/g, "").toUpperCase() : value;

const validationSchema = Yup.object().shape({
	// Membership
	orderly_member: Yup.boolean().oneOf(
		[true],
		"Bitte wählen Sie eine Mitgliedschaft"
	),

	// Personal Information
	title: Yup.string().required("Anrede ist erforderlich"),
	pre_title: Yup.string().trim().optional(),
	first_name: Yup.string().trim().required("Vorname ist erforderlich"),
	last_name: Yup.string().trim().required("Nachname ist erforderlich"),
	date_of_birth: Yup.string()
		.trim()
		.required("Geburtsdatum ist erforderlich")
		.matches(
			/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/,
			"Bitte geben Sie ein gültiges Datum im Format TT.MM.JJJJ ein"
		)
		.test(
			"real-date",
			"Bitte geben Sie ein gültiges Geburtsdatum ein",
			(value) => isRealPastDate(value)
		),
	street: Yup.string().trim().required("Straße ist erforderlich"),
	country: Yup.string().required("Land ist erforderlich"),
	zip: Yup.string()
		.trim()
		.required("PLZ ist erforderlich")
		.when("country", {
			is: "DE",
			then: (schema) =>
				schema.matches(
					/^\d{5}$/,
					"Bitte geben Sie eine gültige PLZ mit 5 Ziffern ein"
				),
			otherwise: (schema) =>
				schema.matches(
					/^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/,
					"Bitte geben Sie eine gültige PLZ ein"
				)
		}),
	city: Yup.string().trim().required("Ort ist erforderlich"),
	email: Yup.string()
		.trim()
		.lowercase()
		.email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
		.required("E-Mail ist erforderlich"),
	password: Yup.string()
		.required("Passwort ist erforderlich")
		.min(8, "Das Passwort muss mindestens 8 Zeichen lang sein"),
	password_confirm: Yup.string()
		.required("Bitte wiederholen Sie Ihr Passwort")
		.oneOf([Yup.ref("password")], "Die Passwörter stimmen nicht überein"),
	phone: Yup.string()
		.trim()
		.required("Telefon ist erforderlich")
		.test(
			"phone",
			"Bitte geben Sie eine gültige Telefonnummer ein",
			(value) => isPhoneNumber(value)
		),

	// Newsletter
	newsletter: Yup.boolean(),
	newsletter_email: Yup.string(),
	newsletter_email_address: Yup.string()
		.trim()
		.lowercase()
		.when(["newsletter", "newsletter_email"], {
			is: (newsletter: boolean, newsletter_email: string) =>
				newsletter === true && newsletter_email === "other",
			then: (schema) =>
				schema
					.required("E-Mail Adresse ist erforderlich")
					.email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
			otherwise: (schema) => schema.optional()
		}),

	// Career Path (optional fields)
	state_examination: Yup.string().trim().optional(),
	state_examination_location: Yup.string().trim().optional(),
	approbation: Yup.string().trim().optional(),
	approbation_location: Yup.string().trim().optional(),
	promotion: Yup.string().trim().optional(),
	promotion_location: Yup.string().trim().optional(),
	habitilation: Yup.string().trim().optional(),
	habitilation_location: Yup.string().trim().optional(),

	// Membership Fees
	billing: Yup.string()
		.oneOf(
			["bill", "sepa"],
			'Mitgliedsbeitrag muss "Rechnung" oder "SEPA" sein'
		)
		.required("Mitgliedsbeitrag ist erforderlich"),
	account_owner: Yup.string()
		.trim()
		.when("billing", {
			is: "sepa",
			then: (schema) => schema.required("Kontoinhaber ist erforderlich"),
			otherwise: (schema) => schema.optional()
		}),
	sepa_country: Yup.string().when("billing", {
		is: "sepa",
		then: (schema) => schema.required("SEPA Land ist erforderlich"),
		otherwise: (schema) => schema.optional()
	}),
	sepa_iban: Yup.string()
		.transform((value) => normalizeIban(value))
		.when("billing", {
			is: "sepa",
			then: (schema) =>
				schema
					.required("IBAN ist erforderlich")
					.test(
						"iban",
						"Bitte geben Sie eine gültige IBAN ein",
						(value) => !!value && isValidIBAN(value)
					),
			otherwise: (schema) => schema.optional()
		}),
	// BIC is optional for SEPA payments within the EU/EEA
	sepa_bic: Yup.string()
		.transform((value) => normalizeBic(value))
		.when("billing", {
			is: "sepa",
			then: (schema) =>
				schema.test(
					"bic",
					"Bitte geben Sie eine gültige BIC ein",
					(value) => !value || isValidBIC(value)
				),
			otherwise: (schema) => schema.optional()
		}),

	// Legal
	data_protection: Yup.boolean().oneOf(
		[true],
		"Bitte stimmen Sie der Datenschutzerklärung zu"
	),
	statue: Yup.boolean().oneOf([true], "Bitte stimmen Sie der Satzung zu")
});

export default validationSchema;
