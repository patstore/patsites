import React from "react";
import { KoloproktologieUser } from "@types";
import { Formik } from "formik";
import { checkboxContainer, profileContentContainer } from "../styles";
import { Button, Divider } from "@ui";
import { isEqual } from "lodash-es";
import { apiRequest } from "@provider";
import memberValidationSchema from "../constants/member_validation";

const MemberSearch: React.FC<{
    user: KoloproktologieUser;
    getUser: () => Promise<void>;
}> = ({ user, getUser }) => {
    return (
        <div css={{ width: "100%" }}>
            <h2>Daten in der öffentlichen Mitgliedersuche</h2>
            <div css={profileContentContainer}>
                <Formik
                    validationSchema={memberValidationSchema}
                    initialValues={{
                        accept_search:
                            user.settings?.dgk?.accept_search || false,
                        address: user.data?.dgk?.address,
                        title: user.data?.dgk?.title,
                        name: user.data?.dgk?.name,
                        postal_code: user.data?.dgk?.postal_code,
                        city: user.data?.dgk?.city,
                        country: user.data?.dgk?.country
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        await apiRequest("/api/account/listing", {
                            data: {
                                ...user.data,
                                dgk: {
                                    ...user.data?.dgk,
                                    title: values.title,
                                    name: values.name,
                                    postal_code: values.postal_code,
                                    city: values.city,
                                    country: values.country
                                }
                            },
                            settings: {
                                ...user.settings,
                                dgk: {
                                    ...user.settings?.dgk,
                                    accept_search: values.accept_search
                                }
                            }
                        });
                        await getUser();
                        resetForm();
                        setSubmitting(false);
                    }}
                    enableReinitialize
                >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        initialValues,
                        isValid,
                        errors
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div css={checkboxContainer}>
                                <label
                                    htmlFor="accept_search"
                                    css={{ fontWeight: 600 }}
                                >
                                    Ich stimme der Veröffentlichung meiner Daten
                                    in der Mitgliedersuche der DGK zu:
                                </label>
                                <input
                                    checked={values.accept_search}
                                    type="checkbox"
                                    id="accept_search"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <Divider showLine />
                            <div
                                css={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start"
                                }}
                            >
                                {isValid}
                                <div css={{ flex: "1 1 30%" }}>
                                    <div className="horizontal_container">
                                        <label htmlFor="title">Titel</label>
                                        <div>
                                            <input
                                                value={values.title}
                                                id="title"
                                                type="text"
                                                disabled={
                                                    values["accept_search"] ===
                                                    false
                                                }
                                                placeholder="Titel"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <div className="form_error">
                                                {errors.title && errors.title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="horizontal_container">
                                        <label htmlFor="name">Name</label>
                                        <div>
                                            <input
                                                value={values.name}
                                                id="name"
                                                type="text"
                                                disabled={
                                                    values["accept_search"] ===
                                                    false
                                                }
                                                placeholder="Vor- und Nachname"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <div className="form_error">
                                                {errors.name && errors.name}
                                            </div>
                                        </div>
                                    </div>
                                    <h3>Berufliche Adresse</h3>
                                    <div className="horizontal_container">
                                        <label htmlFor="postal_code">PLZ</label>
                                        <div>
                                            <input
                                                value={values.postal_code}
                                                id="postal_code"
                                                disabled={
                                                    values["accept_search"] ===
                                                    false
                                                }
                                                type="text"
                                                placeholder="10115"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <div className="form_error">
                                                {errors.postal_code &&
                                                    errors.postal_code}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="horizontal_container">
                                        <label htmlFor="city">Ort</label>
                                        <div>
                                            <input
                                                value={values.city}
                                                id="city"
                                                disabled={
                                                    values["accept_search"] ===
                                                    false
                                                }
                                                type="text"
                                                placeholder="Berlin"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <div className="form_error">
                                                {errors.city && errors.city}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="horizontal_container">
                                        <label htmlFor="country">Land</label>
                                        <div>
                                            <input
                                                value={values.country}
                                                id="country"
                                                disabled={
                                                    values["accept_search"] ===
                                                    false
                                                }
                                                type="text"
                                                placeholder="Deutschland"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <div className="form_error">
                                                {errors.country &&
                                                    errors.country}
                                            </div>
                                        </div>
                                    </div>
                                    {/* {Object.keys(errors).length > 0 &&
                                        Object.keys(errors).map((key) => {
                                            return (
                                                <div className="form_error">
                                                    {errors[key]}
                                                </div>
                                            );
                                        })} */}
                                    <Divider />
                                    <Button
                                        disabled={
                                            isSubmitting ||
                                            isEqual(values, initialValues) ||
                                            !isValid
                                        }
                                        type="submit"
                                        text="Änderungen speichern"
                                    />
                                </div>
                                <div css={{ flex: "1 1 60%" }}>
                                    <h3>Welchem Zweck dienen diese Daten?</h3>
                                    <p>
                                        Die DGK bietet den Besuchern der
                                        Webseite koloproktologie.org den Service
                                        an, nach Mitgliedern der DGK zu suchen.
                                    </p>
                                    <p>
                                        Sollten Sie einer Veröffentlichung in
                                        dieser Mitgliedersuche zugestimmt haben,
                                        werden Ihr Titel, Ihr vollständiger Name
                                        und PLZ und Ort Ihres beruflichen
                                        Wirkens angezeigt.
                                    </p>
                                    <p>
                                        Diese Daten werden zu keinem anderen
                                        Zweck erhoben, verarbeitet oder
                                        weitergegeben.
                                    </p>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default MemberSearch;
