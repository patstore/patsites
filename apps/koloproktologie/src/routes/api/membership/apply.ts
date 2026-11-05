import { parseErrorResponse, readBody } from "@repo/server/auth";
import { createFileRoute } from "@tanstack/react-router";
import getEmailArray from "../../../components/Application/functions/getEmails";
import { sessionApi } from "../../../server/auth";

function text(value: unknown): string {
    return typeof value === "string" ? value : "";
}

export const Route = createFileRoute("/api/membership/apply")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const values = await readBody(request);
                const newsletter = values.newsletter;
                const newsLetterEmail =
                    newsletter?.toString() === "true"
                        ? values.newsletter_email === "existing"
                            ? text(values.email)
                            : text(values.newsletter_email_address)
                        : null;

                try {
                    await sessionApi.callFunction("create_user_from_data", {
                        pre_title: values.title,
                        title: values.address,
                        project_id: sessionApi.config.projectId,
                        name: `${text(values.first_name)} ${text(values.last_name)}`,
                        email: values.email,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        password: values.password,
                        roles: ["tEsx6N2IUm"],
                        data: {
                            dgk: {
                                address: "",
                                title: "",
                                name: "",
                                postal_code: "",
                                city: "",
                                country: ""
                            },
                            bcd: {
                                klinikposition: "",
                                fachrichtung: "",
                                belegklinik: "",
                                tel: "",
                                fax: "",
                                email: "",
                                location: ""
                            }
                        },
                        newsletter_optin: newsletter?.toString() === "true",
                        newsletter_email:
                            values.newsletter_email === "existing"
                                ? values.email
                                : values.newsletter_email_address,
                        type: "dgk",
                        settings: {
                            dgk: { accept_search: false },
                            bcd: { publish_specialist: false }
                        },
                        emails: getEmailArray("dgk", text(values.email), newsLetterEmail || undefined)
                    });

                    await sessionApi.callFunction("send_form_notification", {
                        project_id: sessionApi.config.projectId,
                        form_id: "vlb5giBjHl",
                        form_data: {
                            Anrede: values.address,
                            Titel: values.title,
                            Vorname: values.first_name,
                            Nachname: values.last_name,
                            Email: values.email,
                            Telefon: values.phone,
                            Adresse: values.street,
                            PLZ: values.zip,
                            Ort: values.city,
                            Land: values.country,
                            Geburtsdatum: values.date_of_birth,
                            Newsletter: values.newsletter ? "Ja" : "Nein",
                            Newsletter_Email: values.newsletter
                                ? values.newsletter_email === "existing"
                                    ? values.email
                                    : values.newsletter_email_address
                                : "-",
                            Newsletter_Optin_Datum: values.newsletter
                                ? new Date().toISOString()
                                : "-",
                            Staatsexamen: values.state_examination,
                            Staatsexamenort: values.state_examination_location,
                            Approbation: values.approbation,
                            Approbationort: values.approbation_location,
                            Promotion: values.promotion,
                            Promotionort: values.promotion_location,
                            Habitation: values.habitilation,
                            Habitationort: values.habitilation_location,
                            Mitgliedsbeitrag: values.billing,
                            Mitgliedsbeitrag_Zahlungsweise: values.bill_payment
                                ? "Rechnung"
                                : "SEPA",
                            Kontoinhaber: values.account_owner,
                            SEPA_Land: values.sepa_country,
                            IBAN: values.sepa_iban,
                            BIC: values.sepa_bic,
                            Datenschutz: values.data_protection ? "Ja" : "Nein",
                            Satzung: values.statue ? "Ja" : "Nein"
                        }
                    });

                    const dataObject = { ...values };
                    delete dataObject.password;
                    await sessionApi.createObject("Item", {
                        data: {
                            name: `${text(values.first_name)} ${text(values.last_name)}`,
                            ...dataObject
                        },
                        reference_id: "vlb5giBjHl",
                        type: "form"
                    });

                    return Response.json({ ok: true });
                } catch (error) {
                    return parseErrorResponse(error);
                }
            }
        }
    }
});
