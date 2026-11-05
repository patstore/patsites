import React from "react";
import Modal from "react-modal";
import { EmailModalProps } from "../types";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Divider } from "@ui";
import { apiRequest } from "../../data";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
});

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "480px"
    }
};

Modal.setAppElement("body");

const EmailModal: React.FC<EmailModalProps> = ({
    emailPopup,
    setEmailPopup,
    userId,
    getUser
}) => {
    return (
        <div>
            <Modal
                isOpen={emailPopup}
                style={customStyles}
                contentLabel="E-Mail Adresse"
            >
                <h2>E-Mail Adresse</h2>
                <p>
                    Sie haben noch keine E-Mail Adresse für Ihren Account
                    hinterlegt. Bitte geben Sie eine E-Mail Adresse an. <br />
                    Ihre E-Mail Adresse benötigen wir, für die &quot;Passwort
                    zurücksetzen&quot;-Funktion des Mitgliederbereichs.
                </p>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{
                        email: ""
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await apiRequest("/api/account/email", {
                            email: values.email
                        });
                        await getUser();
                        setSubmitting(false);
                        setEmailPopup(false);
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        errors,
                        isValid,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">E-Mail Adresse</label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="E-Mail"
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <div className="form_error">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <Divider />
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                text={
                                    isSubmitting
                                        ? "Speichern"
                                        : "E-Mail speichern"
                                }
                            />
                        </form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default EmailModal;
