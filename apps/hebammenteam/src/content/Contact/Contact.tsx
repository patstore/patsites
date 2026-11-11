import { FormEvent, useState } from "react";
import { CmsBody, Layout, PageHeader } from "@components";
import { submitContactMessage } from "../../functions/forms.functions";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await submitContactMessage({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          honeypot: String(data.get("company") ?? ""),
        },
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Praxis"
        title="Kontakt"
        lead="Schreiben Sie uns. Wir melden uns, sobald wir Ihre Nachricht gelesen haben."
      />
      <div className={`${styles.layout} page-body`}>
        <div className={styles.cms}>
          <CmsBody path="/kontakt" />
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            <span>Name</span>
            <input name="name" autoComplete="name" required maxLength={200} />
          </label>
          <label className={styles.field}>
            <span>E-Mail</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className={styles.field}>
            <span>Nachricht</span>
            <textarea name="message" rows={6} required maxLength={5000} />
          </label>
          <label className={styles.honeypot} aria-hidden="true">
            Firma
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
          <button className={styles.submit} type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
          </button>
          {status === "sent" ? <p className={styles.status}>Danke, die Nachricht ist angekommen.</p> : null}
          {status === "error" ? (
            <p className={styles.status}>Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.</p>
          ) : null}
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
