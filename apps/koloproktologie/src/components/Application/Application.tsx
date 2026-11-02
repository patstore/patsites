import { Form, Formik, FormikConsumer } from "formik";
import React, { useMemo, useState } from "react";
import form_data from "./constants/form_data";
import { Button, FlexBox, SlideIn } from "@ui";
import { axiosclient, useDataHandler, useSiteContext } from "@provider";
import settings from "@settings";
import RenderFields from "./components/RenderFields";
import validationSchema from "./constants/validation_schema";
import {
    formContainer,
    formContentContainer,
    formFieldsContainer,
    formFooter,
    formHeader
} from "./styles";
import { FieldData } from "./types";
import getEmailArray from "./functions/getEmails";

const Application: React.FC = () => {
    const { applicationOpen, setApplicationOpen } = useSiteContext();
    const { createData } = useDataHandler();
    const initialValues = Object.keys(form_data).reduce(
        (acc, key) => {
            const fields = form_data[key as keyof typeof form_data].fields;
            fields.forEach((field) => {
                if (field.key === "billing") {
                    acc[field.key] = "sepa";
                } else {
                    acc[field.key] = field.value;
                }
            });
            return acc;
        },
        {} as Record<string, any>
    );
    const [loading, setLoading] = useState(false);

    const dataHandler = async (values: typeof initialValues) => {
        setLoading(true);

        const newsLetterEmail =
            values.newsletter.toString() === "true"
                ? values.newsletter_email === "existing"
                    ? values.email
                    : values.newsletter_email_address || "" || null
                : null;

        await axiosclient().post("functions/create_user_from_data", {
            pre_title: values.title,
            title: values.address,
            project_id: import.meta.env.VITE_PATSTORE_PROJECT_ID,
            name: values.first_name + " " + values.last_name,
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
            newsletter_optin:
                values.newsletter.toString() === "true" ? true : false,
            newsletter_email:
                values.newsletter_email === "existing"
                    ? values.email
                    : values.newsletter_email_address,
            type: "dgk",
            settings: {
                dgk: {
                    accept_search: false
                },
                bcd: {
                    publish_specialist: false
                }
            },
            emails: getEmailArray("dgk", values.email, newsLetterEmail)
        });

        await axiosclient().post("functions/send_form_notification", {
            project_id: import.meta.env.VITE_PATSTORE_PROJECT_ID,
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
        if (dataObject.password) {
            delete dataObject.password;
        }

        await createData({
            className: "Item",
            updateObject: {
                data: {
                    name: values.first_name + " " + values.last_name,
                    ...dataObject
                },
                reference_id: "vlb5giBjHl",
                type: "form"
            }
        });
        setLoading(false);
        setApplicationOpen(false);
    };

    const buttons = useMemo(() => {
        return (
            <FormikConsumer>
                {(formik) => {
                    if (!formik) {
                        return <Button text="Schließen" />;
                    }

                    return (
                        <FlexBox
                            direction="row"
                            gap="30px"
                            align="center"
                        >
                            <Button
                                text="Abbrechen"
                                color={settings.colors.dark}
                                background={settings.colors.light}
                                onClick={() => setApplicationOpen(false)}
                                disabled={loading}
                            />
                            <Button
                                text={
                                    !formik.isValid
                                        ? "Bitte alle Felder ausfüllen"
                                        : "Formular absenden"
                                }
                                disabled={!formik.isValid || loading}
                                onClick={() => {
                                    formik.submitForm();
                                }}
                            />
                            {loading && <p>Bitte warten...</p>}
                        </FlexBox>
                    );
                }}
            </FormikConsumer>
        );
    }, [loading]);

    return (
        <SlideIn
            width="medium"
            open={applicationOpen}
            cancelButtonHandler={() => setApplicationOpen(false)}
            renderButtons={buttons}
            noButtons
        >
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                    await dataHandler(values);
                    actions.setSubmitting(false);
                }}
                validationSchema={validationSchema}
                validateOnBlur={true}
                validateOnMount={true}
                enableReinitialize={false}
            >
                {({ errors, touched, values }) => (
                    <div css={formContainer}>
                        <div css={formHeader}>
                            <h2>Mitgliedschaftsantrag</h2>
                        </div>
                        <Form key="member_form">
                            <div css={formContentContainer}>
                                {Object.keys(form_data).map((key) => {
                                    return (
                                        <div
                                            css={{
                                                position: "relative",
                                                width: "100%"
                                            }}
                                            key={key}
                                        >
                                            <h3>
                                                {
                                                    form_data[
                                                        key as keyof typeof form_data
                                                    ].title
                                                }
                                            </h3>
                                            <p>
                                                {
                                                    form_data[
                                                        key as keyof typeof form_data
                                                    ].subtitle
                                                }
                                            </p>
                                            {key === "membership" && (
                                                <div>
                                                    <p>
                                                        <strong>
                                                            Sie möchten die
                                                            Zwecke unserer
                                                            Gesellschaft
                                                            unterstützen? <br />{" "}
                                                            Dann freuen wir uns
                                                            über Ihre
                                                            <a
                                                                href="/documents/Aufnahmeantrag_Foerdermitgliedschaft.pdf"
                                                                target="_blank"
                                                                title="Antragsformular für Födermitgliedschaft"
                                                            >
                                                                Fördermitgliedschaft
                                                            </a>
                                                            (Beitrag auf
                                                            Spendenbasis)
                                                        </strong>
                                                    </p>

                                                    <p>
                                                        <strong>
                                                            Mitgliedschaft für
                                                            natürliche und
                                                            juristische Personen
                                                        </strong>
                                                    </p>
                                                </div>
                                            )}
                                            {form_data[
                                                key as keyof typeof form_data
                                            ].fields.map((field: FieldData) => (
                                                <div
                                                    key={`${field.key}-${field.label}`}
                                                    css={formFieldsContainer}
                                                >
                                                    <RenderFields
                                                        errors={errors}
                                                        field={field}
                                                        key={field.key}
                                                        touched={touched}
                                                        values={values}
                                                    />
                                                    {field.subfield && (
                                                        <RenderFields
                                                            errors={errors}
                                                            field={
                                                                field.subfield
                                                            }
                                                            key={`${field.key}-${field.label}`}
                                                            touched={touched}
                                                            noLabel={true}
                                                            values={values}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </Form>
                        <p>
                            Der Online-Antrag ist ohne Unterschrift gültig; als
                            Antragsdatum gilt das Datum des Absendetages.
                        </p>
                        <div css={formFooter}>{buttons}</div>
                    </div>
                )}
            </Formik>
        </SlideIn>
    );
};

export default Application;
