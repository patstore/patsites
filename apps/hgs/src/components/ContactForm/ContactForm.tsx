import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { submitContactMessage } from "@functions/forms.functions";
import styles from "./ContactForm.module.css";

type ContactValues = {
	name: string;
	email: string;
	telefon: string;
	nachricht: string;
	honeypot: string;
};

const required = ({ value }: { value: string }) =>
	value.trim() ? undefined : "Bitte ausfüllen";

const emailError = ({ value }: { value: string }) => {
	const email = value.trim();
	if (!email) {
		return "Bitte ausfüllen";
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return "Bitte eine gültige E-Mail angeben";
	}
	return undefined;
};

const errorText = (error: unknown) => {
	if (typeof error === "string") {
		return error;
	}
	if (error && typeof error === "object" && "message" in error) {
		return String(error.message);
	}
	return "";
};

const ContactForm = () => {
	const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			telefon: "",
			nachricht: "",
			honeypot: ""
		} satisfies ContactValues,
		onSubmit: async ({ value }) => {
			setStatus("idle");
			try {
				await submitContactMessage({
					data: {
						name: value.name.trim(),
						email: value.email.trim(),
						telefon: value.telefon.trim(),
						nachricht: value.nachricht.trim(),
						honeypot: value.honeypot
					}
				});
				setStatus("sent");
				form.reset();
			} catch {
				setStatus("error");
			}
		}
	});

	if (status === "sent") {
		return (
			<p className={styles.success} role="status">
				Danke für Ihre Nachricht, wir melden uns zeitnah bei Ihnen.
			</p>
		);
	}

	return (
		<form
			className={styles.form}
			noValidate
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<form.Field name="name" validators={{ onSubmit: required }}>
				{(field) => (
					<label className={styles.field} htmlFor={field.name}>
						<span>Name</span>
						<input
							id={field.name}
							name={field.name}
							autoComplete="name"
							placeholder="Vor- und Nachname"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(event) =>
								field.handleChange(event.target.value)
							}
						/>
						{field.state.meta.errors.map((error) => {
							const text = errorText(error);
							return text ? (
								<small key={text} className={styles.error}>
									{text}
								</small>
							) : null;
						})}
					</label>
				)}
			</form.Field>
			<form.Field name="email" validators={{ onSubmit: emailError }}>
				{(field) => (
					<label className={styles.field} htmlFor={field.name}>
						<span>E-Mail</span>
						<input
							id={field.name}
							name={field.name}
							type="email"
							autoComplete="email"
							placeholder="E-Mail Adresse"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(event) =>
								field.handleChange(event.target.value)
							}
						/>
						{field.state.meta.errors.map((error) => {
							const text = errorText(error);
							return text ? (
								<small key={text} className={styles.error}>
									{text}
								</small>
							) : null;
						})}
					</label>
				)}
			</form.Field>
			<form.Field name="telefon">
				{(field) => (
					<label className={styles.field} htmlFor={field.name}>
						<span>Telefonnummer</span>
						<input
							id={field.name}
							name={field.name}
							type="tel"
							autoComplete="tel"
							placeholder="Telefonnummer"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(event) =>
								field.handleChange(event.target.value)
							}
						/>
					</label>
				)}
			</form.Field>
			<form.Field name="nachricht" validators={{ onSubmit: required }}>
				{(field) => (
					<label className={styles.field} htmlFor={field.name}>
						<span>Nachricht</span>
						<textarea
							id={field.name}
							name={field.name}
							rows={4}
							placeholder="Ihre Nachricht"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(event) =>
								field.handleChange(event.target.value)
							}
						/>
						{field.state.meta.errors.map((error) => {
							const text = errorText(error);
							return text ? (
								<small key={text} className={styles.error}>
									{text}
								</small>
							) : null;
						})}
					</label>
				)}
			</form.Field>
			<label className={styles.honeypot} aria-hidden="true">
				Website
				<input
					tabIndex={-1}
					autoComplete="off"
					value={form.state.values.honeypot}
					onChange={(event) =>
						form.setFieldValue("honeypot", event.target.value)
					}
				/>
			</label>
			<form.Subscribe selector={(state) => state.isSubmitting}>
				{(isSubmitting) => (
					<button
						className="button"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Wird gesendet" : "Nachricht absenden"}
					</button>
				)}
			</form.Subscribe>
			{status === "error" ? (
				<p className={styles.error} role="alert">
					Da ist leider etwas schiefgelaufen.
				</p>
			) : null}
		</form>
	);
};

export default ContactForm;
