import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
    formContainer,
    formRow,
    formColumn,
    formField,
    formError,
    formSection
} from "../styles";
import { DoctorDataProps } from "../types";
import FormSubmitStore from "./FormSubmitStore";

// Form values interface
interface SpecialistSearchFormValues {
  // Arzt-Daten (Doctor Data)
  fachrichtung: string;
  klinikposition: string;
  belegklinik: string;
  tel: string;
  fax: string;
  email: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
    fachrichtung: Yup.string(),
    klinikposition: Yup.string(),
    belegklinik: Yup.string(),
    tel: Yup.string(),
    fax: Yup.string(),
    email: Yup.string().email("Ungültige E-Mail-Adresse")
});

const DoctorData: React.FC<DoctorDataProps> = ({
    doctorData,
    setDoctorData,
    name
}) => {
    const initialValues: DoctorDataProps["doctorData"] = {
        ...doctorData
    };

    const handleSubmit = (values: SpecialistSearchFormValues) => {
        setDoctorData(values);
    };

    return (
        <div css={formContainer}>
            <h3>Arzt-Daten</h3>
            <p>
                Ihre Namen können Sie im Nutzerporfil ändern. Diese Daten können
                nachträglich nicht mehr geändert werden.
            </p>
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
                    isSubmitting
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormSubmitStore formValidationHandler={() => {}} />
                        <div css={formRow}>
                            {/* Left Column - Arzt-Daten (Doctor Data) */}
                            <div css={formColumn}>
                                <div css={formSection}>
                                    <div css={formField}>
                                        <label htmlFor="fachrichtung">Fachrichtung</label>
                                        <input
                                            type="text"
                                            id="fachrichtung"
                                            name="fachrichtung"
                                            value={values?.fachrichtung}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={100}
                                            disabled
                                        />
                                    </div>
                                    <div css={formField}>
                                        <label htmlFor="klinikposition">Klinikposition</label>
                                        <input
                                            type="text"
                                            id="klinikposition"
                                            name="klinikposition"
                                            value={values?.klinikposition}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={100}
                                        />
                                    </div>

                                    <div css={formField}>
                                        <label htmlFor="email">Arzt-Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={values?.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={300}
                                        />
                                        {errors?.email && touched?.email && (
                                            <div css={formError}>{errors?.email}</div>
                                        )}
                                    </div>

                                    <div css={formField}>
                                        <label htmlFor="belegklinik">Belegklinik</label>
                                        <input
                                            type="text"
                                            id="belegklinik"
                                            name="belegklinik"
                                            value={values?.belegklinik}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={300}
                                        />
                                    </div>

                                    <div css={formField}>
                                        <label htmlFor="tel">Telefon</label>
                                        <input
                                            type="text"
                                            id="tel"
                                            name="tel"
                                            value={values?.tel}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={300}
                                        />
                                    </div>

                                    <div css={formField}>
                                        <label htmlFor="fax">Fax</label>
                                        <input
                                            type="text"
                                            id="fax"
                                            name="fax"
                                            value={values?.fax}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DoctorData;
