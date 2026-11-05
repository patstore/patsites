import { navigate } from "@router";
import { Button, Divider } from "@ui";
import React, { FC, useState } from "react";
import { horizontalContainer, formContainer } from "../styles";
import { LoginFormProps } from "../types";
import ResetPassword from "./ResetPassword";
import { Formik } from "formik";
import * as Yup from "yup";
import { buttonsContainer } from "@styles";

const loginSchema = Yup.object().shape({
    username: Yup.string().required("Bitte geben Sie Ihren Benutzernamen ein"),
    password: Yup.string().required("Bitte geben Sie Ihr Passwort ein"),
    email: Yup.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
});

const LoginForm: FC<LoginFormProps> = ({ title, text }) => {
    const [error, setError] = useState<string | null>(null);
    return (
        <div css={formContainer}>
            {title && <h3>{title}</h3>}
            {text && <p>{text}</p>}
            <Formik
                validationSchema={loginSchema}
                initialValues={{
                    password: "",
                    username: ""
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    const response = await fetch("/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            password: values.password,
                            username: values.username
                        })
                    });

                    const data = await response.json().catch(() => ({}));
                    if (!response.ok) {
                        setError(data.message);
                        setSubmitting(false);
                        return;
                    }
                    setSubmitting(false);
                    navigate("/app/profile");
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                    isValid,
                    errors,
                    touched
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Nutzername</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="vorname.nachname / E-Mail Adresse"
                                onChange={handleChange}
                            />
                            {errors.username && touched.username && (
                                <div className="form_error">{errors.username}</div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password">Passwort</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                            {errors.password && touched.password && (
                                <div className="form_error">{errors.password}</div>
                            )}
                        </div>
                        <Divider />
                        <div css={buttonsContainer}>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                text={"Login"}
                                disabled={!isValid || isSubmitting}
                            />
                            <ResetPassword />
                        </div>
                        {error && <p className="form_error">{error}</p>}
                    </form>
                )}
            </Formik>
            <div css={horizontalContainer}></div>
        </div>
    );
};

export default LoginForm;
