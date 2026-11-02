import React from "react";
import {  formContainer, oldContentBox } from "../styles";
import { LoginFormProps } from "../types";
import Cookies from "js-cookie";
import { useNavigate } from "@tanstack/react-router";
import { Formik } from "formik";

import * as Yup from "yup";
import { env } from "../../../env";

const loginSchema = Yup.object().shape({
    username: Yup.string().required("Bitte geben Sie Ihren Benutzernamen ein"),
    password: Yup.string().required("Bitte geben Sie Ihr Passwort ein"),
    email: Yup.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
});

const OldLogin: React.FC<LoginFormProps> = ({ title, text }) => {
    const navigate = useNavigate();
    const [login, setLogin] = React.useState({
        username: "",
        password: "",
        email: ""
    });

    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");

    return (
        <div css={[formContainer, oldContentBox]}>
            {title && <h2>{title}</h2>}
            {text && (
                <p>
                    {text}. Falls Sie Ihre Zugangsdaten nicht mehr wissen, dann
                    wenden Sie sich bitte an
                    <a href="mailto:info@koloproktologie.org">
                        info@koloproktologie.org
                    </a>
                </p>
            )}
            <Formik
                validationSchema={loginSchema}
                initialValues={{
                    email: "",
                    password: "",
                    username: ""
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    const response = await fetch("/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: values.email,
                            password: values.password,
                            username: values.username
                        })
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message);
                    }
                    setSubmitting(false);
                    resetForm();
                    const data = await response.json();
                    Cookies.set(
                        env.sessionToken,
                        data.token,
                        { expires: 365, sameSite: "strict" }
                    );
                    navigate({ to: "/app/profile" });
                }}
            >
                {({
                    values,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    isValid,
                    errors,
                    touched
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Nutzername</label>
                            <input
                                type="text"
                                placeholder="vorname.nachname"
                                value={login.username}
                                onChange={(e) =>
                                    setLogin({
                                        ...login,
                                        username: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Passwort</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={login.password}
                                onChange={(e) =>
                                    setLogin({
                                        ...login,
                                        password: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="email">E-Mail Adresse</label>
                            <input
                                type="email"
                                placeholder="E-Mail"
                                value={login.email}
                                onChange={(e) =>
                                    setLogin({
                                        ...login,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>
                       
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default OldLogin;
