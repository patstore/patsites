import { apiRequest } from "@provider";
import { memberContainer } from "@styles";
import { Button, ContentContainer, Divider } from "@ui";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const memberSchema = Yup.object().shape({
    title: Yup.string().required("Bitte geben Sie Ihr Geschlecht an"),
    pre_title: Yup.string(),
    first_name: Yup.string().required("Bitte geben Sie Ihren Vornamen ein"),
    last_name: Yup.string().required("Bitte geben Sie Ihren Nachnamen ein"),
    email: Yup.string()
        .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
        .required("Bitte geben Sie Ihre E-Mail-Adresse ein"),
    newsletter_email: Yup.string()
        .transform((v) => (v === "" ? undefined : v))
        .email("Bitte geben Sie eine gültige Newsletter-E-Mail-Adresse ein")
        .optional(),
    member_id: Yup.string(),
    fachrichtung: Yup.string(),
    expires_at: Yup.boolean(),
    is_retiree: Yup.boolean()
});

export type MemberFormValues = {
    title: string;
    pre_title: string;
    first_name: string;
    last_name: string;
    email: string;
    newsletter_email: string;
    member_id: string;
    fachrichtung: string;
    expires_at: boolean;
    is_retiree: boolean;
};

type ExistingUser = {
    id?: string;
    objectId?: string;
    first_name: string;
    last_name: string;
};

type CloudResult<T = Record<string, unknown>> = {
    data: {
        result: {
            success: boolean;
            message?: string;
            user?: ExistingUser;
        } & T;
    };
};

