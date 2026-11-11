import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import type { EventClass } from "@data";
import { submitCourseRegistration } from "@functions/forms.functions";
import styles from "./CourseForm.module.css";

type EventDate = {
  id?: string;
  start?: string;
  end?: string;
  label?: string;
  full_day?: boolean;
};

type SignupValues = {
  nachname: string;
  vorname: string;
  geburtsdatum: string;
  strasse: string;
  plzOrt: string;
  telefon: string;
  mobil: string;
  email: string;
  kursbeginn: string;
  krankenversicherung: string;
  kassenNr: string;
  versNr: string;
  partnerName: string;
  kind: string;
  geburtstermin: string;
  privacy: boolean;
  honeypot: string;
};

type TextName = {
  [Key in keyof SignupValues]: SignupValues[Key] extends string ? Key : never;
}[keyof SignupValues];

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

const formatPoint = (value: string | undefined) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const courseDates = (dates: EventClass["dates"]) => {
  if (!Array.isArray(dates)) {
    return [];
  }
  return dates.flatMap((entry, index) => {
    if (!entry || typeof entry !== "object") {
      return [];
    }
    const date = entry as EventDate;
    const start = formatPoint(date.start);
    const end = formatPoint(date.end);
    const when = [start, end].filter(Boolean).join(" – ");
    const label = [date.label, when].filter(Boolean).join(", ") || `Termin ${index + 1}`;
    return [{ value: date.id || `${label}-${index}`, label }];
  });
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

const CourseForm = ({ event }: { event: EventClass }) => {
  const dates = courseDates(event.dates);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const defaultValues: SignupValues = {
    nachname: "",
    vorname: "",
    geburtsdatum: "",
    strasse: "",
    plzOrt: "",
    telefon: "",
    mobil: "",
    email: "",
    kursbeginn: "",
    krankenversicherung: "",
    kassenNr: "",
    versNr: "",
    partnerName: "",
    kind: "",
    geburtstermin: "",
    privacy: false,
    honeypot: "",
  };
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const selected = dates.find((date) => date.value === value.kursbeginn);
      setStatus("idle");
      try {
        await submitCourseRegistration({
          data: {
            eventId: event.objectId,
            eventTitle: event.title || "Kurs",
            nachname: value.nachname,
            vorname: value.vorname,
            geburtsdatum: value.geburtsdatum,
            strasse: value.strasse,
            plzOrt: value.plzOrt,
            telefon: value.telefon,
            mobil: value.mobil,
            email: value.email,
            kursbeginn: selected?.label ?? value.kursbeginn,
            krankenversicherung: value.krankenversicherung,
            kassenNr: value.kassenNr,
            versNr: value.versNr,
            partnerName: value.partnerName,
            kind: value.kind,
            geburtstermin: value.geburtstermin,
            privacy: true,
            honeypot: value.honeypot,
          },
        });
        setStatus("sent");
      } catch {
        setStatus("error");
      }
    },
  });

  const textField = (
    name: TextName,
    label: string,
    column: "left" | "right",
    options?: { type?: string; autoComplete?: string; required?: boolean },
  ) => (
    <form.Field
      name={name}
      validators={
        name === "email"
          ? { onSubmit: emailError }
          : options?.required
            ? { onSubmit: required }
            : undefined
      }
    >
      {(field) => (
        <label className={`${styles.field} ${styles[column]}`}>
          <span>{label}</span>
          <input
            id={field.name}
            name={field.name}
            type={options?.type ?? "text"}
            autoComplete={options?.autoComplete}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(input) => field.handleChange(input.target.value)}
          />
          {field.state.meta.errors.map((error, index) => {
            const text = errorText(error);
            return text ? (
              <p key={`${field.name}-${index}`} className={styles.error}>
                {text}
              </p>
            ) : null;
          })}
        </label>
      )}
    </form.Field>
  );

  return (
    <section className={styles.signup} id="anmeldung">
      <h3>Anmeldung</h3>
      <div className={styles.costs}>
        <h4>Kosten</h4>
        <p>
          Die Krankenversicherung übernimmt alle Kosten, nicht jedoch den Partnerbeitrag. Stunden,
          an denen Sie nicht teilnehmen, übernimmt die Krankenversicherung nicht. Die Teilnahme ohne
          Begleitpersonen ist möglich.
        </p>
        <p>
          Die Kursgebühr der Frau rechnet die Hebamme direkt mit Ihrer Krankenkasse ab. Sie brauchen
          sich nicht zusätzlich bei der Krankenversicherung anzumelden und auch keine Kostenübernahme
          zu beantragen. Den Partnerbeitrag über 155,- € bitte bei Kursbeginn mitbringen.
        </p>
        <h4>Verbindlichkeit</h4>
        <p>
          Sie sind verbindlich angemeldet, wenn Ihre schriftliche Anmeldung bei der Kurs leitenden
          Hebamme vorliegt.
        </p>
      </div>
      {status === "sent" ? (
        <p className={styles.success}>Danke, die Anmeldung ist angekommen.</p>
      ) : (
        <form
          className={styles.form}
          noValidate
          onSubmit={(submitEvent) => {
            submitEvent.preventDefault();
            submitEvent.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {textField("nachname", "Nachname", "left", { autoComplete: "family-name", required: true })}
          {textField("vorname", "Vorname", "left", { autoComplete: "given-name", required: true })}
          {textField("geburtsdatum", "Geburtsdatum", "left", { type: "date", autoComplete: "bday" })}
          {textField("strasse", "Straße", "left", { autoComplete: "street-address" })}
          {textField("plzOrt", "PLZ / Ort", "left", { autoComplete: "postal-code" })}
          {textField("telefon", "Telefon-Nr.", "left", { type: "tel", autoComplete: "tel" })}
          {textField("mobil", "Mobil", "left", { type: "tel", autoComplete: "tel" })}
          {textField("email", "E-Mail", "left", { type: "email", autoComplete: "email", required: true })}
          <form.Field
            name="kursbeginn"
            validators={{
              onSubmit: ({ value }) =>
                dates.length === 0 || value ? undefined : "Bitte einen Termin wählen",
            }}
          >
            {(field) => (
              <label className={`${styles.field} ${styles.right}`}>
                <span>Kursbeginn am / Uhrzeit</span>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(input) => field.handleChange(input.target.value)}
                >
                  <option value="">
                    {dates.length === 0 ? "Aktuell kein Termin hinterlegt" : "Bitte wählen"}
                  </option>
                  {dates.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
                {field.state.meta.errors.map((error, index) => {
                  const text = errorText(error);
                  return text ? (
                    <p key={`kursbeginn-${index}`} className={styles.error}>
                      {text}
                    </p>
                  ) : null;
                })}
              </label>
            )}
          </form.Field>
          {textField("krankenversicherung", "Krankenvers.", "right")}
          {textField("kassenNr", "Kassen-Nr.", "right")}
          {textField("versNr", "Vers.-Nr.", "right")}
          {textField("partnerName", "Name des Partners / der Partnerin", "right")}
          {textField("kind", "Wievieltes Kind?", "right")}
          {textField("geburtstermin", "Voraussichtlicher Geburtstermin", "right", { type: "date" })}
          <form.Field
            name="privacy"
            validators={{
              onSubmit: ({ value }) =>
                value ? undefined : "Bitte stimmen Sie der Speicherung zu",
            }}
          >
            {(field) => (
              <div className={styles.full}>
                <label className={styles.consent}>
                  <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(input) => field.handleChange(input.target.checked)}
                  />
                  <span>
                    Ich habe die <Link to="/datenschutz">Datenschutzerklärung</Link> zur Kenntnis
                    genommen. Ich stimme zu, dass meine Angaben und Daten zur Kursanmeldung erhoben
                    und elektronisch gespeichert werden. Hinweis: Sie können Ihre Einwilligung
                    jederzeit für die Zukunft per E-Mail an{" "}
                    <a href="mailto:unsere-lebenswege@gmx.de">unsere-lebenswege@gmx.de</a> widerrufen.
                  </span>
                </label>
                {field.state.meta.errors.map((error, index) => {
                  const text = errorText(error);
                  return text ? (
                    <p key={`privacy-${index}`} className={styles.error}>
                      {text}
                    </p>
                  ) : null;
                })}
              </div>
            )}
          </form.Field>
          <form.Field name="honeypot">
            {(field) => (
              <label className={styles.honeypot} aria-hidden="true">
                Website
                <input
                  name={field.name}
                  tabIndex={-1}
                  autoComplete="off"
                  value={field.state.value}
                  onChange={(input) => field.handleChange(input.target.value)}
                />
              </label>
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <button className={`${styles.submit} ${styles.full}`} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Wird gesendet …" : "Anmeldung senden"}
              </button>
            )}
          </form.Subscribe>
          {status === "error" ? (
            <p className={`${styles.formError} ${styles.full}`} role="alert">
              Die Anmeldung konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.
            </p>
          ) : null}
        </form>
      )}
    </section>
  );
};

export default CourseForm;
