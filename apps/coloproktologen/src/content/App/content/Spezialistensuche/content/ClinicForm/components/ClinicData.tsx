import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
    formContainer,
    formRow,
    formColumn,
    formField,
    formError,
    formSection,
    infoText
} from "../styles";
import { ClinicData as ClinicDataType, ClinicDataProps } from "../types";
import FormSubmitStore from "./FormSubmitStore";

// Validation schema
const validationSchema = Yup.object().shape({
    title: Yup.string().required("Klinikname ist ein Pflichtfeld"),
    data: Yup.object().shape({
        strasse: Yup.string().required("Straße ist ein Pflichtfeld"),
        plz: Yup.string()
            .required("PLZ ist ein Pflichtfeld")
            .matches(/^\d{5}$/, "PLZ muss genau 5 Ziffern haben"),
        ort: Yup.string().required("Ort ist ein Pflichtfeld"),
        tel: Yup.string().required("Telefon ist ein Pflichtfeld"),
        email: Yup.string().email("Ungültige E-Mail-Adresse").nullable()
    })
});

const ClinicData: React.FC<ClinicDataProps> = ({
    clinicData,
    setClinicData,
    setIsValid
}) => {
    const initialValues: ClinicDataType = {
        ...clinicData
    };

    const handleSubmit = (values: ClinicDataType) => {
        setClinicData(values);
    };

    return (
        <div css={formContainer}>
            <h3>Praxis-Daten</h3>
            {initialValues.objectId && (
                <p>
                    Die Daten einer ausgewählten Klinik können nicht bearbeitet werden.
                </p>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
                validateOnMount
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <FormSubmitStore formValidationHandler={setIsValid} />
                            <div css={formRow}>
                                <div css={formColumn}>
                                    <div css={formSection}>
                                        <h3>Praxis-Daten</h3>
                                        <div css={formField}>
                                            <label htmlFor="title">Praxis / Klinik*</label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={300}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors.title && touched.title && (
                                                <div css={formError}>{errors.title}</div>
                                            )}
                                        </div>

                                        <div css={formField}>
                                            <label htmlFor="description">Beschreibung</label>
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={300}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors.description && touched.description && (
                                                <div css={formError}>{errors.description}</div>
                                            )}
                                        </div>
                                        <div css={formField}>
                                            <label htmlFor="data.strasse">Straße*</label>
                                            <input
                                                type="text"
                                                id="data.strasse"
                                                name="data.strasse"
                                                value={values?.data?.strasse}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={300}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors?.data?.strasse && touched?.data?.strasse && (
                                                <div css={formError}>{errors?.data?.strasse}</div>
                                            )}
                                        </div>

                                        <div css={formField}>
                                            <label htmlFor="data.plz">PLZ*</label>
                                            <input
                                                type="text"
                                                id="data.plz"
                                                name="data.plz"
                                                value={values?.data?.plz}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={5}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors?.data?.plz && touched?.data?.plz && (
                                                <div css={formError}>{errors?.data?.plz}</div>
                                            )}
                                        </div>

                                        <div css={formField}>
                                            <label htmlFor="data.ort">Ort*</label>
                                            <input
                                                type="text"
                                                id="data.ort"
                                                name="data.ort"
                                                value={values?.data?.ort}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={300}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors?.data?.ort && touched?.data?.ort && (
                                                <div css={formError}>{errors?.data?.ort}</div>
                                            )}
                                        </div>

                                        {!initialValues.objectId && (
                                            <p
                                                css={{
                                                    marginTop: "12px",
                                                    padding: "12px",
                                                    backgroundColor: "#e7f3ff",
                                                    border: "1px solid #b3d9ff",
                                                    borderRadius: "4px",
                                                    color: "#004085",
                                                    fontSize: "14px",
                                                    lineHeight: "1.5"
                                                }}
                                            >
                                                💡 <strong>Hinweis:</strong> Die Adressdaten werden im
                                                nächsten Schritt (Vorschau) automatisch durch Google
                                                Maps validiert und ggfs. korrigiert.
                                            </p>
                                        )}

                                        <div css={formField}>
                                            <label htmlFor="data.tel">Telefon</label>
                                            <input
                                                type="text"
                                                id="data.tel"
                                                name="data.tel"
                                                value={values?.data?.tel}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={20}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors?.data?.tel && touched?.data?.tel && (
                                                <div css={formError}>{errors?.data?.tel}</div>
                                            )}
                                        </div>

                                        <div css={formField}>
                                            <label htmlFor="data.fax">Fax</label>
                                            <input
                                                type="text"
                                                id="data.fax"
                                                name="data.fax"
                                                value={values?.data?.fax}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={20}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors?.data?.fax && touched?.data?.fax && (
                                                <div css={formError}>{errors?.data?.fax}</div>
                                            )}
                                        </div>

                                        <div css={formField}>
                                            <label htmlFor="data.email">Praxis-Email</label>
                                            <input
                                                type="email"
                                                id="data.email"
                                                name="data.email"
                                                value={
                                                    values?.data?.email === null
                                                        ? ""
                                                        : values?.data?.email
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={300}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors?.data?.email && touched?.data?.email && (
                                                <div css={formError}>{errors?.data?.email}</div>
                                            )}
                                        </div>

                                        <div css={formField}>
                                            <label htmlFor="data.homepage">Homepage</label>
                                            <input
                                                type="text"
                                                id="data.homepage"
                                                name="data.homepage"
                                                value={values?.data?.homepage}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                maxLength={300}
                                                disabled={!!initialValues.objectId}
                                            />
                                            {errors?.data?.homepage && touched?.data?.homepage && (
                                                <div css={formError}>{errors?.data?.homepage}</div>
                                            )}
                                        </div>
                                        <p css={infoText}>* Pflichtfelder</p>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ClinicData;
