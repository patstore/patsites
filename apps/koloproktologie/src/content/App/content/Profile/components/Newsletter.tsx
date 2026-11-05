import React from "react";
import { KoloproktologieUser } from "@types";
import { Formik } from "formik";
import {
    newsletterForm,
    sectionTitle,
    radioLabel,
    radioLabelNoMargin,
    radioInput,
    radioInputSmall,
    emailSelectionBox,
    emailSelectionTitle,
    emailSelectionDescription,
    emailOptionLabel,
    customEmailInput
} from "../styles";
import { Button, Divider } from "@ui";
import { isEqual } from "lodash-es";
import { apiRequest } from "@provider";
import {
    emailListHandler,
    createInitialValues,
    NEWSLETTER_LIST_ID_DGK
} from "../functions/emailListHandler";

const Newsletter: React.FC<{
    user: KoloproktologieUser;
    getUser: () => Promise<void>;
}> = ({ user, getUser }) => {
    console.log(user.emails);
    return (
        <div css={{ width: "100%" }}>
            <h2>Rundmails der DGK</h2>
            <div>
                <p>
                    Unsere Rundmails werden im Schnitt ungefähr achtmal pro Jahr
                    versendet. Diese enthalten z.B. Informationen über teilweise
                    kostenpflichtige Veranstaltungen, Informationen über
                    aktuelle Belange der Koloproktologie - wie z.B.
                    Stellungnahmen der beteiligten Verbände - als auch
                    Informationen über Praxisabgaben oder Stellenangebote.
                </p>
                <p>
                    Selbstverständlich können Sie diese jederzeit hier und in
                    den Rundmails selbst abbestellen.
                </p>
                <Divider showLine />
                <Formik
                    initialValues={createInitialValues({ emails: user.emails })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const isOptedIn = values.newsletter_optin === "1";
                        const oldOptIn = user.emails.find(email => email.lists.includes(NEWSLETTER_LIST_ID_DGK));
                        const oldEmail = oldOptIn?.email;
                        const finalEmail = isOptedIn
                            ? values.newsletter_email
                            : null;

                        const newEmails = emailListHandler({
                            emails: user.emails,
                            isOptedIn,
                            email: finalEmail || ""
                        });

                        await apiRequest("/api/account/newsletter", {
                            emails: newEmails,
                            previousOptedIn: Boolean(oldOptIn),
                            optedIn: isOptedIn,
                            previousEmail: oldEmail || "",
                            nextEmail: finalEmail || ""
                        });
                        await getUser();
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        initialValues,
                        setFieldValue
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            css={newsletterForm}
                        >
                            {/* Opt-in Section */}
                            <div>
                                <h3 css={sectionTitle}>
                                    Zustimmung zum Erhalt der DGK-Rundmails
                                </h3>

                                <label css={radioLabel}>
                                    <input
                                        type="radio"
                                        name="newsletter_optin"
                                        id="newsletter_optin1"
                                        value="1"
                                        checked={
                                            values.newsletter_optin === "1"
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        css={radioInput}
                                    />
                                    <span>
                                        Ja, ich möchte die Rundmails der DGK an
                                        meine eingetragene Email-Adresse
                                        erhalten.
                                    </span>
                                </label>

                                {/* Email Selection - Only visible when opted in */}
                                {values.newsletter_optin === "1" && (
                                    <div
                                        id="emails"
                                        css={emailSelectionBox}
                                    >
                                        <h4 css={emailSelectionTitle}>
                                            Email-Adresse für
                                            Rundmail-Abonnement auswählen
                                        </h4>
                                        <p css={emailSelectionDescription}>
                                            Wählen Sie die Email-Adresse aus, an
                                            die die Rundmails verschickt werden
                                            sollen.
                                        </p>

                                        {user.email && (
                                            <label css={emailOptionLabel}>
                                                <input
                                                    type="radio"
                                                    name="newsletter_email"
                                                    id="newsletter_email_main"
                                                    value={user.email}
                                                    checked={
                                                        values.newsletter_email ===
                                                        user.email
                                                    }
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    css={radioInputSmall}
                                                />
                                                <span>
                                                    <strong>
                                                        {user.email}
                                                    </strong>{" "}
                                                    (Persönliche Email-Adresse)
                                                </span>
                                            </label>
                                        )}

                                        <label css={emailOptionLabel}>
                                            <input
                                                type="radio"
                                                name="newsletter_email"
                                                id="newsletter_email_custom"
                                                value=""
                                                checked={
                                                    values.newsletter_email !==
                                                    user.email
                                                }
                                                onChange={() => {
                                                    setFieldValue(
                                                        "newsletter_email",
                                                        ""
                                                    );
                                                }}
                                                onBlur={handleBlur}
                                                css={radioInputSmall}
                                            />
                                            <div css={{ flex: 1 }}>
                                                <span>
                                                    <strong>
                                                        Andere Email-Adresse
                                                    </strong>
                                                </span>
                                                {values.newsletter_email !==
                                                    user.email && (
                                                    <input
                                                        type="email"
                                                        name="newsletter_email"
                                                        id="newsletter_email_custom_input"
                                                        placeholder="email@beispiel.de"
                                                        value={
                                                            values.newsletter_email
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        css={customEmailInput}
                                                        required
                                                    />
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Opt-out Section */}
                            <div>
                                <h3 css={sectionTitle}>
                                    Rundmails abbestellen
                                </h3>

                                <label css={radioLabelNoMargin}>
                                    <input
                                        type="radio"
                                        name="newsletter_optin"
                                        id="newsletter_optin0"
                                        value="0"
                                        checked={
                                            values.newsletter_optin === "0"
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        css={radioInput}
                                    />
                                    <span>
                                        Nein, ich möchte keine Rundmails der DGK
                                        erhalten.
                                    </span>
                                </label>
                            </div>

                            <Divider />

                            <Button
                                disabled={
                                    isSubmitting ||
                                    isEqual(values, initialValues)
                                }
                                type="submit"
                                text="Rundmail-Einstellungen speichern"
                            />
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Newsletter;
