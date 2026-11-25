import React, { useState, type FormEvent } from "react";
import axiosclient from "../axios/axios";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [website, setWebsite] = useState("");
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setStatus(null);

        if (website) {
            setUserMessage(true);
            return;
        }
        if (!name) {
            setError("Bitte geben Sie Ihren Namen an.");
            return;
        }
        if (!email || !emailPattern.test(email)) {
            setError("Bitte geben Sie eine gültige E-Mail-Adresse an.");
            return;
        }
        if (!message) {
            setError("Bitte schreiben Sie eine Nachricht.");
            return;
        }

        setLoading(true);

        axiosclient().post("/classes/Item", {
            type: "form",
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message,
                phone: phone
            },
            reference_id: "xAwg6JBYUb"
        });

        setLoading(false);
        setUserMessage(true);
    };

    return (
        <div>
            <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <div
                    className="contact-form-honeypot"
                    aria-hidden="true"
                >
                    <label htmlFor="contact-website">Website</label>
                    <input
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(ev) => setWebsite(ev.target.value)}
                    />
                </div>
                <div className="contact-form-row ">
                    <div className="contact-form-field">
                        <input
                            id="contact-name"
                            className="contact-form-input"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Name *"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                            aria-invalid={error?.includes("Namen") ?? false}
                        />
                    </div>
                </div>
                <div className="contact-form-row ">
                    <div className="contact-form-field">
                        <input
                            id="contact-email"
                            className="contact-form-input"
                            name="email"
                            placeholder="E-Mail *"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            aria-invalid={error?.includes("E-Mail") ?? false}
                        />
                    </div>
                </div>
                <div className="contact-form-row">
                    <div className="contact-form-field">
                        <input
                            id="contact-phone"
                            className="contact-form-input"
                            name="phone"
                            placeholder="Telefon"
                            type="tel"
                            autoComplete="tel"
                            value={phone}
                            onChange={(ev) => setPhone(ev.target.value)}
                            aria-invalid={error?.includes("Telefon") ?? false}
                        />
                    </div>
                </div>
                <div className="contact-form-row">
                    <div className="contact-form-field">
                        <input
                            id="contact-subject"
                            className="contact-form-input"
                            name="subject"
                            placeholder="Betreff *"
                            type="text"
                            autoComplete="off"
                            value={subject}
                            onChange={(ev) => setSubject(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="contact-form-row">
                    <div className="contact-form-field">
                        <textarea
                            id="contact-message"
                            className="contact-form-textarea"
                            name="message"
                            rows={6}
                            placeholder="Nachricht *"
                            value={message}
                            onChange={(ev) => setMessage(ev.target.value)}
                            aria-invalid={error?.includes("Nachricht") ?? false}
                        />
                    </div>
                </div>
                {error ? (
                    <p
                        className="contact-form-error"
                        role="alert"
                    >
                        {error}
                    </p>
                ) : null}
                {status ? (
                    <p
                        className="contact-form-status"
                        role="status"
                    >
                        {status}
                    </p>
                ) : null}
                <button
                    disabled={loading}
                    className="contact-form-submit"
                    type="submit"
                >
                    {loading ? "Sendet Nachricht..." : "Nachricht senden"}
                </button>
                {userMessage ? (
                    <p
                        className="contact-form-status"
                        role="status"
                    >
                        Nachricht erfolgreich gesendet
                    </p>
                ) : null}
                <p>* Pflichtfelder</p>
            </form>
        </div>
    );
};

export default ContactForm;
