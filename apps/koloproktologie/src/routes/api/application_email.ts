import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import { sessionApi } from "../../server/auth";
import { formatDate } from "date-fns/format";

const RECIPIENT = {
	email: "info@koloproktologie.org",
	name: "Geschäftsstelle DGK"
};

function text(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function salutation(value: unknown): string | null {
	const rendered = text(value);
	if (
		!rendered ||
		rendered === "Keine Angabe" ||
		rendered === "Keine Anrede"
	) {
		return null;
	}
	return rendered;
}

function yesNo(value: unknown): string {
	return value === true || value === "true" ? "Ja" : "Nein";
}

function display(value: unknown, type?: "date"): string {
	const rendered =
		type === "date"
			? formatDate(new Date(value as string), "dd.MM.yyyy")
			: text(value);
	return rendered || "—";
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function applicationDetails(
	values: Record<string, unknown>
): Array<[string, string]> {
	const newsletter =
		values.newsletter === true || values.newsletter === "true";
	const newsletterEmail = !newsletter
		? "—"
		: values.newsletter_email === "existing"
			? display(values.email)
			: display(values.newsletter_email_address);

	return [
		["Anrede", display(salutation(values.title))],
		["Titel", display(values.pre_title)],
		["Vorname", display(values.first_name)],
		["Nachname", display(values.last_name)],
		["Email", display(values.email)],
		["Telefon", display(values.phone)],
		["Adresse", display(values.street)],
		["PLZ", display(values.zip)],
		["Ort", display(values.city)],
		["Land", display(values.country)],
		["Geburtsdatum", display(values.date_of_birth)],
		["Ordentliches Mitglied", yesNo(values.orderly_member)],
		["Newsletter", yesNo(values.newsletter)],
		["Newsletter_Email", newsletterEmail],
		["Staatsexamen", display(values.state_examination)],
		["Staatsexamenort", display(values.state_examination_location)],
		["Approbation", display(values.approbation)],
		["Approbationort", display(values.approbation_location)],
		["Promotion", display(values.promotion)],
		["Promotionort", display(values.promotion_location)],
		["Habilitation", display(values.habitilation)],
		["Habilitationsort", display(values.habitilation_location)],
		[
			"Mitgliedsbeitrag",
			values.billing === "bill" ? "Rechnung" : "SEPA-Lastschrift"
		],
		["Kontoinhaber", display(values.account_owner)],
		["SEPA_Land", display(values.sepa_country)],
		["IBAN", display(values.sepa_iban)],
		["BIC", display(values.sepa_bic)],
		["Datenschutz", yesNo(values.data_protection)],
		["Satzung", yesNo(values.statue)]
	];
}

function renderApplication(values: Record<string, unknown>): string {
	return applicationDetails(values)
		.map(
			([label, value]) =>
				`<li>${escapeHtml(label)}: ${escapeHtml(value)}</li>`
		)
		.join("\n");
}

export const Route = createFileRoute("/api/application_email")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const values = await readBody(request);
				delete values.password;

				if (!text(values.first_name) || !text(values.email)) {
					return Response.json(
						{ message: "Formulardaten fehlen" },
						{ status: 400 }
					);
				}

				try {
					await sessionApi.callFunction("send_email", {
						email: RECIPIENT.email,
						name: RECIPIENT.name,
						subject:
							"Mitgliedschaftsantrag Deutsche Gesellschaft für Koloproktologie e.V.",
						project_id: sessionApi.config.projectId,
						content: `
							<p style="margin-bottom: 24px">
								Mandatsreferenz:
							</p>
							<h1>Details</h1>
							<ul>
								${renderApplication(values)}
							</ul>
						`
					});
					return Response.json({ ok: true });
				} catch (error) {
					return parseErrorResponse(error);
				}
			}
		}
	}
});
