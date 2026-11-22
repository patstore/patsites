import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useHydrated } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { submitPersonContact } from "@functions/forms.functions";
import { FullButton } from "../Button";
import type { ContactGroup } from "./types";
import styles from "./ContactPersonModal.module.css";

type ContactPersonModalProps = {
	open: boolean;
	onClose: () => void;
	name: string;
	group?: ContactGroup;
};

type FormValues = {
	email: string;
	telefon: string;
	betreff: string;
	text: string;
	honeypot: string;
};

type FormErrors = Partial<Record<"email" | "betreff" | "text", string>>;

const FOCUSABLE =
	'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const validate = (values: FormValues): FormErrors => {
	const errors: FormErrors = {};
	const email = values.email.trim();
	if (!email) {
		errors.email = "Bitte ausfüllen";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = "Bitte eine gültige E-Mail angeben";
	}
	if (!values.betreff.trim()) {
		errors.betreff = "Bitte ausfüllen";
	}
	if (!values.text.trim()) {
		errors.text = "Bitte ausfüllen";
	}
	return errors;
};

const ContactPersonModal = ({
	open,
	onClose,
	name,
	group
}: ContactPersonModalProps) => {
	const hydrated = useHydrated();
	const titleId = useId();
	const panelRef = useRef<HTMLDivElement>(null);
	const submit = useServerFn(submitPersonContact);
	const groupTitle = group?.title ?? "";
	const initialValues: FormValues = {
		email: "",
		telefon: "",
		betreff: groupTitle,
		text: "",
		honeypot: ""
	};
	const [values, setValues] = useState<FormValues>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	// Reset the form (and re-apply the group name as subject) on every open.
	useEffect(() => {
		if (open) {
			setValues({
				email: "",
				telefon: "",
				betreff: groupTitle,
				text: "",
				honeypot: ""
			});
			setErrors({});
			setStatus("idle");
		}
	}, [open, groupTitle]);

	useEffect(() => {
		if (!open) {
			return;
		}
		const previous =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		panelRef.current
			?.querySelector<HTMLElement>("input, textarea, button")
			?.focus();

		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onCloseRef.current();
				return;
			}
			if (event.key !== "Tab" || !panelRef.current) {
				return;
			}
			const focusable = [
				...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
			];
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (!first || !last) {
				return;
			}
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKey);
			previous?.focus();
		};
	}, [open]);

	if (!hydrated) {
		return null;
	}

	const setField = (field: keyof FormValues, value: string) => {
		setValues((current) => ({ ...current, [field]: value }));
		if (field === "email" || field === "betreff" || field === "text") {
			setErrors((current) => ({ ...current, [field]: undefined }));
		}
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const nextErrors = validate(values);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}
		setSubmitting(true);
		setStatus("idle");
		try {
			await submit({
				data: {
					person: name,
					gruppe: groupTitle,
					email: values.email.trim(),
					telefon: values.telefon.trim(),
					betreff: values.betreff,
					text: values.text,
					honeypot: values.honeypot
				}
			});
			setStatus("sent");
		} catch {
			setStatus("error");
		} finally {
			setSubmitting(false);
		}
	};

	return createPortal(
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						key="contact-person-overlay"
						className={styles.overlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(event) => {
							event.stopPropagation();
							onClose();
						}}
					/>
					<motion.div
						key="contact-person-dialog"
						ref={panelRef}
						className={styles.dialog}
						role="dialog"
						aria-modal="true"
						aria-labelledby={titleId}
						initial={{ opacity: 0, y: 40, x: "-50%" }}
						animate={{ opacity: 1, y: 0, x: "-50%" }}
						exit={{ opacity: 0, y: 40, x: "-50%" }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						onClick={(event) => event.stopPropagation()}
					>
						<header className={styles.header}>
							<h2 id={titleId}>{group?.title ?? name}</h2>
							<button
								type="button"
								className={styles.close}
								onClick={(event) => {
									event.stopPropagation();
									onClose();
								}}
							>
								Schließen
							</button>
						</header>
						<div className={styles.body}>
							<div className={styles.formSide}>
								<h3>Schreibe {name} eine Nachricht</h3>
								{status === "sent" ? (
									<p className={styles.success} role="status">
										Deine Nachricht wurde gesendet. Du
										erhältst bald eine Antwort.
									</p>
								) : (
									<form
										className={styles.form}
										noValidate
										onSubmit={onSubmit}
									>
										<div className={styles.row}>
											<div className={styles.field}>
												<label
													className="field-label"
													htmlFor="contact-email"
												>
													E-Mail
												</label>
												<input
													id="contact-email"
													name="email"
													type="email"
													autoComplete="email"
													className="field-input"
													value={values.email}
													onChange={(event) =>
														setField(
															"email",
															event.target.value
														)
													}
												/>
												{errors.email && (
													<p className={styles.error}>
														{errors.email}
													</p>
												)}
											</div>
											<div className={styles.field}>
												<label
													className="field-label"
													htmlFor="contact-telefon"
												>
													Telefon
													<span
														className={
															styles.optional
														}
													>
														optional
													</span>
												</label>
												<input
													id="contact-telefon"
													name="telefon"
													type="tel"
													autoComplete="tel"
													className="field-input"
													value={values.telefon}
													onChange={(event) =>
														setField(
															"telefon",
															event.target.value
														)
													}
												/>
											</div>
										</div>
										<div className={styles.field}>
											<label
												className="field-label"
												htmlFor="contact-betreff"
											>
												Betreff
											</label>
											<input
												id="contact-betreff"
												name="betreff"
												type="text"
												className="field-input"
												value={values.betreff}
												onChange={(event) =>
													setField(
														"betreff",
														event.target.value
													)
												}
											/>
											{errors.betreff && (
												<p className={styles.error}>
													{errors.betreff}
												</p>
											)}
										</div>
										<div className={styles.field}>
											<label
												className="field-label"
												htmlFor="contact-text"
											>
												Text
											</label>
											<textarea
												id="contact-text"
												name="text"
												rows={8}
												className={`field-input ${styles.textarea}`}
												value={values.text}
												onChange={(event) =>
													setField(
														"text",
														event.target.value
													)
												}
											/>
											{errors.text && (
												<p className={styles.error}>
													{errors.text}
												</p>
											)}
										</div>
										<label
											className={styles.honeypot}
											aria-hidden="true"
										>
											Website
											<input
												name="honeypot"
												tabIndex={-1}
												autoComplete="off"
												value={values.honeypot}
												onChange={(event) =>
													setField(
														"honeypot",
														event.target.value
													)
												}
											/>
										</label>
										<FullButton
											text={
												submitting
													? "Wird gesendet …"
													: "Nachricht senden"
											}
											type="submit"
											disabled={submitting}
										/>
										{status === "error" && (
											<p
												className={styles.error}
												role="alert"
											>
												Die Nachricht konnte nicht
												gesendet werden. Bitte versuche
												es später erneut.
											</p>
										)}
									</form>
								)}
							</div>
							{group && (
								<aside className={styles.groupSide}>
									{group.times.length > 0 && (
										<>
											<h3>Trainingszeiten</h3>
											{group.times.map((time) => (
												<div
													key={time.id}
													className="sidebar-panel"
												>
													<h6>{time.label}</h6>
													{time.text && (
														<p>{time.text}</p>
													)}
													{time.location && (
														<p>{time.location}</p>
													)}
												</div>
											))}
										</>
									)}
								</aside>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
};

export default ContactPersonModal;
