"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios, { AxiosError } from "axios";

const compileAxiosError = (error: AxiosError) => {
    if (!error) {
        return {
            success: false,
            message: "Unbekannter Fehler",
            type: "unknown-error"
        };
    }
    return {
        success: false,
        message: error.message,
        type: "network-error"
    };
};

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&_*])/,
            "Passwort muss einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten"
        )
        .required("Pflichtfeld"),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), undefined],
        "Passwörter müssen übereinstimmen"
    )
});

const PasswordForm: React.FC<{
    email: string;
    userId: string;
    passwordKey: string;
}> = ({ email, userId, passwordKey }) => {
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const axiosclient = axios.create({
        baseURL: import.meta.env.VITE_PATSTORE_API_URL,
        headers: {
            "X-Parse-Application-Id": import.meta.env.VITE_PATSTORE_APP_ID,
            "X-Parse-REST-API-Key": import.meta.env.VITE_PATSTORE_REST_KEY
        }
    });

    const formik = useFormik({
        validationSchema: SignupSchema,
        initialValues: {
            username: "",
            password: "",
            passwordConfirmation: ""
        },
        onSubmit: async (values) => {
            setDisabled(true);

            const response = await axiosclient
                .post("functions/change_user_password", {
                    user_id: userId,
                    key: passwordKey,
                    password: values.password
                })
                .then((response) => {
                    return response.data.result;
                })
                .catch((error) => {
                    setDisabled(false);
                    return compileAxiosError(error);
                });

            if (response && response.success === true) {
                setSuccess(true);
            } else if (response && response.success === false) {
                setError(response.message);
                // setDisabled(false);
            } else {
                setDisabled(false);
            }
        }
    });

    return success ? (
        <>
            <p>
                Ihr Passwort wurde erfolgreich geändert. Sie können sich jetzt
                wieder einloggen.
            </p>
            <button
                className="full_button md primary"
                onClick={() => (window.location.href = "/login")}
            >
                Zum Login
            </button>
        </>
    ) : (
        <div>
            <form
                onSubmit={formik.handleSubmit}
                className={"login_form_container"}
            >
                <div>
                    <label>E.Mail Adresse</label>
                    <p>{email}</p>
                </div>
                <div>
                    <label htmlFor="password">Passwort</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <div>
                        {formik.errors.password && (
                            <div className="error_message">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">
                        Passwort bestätigen
                    </label>
                    <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirmation}
                    />
                    <div>
                        {formik.errors.passwordConfirmation && (
                            <div className="error_message">
                                {formik.errors.passwordConfirmation}
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className="dark_button"
                    type="submit"
                    disabled={disabled}
                >
                    Passwort ändern
                </button>
                {error && <p className="error_message">{error}</p>}
            </form>
        </div>
    );
};

export default PasswordForm;
