import React, { useState } from "react";
import { ColoproktologenUser } from "@types";
import { Formik } from "formik";
import { profileContentContainer } from "../styles";
import { Button, Divider } from "@ui";
import { isEqual } from "lodash-es";
import { apiRequest } from "@provider";

const UserAccount: React.FC<{
  user: ColoproktologenUser;
  getUser: () => Promise<void>;
}> = ({ user, getUser }) => {
    const [success, setSuccess] = useState(false);

    return (
        <div css={{ width: "100%" }}>
            <div css={profileContentContainer}>
                <h3>Ihre persönlichen Daten</h3>
                <Formik
                    enableReinitialize
                    initialValues={{
                        address: user.title,
                        pre_title: user.pre_title,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        await apiRequest("/api/account/email", {
                            email: values.email,
                            notify: true
                        }); 

                        await getUser();
                        setSuccess(true);
                        setSubmitting(false);
                        resetForm();
                        // setTimeout(() => {
                        //     setSuccess(false);
                        // }, 3000);
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        initialValues
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="address">Anrede</label>
                                <input
                                    value={values.address}
                                    id="address"
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
                                <label htmlFor="first_name">Vorname</label>
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
                                <label htmlFor="last_name">Nachname</label>
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
                                <label htmlFor="email">Email</label>
                                <input
                                    value={values.email || ""}
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <Divider />
                            <Button
                                disabled={isSubmitting || isEqual(values, initialValues)}
                                type="submit"
                                text="Änderungen speichern"
                            />
                            {success && <p css={{ color: "green" }}>Änderungen erfolgreich gespeichert</p>}
                        </form>
                    )}
                </Formik>
                <Divider size="large" />
                <p>
                    Um diese Daten zu ändern, wenden Sie sich bitte an <a href="mailto:info@coloproktologen.de">info@coloproktologen.de</a>.
                </p>
            </div>
        </div>
    );
};

export default UserAccount;
