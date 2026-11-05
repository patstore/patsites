import React, { useState } from "react";
import { KoloproktologieUser } from "@types";
import { Formik } from "formik";
import { profileContentContainer } from "../styles";
import { Button, Divider, FlexBox } from "@ui";
import { apiRequest } from "@provider";
import * as Yup from "yup";
import { isEqual } from "lodash-es";

const validationSchema = Yup.object().shape({
    salutation: Yup.string().required("Anrede ist erforderlich"),
    pre_title: Yup.string().optional(),
    first_name: Yup.string().required("Vorname ist erforderlich"),
    last_name: Yup.string().required("Nachname ist erforderlich"),
    email: Yup.string()
        .email("E-Mail ist ungültig")
        .required("E-Mail ist erforderlich")
});

const UserAccount: React.FC<{
    user: KoloproktologieUser;
    getUser: () => Promise<void>;
}> = ({ user, getUser }) => {
    const [success, setSuccess] = useState("");
    return (
        <div css={{ width: "100%" }}>
            <h2>Benutzerkonto</h2>
            <div css={profileContentContainer}>
                <FlexBox
                    direction="row"
                    align="flex-start"
                    gap="30px"
                >
                    <div css={{ flex: "1 1 30%" }}>
                        <Formik
                            enableReinitialize
                            validationSchema={validationSchema}
                            initialValues={{
                                salutation: user.salutation,
                                pre_title: user.pre_title,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true);
                                await apiRequest("/api/account/email", {
                                    email: values.email,
                                    notify: true
                                });
                                await getUser();
                                setSubmitting(false);
                                setSuccess(
                                    "Änderungen erfolgreich gespeichert"
                                );
                            }}
                        >
                            {({
                                values,
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                isSubmitting,
                                initialValues,
                                isValid,
                                errors,
                                touched
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="address">Anrede</label>
                                        <input
                                            value={values.salutation}
                                            id="salutation"
                                            type="text"
                                            placeholder="Anrede"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="title">Titel</label>
                                        <input
                                            value={values.pre_title}
                                            id="title"
                                            type="text"
                                            placeholder="Titel"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="first_name">
                                            Vorname
                                        </label>
                                        <input
                                            value={values.first_name}
                                            id="first_name"
                                            type="text"
                                            placeholder="Vorname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last_name">
                                            Nachname
                                        </label>
                                        <input
                                            value={values.last_name}
                                            id="last_name"
                                            type="text"
                                            placeholder="Nachname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">E-Mail</label>
                                        <input
                                            value={values.email || ""}
                                            id="email"
                                            type="text"
                                            placeholder="E-Mail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.email && touched.email && (
                                            <div className="form_error">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                    <Divider />
                                    <Button
                                        disabled={
                                            !isValid ||
                                            isSubmitting ||
                                            isEqual(values, initialValues)
                                        }
                                        type="submit"
                                        text="Änderungen speichern"
                                    />
                                    {/* <Divider />
                                    <Button
                                        disabled={isEqual(
                                            values,
                                            initialValues
                                        )}
                                        color={settings.colors.white}
                                        background={settings.colors.secondary}
                                        type="button"
                                        text="Zurücksetzen"
                                    /> */}
                                    {success && (
                                        <div>
                                            <p css={{ color: "green" }}>
                                                {success}
                                            </p>
                                        </div>
                                    )}
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div css={{ flex: "1 1 60%" }}>
                        <h3>Ihre persönlichen Daten</h3>
                        <p>
                            Zum Login in den geschützten Mitgliederbereich der
                            DGK benötigen Sie einen Benutzernamen oder eine
                            hinterlegte E-Mail Adresse und jeweils ein Passwort.
                        </p>
                        <p>
                            Ihre E-Mail Adresse benötigen wir, für die
                            &quot;Passwort zurücksetzen&quot;-Funktion des
                            Mitgliederbereichs.
                        </p>
                        <p>
                            Zur Änderung Ihrer persönlichen Daten (Titel,
                            Nachname) schicken Sie bitte eine E-Mail an
                            <a href="mailto:info@koloproktologie.org">
                                info@koloproktologie.org
                            </a>
                            .
                        </p>
                        <p>
                            Diese Daten werden zu keinem anderen Zweck erhoben,
                            verarbeitet oder weitergegeben.
                        </p>
                    </div>
                </FlexBox>
            </div>
        </div>
    );
};

export default UserAccount;