const MemberForm: React.FC = () => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [existingUser, setExistingUser] = useState<ExistingUser | null>(null);
    const [pendingValues, setPendingValues] = useState<MemberFormValues | null>(null);
    const [isProcessingExisting, setIsProcessingExisting] = useState<boolean>(false);

    const buildPayload = (values: MemberFormValues): Record<string, unknown> => ({
        title: values.title,
        pre_title: values.pre_title,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        newsletter_email: values.newsletter_email || undefined,
        member_id: values.member_id,
        fachrichtung: values.fachrichtung,
        expires_at: values.expires_at,
        is_retiree: values.is_retiree
    });

    const extractErrorMessage = (error: unknown, fallback: string): string => {
        return error instanceof Error && error.message ? error.message : fallback;
    };

    const resetFeedback = () => {
        setSubmitError(null);
        setSuccessMessage(null);
    };

    const handleConfirmAddMembership = async (
        resetForm: FormikHelpers<MemberFormValues>["resetForm"]
    ) => {
        if (!existingUser || !pendingValues) {
            return;
        }
        resetFeedback();
        setIsProcessingExisting(true);
        try {
            const payload: Record<string, unknown> = {
                ...buildPayload(pendingValues),
                add_membership: true
            };
            const response = await apiRequest<{
                result: CloudResult["data"]["result"];
            }>("/api/members/create", payload);
            if (response.result.success === true) {
                setSuccessMessage(
                    `Die Mitgliedschaft wurde ${existingUser.first_name} ${existingUser.last_name} erfolgreich hinzugefügt.`
                );
                resetForm();
                setExistingUser(null);
                setPendingValues(null);
            } else {
                setSubmitError(
                    response.result.message ??
                        "Die Mitgliedschaft konnte nicht hinzugefügt werden."
                );
            }
        } catch (error: unknown) {
            setSubmitError(
                extractErrorMessage(
                    error,
                    "Die Mitgliedschaft konnte nicht hinzugefügt werden. Bitte versuchen Sie es später erneut."
                )
            );
        } finally {
            setIsProcessingExisting(false);
        }
    };

    const handleCancelExisting = () => {
        setExistingUser(null);
        setPendingValues(null);
        resetFeedback();
    };

    return (
        <ContentContainer>
            <div css={memberContainer}>
                <div>
                    <h1>Mitgliederformular</h1>
                    <p>Registrieren Sie ein neues Mitglied des BCD.</p>
                </div>
                <div>
                    <Formik<MemberFormValues>
                        validationSchema={memberSchema}
                        initialValues={{
                            title: "",
                            pre_title: "",
                            first_name: "",
                            last_name: "",
                            email: "",
                            newsletter_email: "",
                            member_id: "",
                            fachrichtung: "",
                            expires_at: false,
                            is_retiree: false
                        }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            resetFeedback();
                            setSubmitting(true);
                            try {
                                const lookup = await apiRequest<{
                                    result: CloudResult["data"]["result"];
                                }>("/api/members/lookup", {
                                    email: values.email
                                });

                                if (
                                    lookup.result.success === true &&
                                    lookup.result.user
                                ) {
                                    setExistingUser(lookup.result.user);
                                    setPendingValues(values);
                                    return;
                                }

                                const response = await apiRequest<{
                                    result: CloudResult["data"]["result"];
                                }>("/api/members/create", buildPayload(values));
                                if (response.result.success === true) {
                                    setSuccessMessage(
                                        "Ihre Angaben wurden übermittelt. Das neue Mitglied erhält seine / ihre Zugangsdaten per E-Mail."
                                    );
                                    resetForm();
                                } else if (response.result.success === false) {
                                    setSubmitError(
                                        response.result.message ??
                                            "Die Registrierung konnte nicht abgeschlossen werden."
                                    );
                                }
                            } catch (error: unknown) {
                                setSubmitError(
                                    extractErrorMessage(
                                        error,
                                        "Die Registrierung konnte nicht abgeschlossen werden. Bitte versuchen Sie es später erneut."
                                    )
                                );
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            isSubmitting,
                            errors,
                            touched,
                            submitForm,
                            resetForm
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="title">Geschlecht</label>
                                    <select
                                        id="title"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="">Bitte wählen</option>
                                        <option value="Herr">Herr</option>
                                        <option value="Frau">Frau</option>
                                        <option value="Divers">Divers</option>
                                    </select>
                                    {errors.title && touched.title && (
                                        <div className="form_error">{errors.title}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="pre_title">Titel</label>
                                    <input
                                        id="pre_title"
                                        name="pre_title"
                                        type="text"
                                        value={values.pre_title}
                                        placeholder="z. B. Dr., Prof."
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.pre_title && touched.pre_title && (
                                        <div className="form_error">{errors.pre_title}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="first_name">Vorname</label>
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.first_name && touched.first_name && (
                                        <div className="form_error">{errors.first_name}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="last_name">Nachname</label>
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.last_name && touched.last_name && (
                                        <div className="form_error">{errors.last_name}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email">E-Mail</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && (
                                        <div className="form_error">{errors.email}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="newsletter_email">Newsletter E-Mail</label>
                                    <input
                                        id="newsletter_email"
                                        name="newsletter_email"
                                        type="email"
                                        autoComplete="email"
                                        value={values.newsletter_email}
                                        placeholder="optional, falls abweichend"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p>
                                        Falls die Newsletter E-Mail identisch mit der Anmelde-E-Mail ist, bitte dieselbe hier eintragen.
                                    </p>
                                    {errors.newsletter_email && touched.newsletter_email && (
                                        <div className="form_error">{errors.newsletter_email}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="member_id">Mandatsreferenz</label>
                                    <input
                                        id="member_id"
                                        name="member_id"
                                        type="text"
                                        autoComplete="email"
                                        value={values.member_id}
                                        placeholder="Mandatsreferenz des Mitglieds"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    {errors.member_id && touched.member_id && (
                                        <div className="form_error">{errors.member_id}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="fachrichtung">fachrichtung</label>
                                    <input
                                        id="fachrichtung"
                                        name="fachrichtung"
                                        type="text"
                                        autoComplete="email"
                                        value={values.fachrichtung}
                                        placeholder="Fachrichtung des Mitglieds"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    {errors.fachrichtung && touched.fachrichtung && (
                                        <div className="form_error">{errors.fachrichtung}</div>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="expires_at"
                                        css={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
                                    >
                                        <input
                                            id="expires_at"
                                            name="expires_at"
                                            type="checkbox"
                                            checked={values.expires_at}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        Probemitgliedschaft 12 Monate
                                    </label>
                                </div>
                                <div>
                                    <label
                                        htmlFor="is_retiree"
                                        css={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
                                    >
                                        <input
                                            id="is_retiree"
                                            name="is_retiree"
                                            type="checkbox"
                                            checked={values.is_retiree}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        Rentner/in
                                    </label>
                                </div>
                                <Divider />
                                {existingUser ? (
                                    <div
                                        role="dialog"
                                        aria-live="polite"
                                        css={{
                                            border: "1px solid #ccc",
                                            borderRadius: "0.5rem",
                                            padding: "1rem",
                                            marginBottom: "1rem",
                                            background: "#f7f7f7"
                                        }}
                                    >
                                        <p css={{ marginTop: 0 }}>
                                            Es existiert bereits ein Benutzer mit dieser E-Mail-Adresse:
                                        </p>
                                        <p css={{ fontWeight: "bold" }}>
                                            {existingUser.first_name} {existingUser.last_name}
                                        </p>
                                        <p>Soll diesem Benutzer eine Mitgliedschaft hinzugefügt werden?</p>
                                        <div css={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                            <Button
                                                type="button"
                                                text={
                                                    isProcessingExisting
                                                        ? "Wird hinzugefügt …"
                                                        : "Ja, Mitgliedschaft hinzufügen"
                                                }
                                                disabled={isProcessingExisting}
                                                onClick={() => handleConfirmAddMembership(resetForm)}
                                            />
                                            <Button
                                                type="button"
                                                text="Abbrechen"
                                                disabled={isProcessingExisting}
                                                onClick={handleCancelExisting}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        type="submit"
                                        text={isSubmitting ? "Wird gesendet …" : "Registrierung absenden"}
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    />
                                )}
                                {(isSubmitting || isProcessingExisting) && (
                                    <p role="status" aria-live="polite">
                                        Bitte warten Sie, Ihre Daten werden übermittelt …
                                    </p>
                                )}
                                {submitError && (
                                    <p className="form_error" role="alert">
                                        {submitError}
                                    </p>
                                )}
                                {successMessage && (
                                    <p css={{ color: "green" }} role="status">
                                        {successMessage}
                                    </p>
                                )}
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </ContentContainer>
    );
};

export default MemberForm;
