import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    // Membership
    orderly_member: Yup.boolean().oneOf(
        [true],
        "Bitte wählen Sie eine Mitgliedschaft"
    ),

    // Personal Information
    address: Yup.string().required("Anrede ist erforderlich"),
    first_name: Yup.string().required("Vorname ist erforderlich"),
    last_name: Yup.string().required("Nachname ist erforderlich"),
    date_of_birth: Yup.string()
        .required("Geburtsdatum ist erforderlich")
        .matches(
            /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/,
            "Bitte geben Sie ein gültiges Datum im Format TT.MM.JJJJ ein"
        ),
    street: Yup.string().required("Straße ist erforderlich"),
    zip: Yup.string()
        .required("PLZ ist erforderlich")
        .matches(/^\d{5}$/, "Bitte geben Sie eine gültige PLZ ein"),
    city: Yup.string().required("Ort ist erforderlich"),
    country: Yup.string().required("Land ist erforderlich"),
    email: Yup.string()
        .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
        .required("E-Mail ist erforderlich"),
    password: Yup.string().required("Passwort ist erforderlich"),
    phone: Yup.string()
        .required("Telefon ist erforderlich")
        .matches(
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            "Bitte geben Sie eine gültige Telefonnummer ein"
        ),

    // Career Path (optional fields)
    newsletter: Yup.boolean(),
    newsletter_email: Yup.string(),
    newsletter_email_address: Yup.string().when(
        ["newsletter", "newsletter_email"],
        {
            is: (newsletter: boolean, newsletter_email: string) =>
                newsletter === true && newsletter_email === "other",
            then: () =>
                Yup.string().required("E-Mail Adresse ist erforderlich"),
            otherwise: () => Yup.string().optional()
        }
    ),
    state_examination: Yup.string().optional(),
    state_examination_location: Yup.string().optional(),
    approbation: Yup.string().optional(),
    approbation_location: Yup.string().optional(),
    promotion: Yup.string().optional(),
    promotion_location: Yup.string().optional(),
    habitilation: Yup.string().optional(),
    habitilation_location: Yup.string().optional(),

    // Membership Fees
    billing: Yup.string()
        .oneOf(
            ["bill", "sepa"],
            'Mitgliedsbeitrag muss "Rechnung" oder "SEPA" sein'
        )
        .required("Mitgliedsbeitrag ist erforderlich"),
    bill_payment: Yup.boolean(),
    account_owner: Yup.string().when("billing", {
        is: "sepa",
        then: () => Yup.string().required("Kontoinhaber ist erforderlich"),
        otherwise: () => Yup.string().optional()
    }),
    sepa_country: Yup.string().when("billing", {
        is: "sepa",
        then: () => Yup.string().required("SEPA Land ist erforderlich"),
        otherwise: () => Yup.string().optional()
    }),
    sepa_iban: Yup.string().when("billing", {
        is: "sepa",
        then: () =>
            Yup.string()
                .required("IBAN ist erforderlich")
                .matches(
                    /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/,
                    "Bitte geben Sie eine gültige IBAN ein"
                ),
        otherwise: () => Yup.string().optional()
    }),
    sepa_bic: Yup.string().when("billing", {
        is: "sepa",
        then: () =>
            Yup.string()
                .required("BIC ist erforderlich")
                .matches(
                    /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
                    "Bitte geben Sie eine gültige BIC ein"
                ),
        otherwise: () => Yup.string().optional()
    }),

    // Legal
    data_protection: Yup.boolean().oneOf(
        [true],
        "Bitte stimmen Sie der Datenschutzerklärung zu"
    ),
    statue: Yup.boolean().oneOf([true], "Bitte stimmen Sie der Satzung zu")
});

export default validationSchema;
