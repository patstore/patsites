import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "@tanstack/react-form";
import { useOptionalScroll } from "@repo/core";
import { submitPersonMessage } from "@functions/forms.functions";
import { contactFormId } from "@functions/contactForm";
import styles from "./ContactModal.module.css";

type ContactModalProps = {
	open: boolean;
	onClose: () => void;
	personId: string;
	categories?: readonly string[] | null;
	name: string;
	portrait: string | null;
	fallback: string;
	email: string | null;
	phone: string | null;
	phoneLink: string | null;
	address: string | null;
};

const FOCUSABLE =
	'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const errorText = (error: unknown) => {
	if (typeof error === "string") {
		return error;
	}
	if (error && typeof error === "object" && "message" in error) {
		return String(error.message);
	}
	return "";
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

const ContactModal = ({
	open,
	onClose,
	personId,
	categories,
	name,
	portrait,
	fallback,
	email,
	phone,
	phoneLink,
	address
}: ContactModalProps) => {
	const titleId = useId();
	const panelRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;
	const closeModalRef = useRef(() => {});
	const scroll = useOptionalScroll();
	const [mounted, setMounted] = useState(false);
	const [present, setPresent] = useState(false);
	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
	const formId = useMemo(() => contactFormId(categories), [categories]);
	const form = useForm({
		defaultValues: {
			email: "",
			telefon: "",
			betreff: "",
			text: "",
			honeypot: ""
		},
		onSubmit: async ({ value }) => {
			if (!formId) {
				setStatus("error");
				return;
			}
			setStatus("idle");
			try {
				await submitPersonMessage({
					data: {
						personId,
						email: value.email.trim(),
						telefon: value.telefon.trim(),
						betreff: value.betreff,
						text: value.text,
						honeypot: value.honeypot
					}
				});
				setStatus("sent");
			} catch {
				setStatus("error");
			}
		}
	});

	const close = () => {
		setStatus("idle");
		form.reset();
		onCloseRef.current();
	};
	closeModalRef.current = close;

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) {
			return;
		}
		if (open) {
			setPresent(true);
			const frame = requestAnimationFrame(() => {
				requestAnimationFrame(() => setVisible(true));
			});
			return () => cancelAnimationFrame(frame);
		}
		setVisible(false);
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		const timeout = window.setTimeout(
			() => setPresent(false),
			reduce ? 0 : 450
		);
		return () => window.clearTimeout(timeout);
	}, [mounted, open]);

	useEffect(() => {
		if (!open || !visible) {
			return;
		}

		const viewport = scroll?.getViewport() ?? null;
		if (viewport) {
			viewport.dataset.scrollLocked = "true";
		}
		const previous =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;
		closeRef.current?.focus();

		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeModalRef.current();
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
			if (viewport) {
				delete viewport.dataset.scrollLocked;
			}
			document.removeEventListener("keydown", onKey);
			previous?.focus();
		};
	}, [open, scroll, visible]);

	if (!mounted || !present) {
		return null;
	}

	return createPortal(
		<div
			ref={panelRef}
			className={styles.dialog}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			aria-hidden={visible ? undefined : true}
			data-open={visible ? "true" : "false"}
			data-lenis-prevent
		>
			<aside className={styles.person}>
				<div className={styles.bar}>
					<div className={styles.identity}>
						<h2 id={titleId} style={{ order: 1 }}>
							{name}
						</h2>
						{portrait ? (
							<img
								className={styles.portrait}
								src={portrait}
								alt=""
							/>
						) : (
							<div className={styles.fallback} aria-hidden="true">
								{fallback}
							</div>
						)}
					</div>
					<button
						ref={closeRef}
						type="button"
						className={styles.close}
						onClick={close}
					>
						Schließen
					</button>
				</div>
				{email || phone || address ? (
					<div className={styles.details}>
						{email ? <a href={`mailto:${email}`}>{email}</a> : null}
						{phone && phoneLink ? (
							<a href={phoneLink}>{phone}</a>
						) : null}
						{address ? (
							<p className={styles.address}>{address}</p>
						) : null}
					</div>
				) : null}
			</aside>
			<div className={styles.formSide}>
				<h3>Schreibe {name} eine Nachricht</h3>
				{status === "sent" ? (
					<p className={styles.success} role="status">
						Ihre Nachricht wurde gesendet. Sie erhalten bald eine
						Antwort.
					</p>
				) : formId ? (
					<form
						className={styles.form}
						noValidate
						onSubmit={(event) => {
							event.preventDefault();
							event.stopPropagation();
							void form.handleSubmit();
						}}
					>
						<div className={styles.row}>
							<form.Field
								name="email"
								validators={{ onSubmit: emailError }}
							>
								{(field) => (
									<label className={styles.field}>
										<span>E-Mail</span>
										<input
											id={field.name}
											name={field.name}
											type="email"
											autoComplete="email"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(input) =>
												field.handleChange(
													input.target.value
												)
											}
										/>
										{field.state.meta.errors.map(
											(error, index) => {
												const text = errorText(error);
												return text ? (
													<p
														key={`${field.name}-${index}`}
														className={styles.error}
													>
														{text}
													</p>
												) : null;
											}
										)}
									</label>
								)}
							</form.Field>
							<form.Field name="telefon">
								{(field) => (
									<label className={styles.field}>
										<span>
											Telefon
											<span className={styles.optional}>
												optional
											</span>
										</span>
										<input
											id={field.name}
											name={field.name}
											type="tel"
											autoComplete="tel"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(input) =>
												field.handleChange(
													input.target.value
												)
											}
										/>
									</label>
								)}
							</form.Field>
						</div>
						<form.Field
							name="betreff"
							validators={{ onSubmit: required }}
						>
							{(field) => (
								<label className={styles.field}>
									<span>Betreff</span>
									<input
										id={field.name}
										name={field.name}
										type="text"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(input) =>
											field.handleChange(
												input.target.value
											)
										}
									/>
									{field.state.meta.errors.map(
										(error, index) => {
											const text = errorText(error);
											return text ? (
												<p
													key={`${field.name}-${index}`}
													className={styles.error}
												>
													{text}
												</p>
											) : null;
										}
									)}
								</label>
							)}
						</form.Field>
						<form.Field
							name="text"
							validators={{ onSubmit: required }}
						>
							{(field) => (
								<label className={styles.field}>
									<span>Text</span>
									<textarea
										id={field.name}
										name={field.name}
										rows={8}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(input) =>
											field.handleChange(
												input.target.value
											)
										}
									/>
									{field.state.meta.errors.map(
										(error, index) => {
											const text = errorText(error);
											return text ? (
												<p
													key={`${field.name}-${index}`}
													className={styles.error}
												>
													{text}
												</p>
											) : null;
										}
									)}
								</label>
							)}
						</form.Field>
						<form.Field name="honeypot">
							{(field) => (
								<label
									className={styles.honeypot}
									aria-hidden="true"
								>
									Website
									<input
										name={field.name}
										tabIndex={-1}
										autoComplete="off"
										value={field.state.value}
										onChange={(input) =>
											field.handleChange(
												input.target.value
											)
										}
									/>
								</label>
							)}
						</form.Field>
						<form.Subscribe
							selector={(state) => state.isSubmitting}
						>
							{(isSubmitting) => (
								<button
									className={styles.submit}
									type="submit"
									disabled={isSubmitting}
								>
									{isSubmitting
										? "Wird gesendet …"
										: "Nachricht senden"}
								</button>
							)}
						</form.Subscribe>
						{status === "error" ? (
							<p className={styles.formError} role="alert">
								Die Nachricht konnte nicht gesendet werden.
								Bitte versuchen Sie es später erneut.
							</p>
						) : null}
					</form>
				) : (
					<p className={styles.formError} role="alert">
						Für diese Hebamme ist kein Kontaktformular hinterlegt.
					</p>
				)}
			</div>
		</div>,
		document.body
	);
};

export default ContactModal;
