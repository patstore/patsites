import countries_de from "./countries_de";

const form_data = {
    membership: {
        title: "Art der Mitgliedschaft",
        subtitle: "(Felder mit * sind Pflichtfelder)",
        fields: [
            {
                label: "Ordentliches Mitglied (120 €/Jahr) *",
                type: "checkbox",
                value: false,
                key: "orderly_member",
                required: true
            }
        ]
    },
    personal_information: {
        title: "Persönliche Angaben",
        subtitle: "(Felder mit * sind Pflichtfelder)",
        fields: [
            {
                label: "Anrede *",
                value: "",
                key: "address",
                type: "input",
                required: true,
                placeHolder: "Anrede"
            },
            {
                label: "Titel",
                value: "",
                key: "title",
                type: "input",
                required: false,
                placeHolder: "Titel"
            },
            {
                label: "Vorname *",
                value: "",
                key: "first_name",
                type: "input",
                required: true,
                placeHolder: "Vorname"
            },
            {
                label: "Nachname *",
                value: "",
                key: "last_name",
                type: "input",
                required: true,
                placeHolder: "Nachname"
            },
            {
                label: "Geburtsdatum *",
                value: "",
                key: "date_of_birth",
                type: "input",
                required: true,
                placeHolder: "TT.MM.JJJJ"
            },
            {
                label: "Straße *",
                value: "",
                key: "street",
                type: "input",
                required: true,
                placeHolder: "Straße und Hausnummer"
            },
            {
                label: "PLZ *",
                value: "",
                key: "zip",
                type: "input",
                required: true,
                placeHolder: "PLZ"
            },
            {
                label: "Ort *",
                value: "",
                key: "city",
                type: "input",
                required: true,
                placeHolder: "Ort"
            },
            {
                label: "Land *",
                value: "",
                key: "country",
                type: "select",
                required: true,
                options: countries_de,
                placeHolder: "Land auswählen"
            },
            {
                label: "Email *",
                value: "",
                key: "email",
                type: "input",
                required: true,
                placeHolder: "Email"
            },
            {
                label: "Passwort *",
                value: "",
                key: "password",
                type: "password",
                required: true,
                placeHolder: "******"
            },
            {
                label: "Telefon *",
                value: "",
                key: "phone",
                type: "input",
                required: true,
                telefon: "Telefonnummer",
                placeHolder: "0123456789"
            }
        ]
    },
    newsletter: {
        title: "Newsletter",
        subtitle: "(Felder mit * sind Pflichtfelder)",
        fields: [
            {
                label: "Ich möchte den regelmäßigen Newsletter abonnieren ",
                value: false,
                key: "newsletter",
                required: false,
                type: "checkbox"
            },
            {
                label: "Ich möchte die angebebene E-Mail Adresse für Newsletter-Abonnements verwenden",
                value: "existing",
                key: "newsletter_email",
                required: true,
                type: "radio"
            },
            {
                label: "Ich möchte eine andere E-Mail Adresse für Newsletter-Abonnements verwenden",
                value: "other",
                key: "newsletter_email",
                required: true,
                type: "radio"
            },
            {
                label: "E-Mail Adresse",
                value: "",
                key: "newsletter_email_address",
                required: false,
                type: "input",
                placeHolder: "E-Mail Adresse"
            }
        ]
    },
    career_path: {
        title: "Beruflicher Werdegang",
        subtitle: "Freiwillige Angaben",
        fields: [
            {
                label: "Staatsexamen",
                value: "",
                key: "state_examination",
                type: "input",
                required: false,
                placeHolder: "TT.MM.JJJJ",
                subfield: {
                    label: "Staatsexamenort",
                    value: "",
                    key: "state_examination_location",
                    type: "input",
                    required: false,
                    inline: true,
                    showLabel: false,
                    placeHolder: "Ort"
                }
            },
            {
                label: "Approbation",
                value: "",
                key: "approbation",
                type: "input",
                required: false,
                placeHolder: "TT.MM.JJJJ",
                subfield: {
                    label: "Approbationsort",
                    value: "",
                    key: "approbation_location",
                    type: "input",
                    required: false,
                    placeHolder: "Ort",
                    inline: true,
                    showLabel: false
                }
            },
            {
                label: "Promotion",
                value: "",
                key: "promotion",
                type: "input",
                required: false,
                placeHolder: "TT.MM.JJJJ",
                subfield: {
                    label: "Promotionsort",
                    value: "",
                    key: "promotion_location",
                    type: "input",
                    required: false,
                    placeHolder: "Ort",
                    inline: true,
                    showLabel: false
                }
            },
            {
                label: "Habilitation",
                value: "",
                key: "habitilation",
                type: "input",
                required: false,
                placeHolder: "TT.MM.JJJJ",
                subfield: {
                    label: "Habilitationsort",
                    value: "",
                    key: "habitilation_location",
                    type: "input",
                    required: false,
                    placeHolder: "Ort",
                    inline: true,
                    showLabel: false
                }
            }
        ]
    },
    membership_fees: {
        title: "Mitgliedsbeitrag",
        subtitle: "(Felder mit * sind Pflichtfelder)",
        fields: [
            {
                label: "Ich ermächtige die Deutsche Gesellschaft für Koloproktologie e.V. (DGK), den Mitgliedsbeitrag mittels Lastschrift von meinem Konto einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von der Deutschen Gesellschaft für Koloproktologie e.V. (DGK) auf mein Konto gezogene Lastschrift einzulösen.",
                value: "sepa",
                key: "billing",
                required: true,
                type: "radio"
            },
            {
                label: "Ich möchte per Rechnung bezahlen. Mitgliedern, die kein SEPA-Lastschriftmandat erteilen, wird nach der Beitragsordnung eine Bearbeitungsgebühr von 10,00 € pro Jahr berechnet.",
                value: "bill",
                key: "billing",
                required: true,
                type: "radio"
            },
            {
                label: "Kontoinhaber",
                value: "",
                key: "account_owner",
                required: true,
                type: "input",
                placeHolder: "Kontoinhaber:in"
            },
            {
                label: "SEPA Land",
                value: "",
                type: "select",
                required: true,
                key: "sepa_country",
                options: [
                    { value: "DE", label: "Deutschland" },
                    { value: "AT", label: "Österreich" }
                ]
            },
            {
                label: "IBAN",
                value: "",
                key: "sepa_iban",
                required: true,
                type: "input",
                placeHolder: "IBAN"
            },
            {
                label: "BIC",
                value: "",
                key: "sepa_bic",
                required: true,
                type: "input",
                placeHolder: "BIC"
            }
        ]
    },
    legal: {
        title: "Einverständniserklärung",
        subtitle: "(Felder mit * sind Pflichtfelder)",
        fields: [
            {
                label: "Satzung und Beitragsordnung *",
                html: '<p> Ich habe die <a href="/deutsche-gesellschaft-fuer-koloproktologie/satzung.html" target="_blank" title="Satzung DGK">Satzung</a> und die <a href="/deutsche-gesellschaft-fuer-koloproktologie/beitragsordnung.html" target="_blank" title="Beitragsordnung DGK">Beitragsordnung</a> gelesen und erkläre mich damit einverstanden. </p>',
                value: false,
                key: "statue",
                required: false,
                type: "checkbox"
            },
            {
                label: "Einwilligung gemäß Datenschutzerklärung der DGK *",
                html: '<p>Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz.html" target="_blank" title="Die Datenschutzerklärung der DGK e.V.">Datenschutzerklärung</a> der DGK e.V. zu. </p>',
                value: false,
                key: "data_protection",
                required: false,
                type: "checkbox"
            }
        ]
    }
};

export default form_data;
