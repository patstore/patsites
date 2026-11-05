import { Form, Formik, FormikConsumer } from "formik";
import React, { useMemo, useState } from "react";
import form_data from "./constants/form_data";
import { Button, FlexBox, SlideIn } from "@ui";
import { apiRequest, useSiteContext } from "@provider";
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

const Application: React.FC = () => {
    const { applicationOpen, setApplicationOpen } = useSiteContext();
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

        await apiRequest("/api/membership/apply", values);
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
