import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import form_data from "./constants/form_data";
import { Button, FlexBox, SlideIn } from "@ui";
import { apiRequest, useSiteContext } from "@provider";
import settings from "@settings";
import RenderFields from "./components/RenderFields";
import validationSchema from "./constants/validation_schema";
import {
	formContainer,
	formContentContainer,
	formFieldsContainer,
	formFooter,
	formHeader
} from "./styles";
import { FieldData } from "./types";

const Application: React.FC = () => {
	const { applicationOpen, setApplicationOpen } = useSiteContext();
	// Several fields (radios) share a key; the first definition provides the
	// default value. Subfields (career path locations) need a value as well.
	const initialValues = Object.keys(form_data).reduce(
		(acc, key) => {
			const fields = form_data[key as keyof typeof form_data].fields;
			(fields as FieldData[]).forEach((field) => {
				[field, field.subfield].forEach((entry) => {
					if (entry && !(entry.key in acc)) {
						acc[entry.key] = entry.value;
					}
				});
			});
			return acc;
		},
		{} as Record<string, any>
	);
	const fieldLabels = Object.keys(form_data).reduce(
		(acc, key) => {
			const fields = form_data[key as keyof typeof form_data].fields;
			(fields as FieldData[]).forEach((field) => {
				[field, field.subfield].forEach((entry) => {
					if (entry && !(entry.key in acc)) {
						acc[entry.key] = entry.label
							.replace(/\s*\*\s*$/, "")
							.trim();
					}
				});
			});
			return acc;
		},
		{} as Record<string, string>
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);
	// Remounts the form with fresh values after a successful submit
	const [formKey, setFormKey] = useState(0);
	const submittingRef = useRef(false);

	useEffect(() => {
		if (!applicationOpen) {
			setSubmitted(false);
			setError(null);
		}
	}, [applicationOpen]);

	const dataHandler = async (values: typeof initialValues) => {
		if (submittingRef.current) {
			return;
		}
		submittingRef.current = true;
		setLoading(true);
		setError(null);

		try {
			await apiRequest("/api/membership/apply", values);
			const {
				password: _password,
				password_confirm: _passwordConfirm,
				...application
			} = values;
			try {
				await apiRequest("/api/application_email", application);
			} catch (emailError) {
				console.error(emailError);
			}
			setSubmitted(true);
			setFormKey((current) => current + 1);
		} catch (err) {
			setError(
				err instanceof Error && err.message
					? err.message
					: "Der Antrag konnte nicht gesendet werden."
			);
		} finally {
			submittingRef.current = false;
			setLoading(false);
		}
	};

	return (
		<SlideIn
			width="large"
			open={applicationOpen}
			cancelButtonHandler={() => setApplicationOpen(false)}
			noButtons
		>
			{submitted ? (
				<div css={formContainer}>
					<div css={formHeader}>
						<h2>Vielen Dank für Ihren Mitgliedschaftsantrag</h2>
					</div>
					<p role="status">
						Ihr Antrag wurde erfolgreich übermittelt. Die
						Geschäftsstelle meldet sich bei Rückfragen bei Ihnen.
					</p>
					<div css={formFooter}>
						<Button
							text="Schließen"
							onClick={() => setApplicationOpen(false)}
						/>
					</div>
				</div>
			) : (
				<Formik
					key={formKey}
					initialValues={initialValues}
					onSubmit={async (values, actions) => {
						await dataHandler(values);
						actions.setSubmitting(false);
					}}
					validationSchema={validationSchema}
					validateOnBlur={true}
					validateOnMount={true}
					enableReinitialize={false}
				>
					{({ errors, touched, values, isValid, submitForm }) => (
						<div css={formContainer}>
							<div css={formHeader}>
								<h2>Mitgliedschaftsantrag</h2>
							</div>
							<Form key="member_form">
								<div css={formContentContainer}>
									{Object.keys(form_data).map((key) => {
										return (
											<div
												css={{
													position: "relative",
													width: "100%"
												}}
												key={key}
											>
												<h3>
													{
														form_data[
															key as keyof typeof form_data
														].title
													}
												</h3>
												<p>
													{
														form_data[
															key as keyof typeof form_data
														].subtitle
													}
												</p>
												{key === "membership" && (
													<div>
														<p>
															<strong>
																Sie möchten die
																Zwecke unserer
																Gesellschaft
																unterstützen?{" "}
																<br /> Dann
																freuen wir uns
																über Ihre
																<a
																	href="/documents/Aufnahmeantrag_Foerdermitgliedschaft.pdf"
																	target="_blank"
																	title="Antragsformular für Födermitgliedschaft"
																>
																	Fördermitgliedschaft
																</a>
																(Beitrag auf
																Spendenbasis)
															</strong>
														</p>

														<p>
															<strong>
																Mitgliedschaft
																für natürliche
																und juristische
																Personen
															</strong>
														</p>
													</div>
												)}
												{form_data[
													key as keyof typeof form_data
												].fields.map(
													(field: FieldData) => (
														<div
															key={`${field.key}-${field.label}`}
															css={
																formFieldsContainer
															}
														>
															<RenderFields
																errors={errors}
																field={field}
																key={field.key}
																touched={
																	touched
																}
																values={values}
															/>
															{field.subfield && (
																<RenderFields
																	errors={
																		errors
																	}
																	field={
																		field.subfield
																	}
																	key={`${field.key}-${field.label}`}
																	touched={
																		touched
																	}
																	noLabel={
																		true
																	}
																	values={
																		values
																	}
																/>
															)}
														</div>
													)
												)}
											</div>
										);
									})}
								</div>
							</Form>
							<p>
								Der Online-Antrag ist ohne Unterschrift gültig;
								als Antragsdatum gilt das Datum des
								Absendetages.
							</p>
							<div css={formFooter}>
								<FlexBox
									direction="row"
									gap="30px"
									align="center"
									wrap
									hasFullWidth
								>
									<Button
										text="Abbrechen"
										color={settings.colors.dark}
										background={settings.colors.light}
										onClick={() =>
											setApplicationOpen(false)
										}
										disabled={loading}
									/>
									<Button
										text={
											!isValid
												? "Bitte alle Felder ausfüllen"
												: "Formular absenden"
										}
										disabled={!isValid || loading}
										onClick={() => {
											submitForm();
										}}
									/>
									{loading && <p>Bitte warten...</p>}
									{Object.keys(touched).length > 0 &&
										!isValid &&
										!loading && (
											<p
												role="alert"
												css={{
													color: "#d75055",
													margin: 0,
													fontSize: "10px !important",
													lineHeight: 1.4,
													flex: "1 1 180px",
													minWidth: 0
												}}
											>
												Bitte prüfen Sie folgende
												Angaben:{" "}
												{Object.keys(errors)
													.map(
														(key) =>
															fieldLabels[key] ??
															key
													)
													.join(", ")}
											</p>
										)}
									{error && !loading && (
										<p
											role="alert"
											css={{
												color: "#d75055",
												margin: 0,
												fontSize: "12px",
												lineHeight: 1.4,
												flex: "1 1 180px",
												minWidth: 0
											}}
										>
											{error}
										</p>
									)}
								</FlexBox>
							</div>
						</div>
					)}
				</Formik>
			)}
		</SlideIn>
	);
};

export default Application;
