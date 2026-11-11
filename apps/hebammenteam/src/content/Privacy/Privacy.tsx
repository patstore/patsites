import { CmsBody, Layout } from "@components";
import { useFindWebpage } from "@provider";
import styles from "./Privacy.module.css";

const Privacy = () => {
  const page = useFindWebpage({ path: ["/datenschutz", "/datenschutzerklaerung"] });

  return (
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.title}>Datenschutz</h1>
      </header>
      {page ? (
        <CmsBody page={page} />
      ) : (
        <div className={styles.prose}>
          <p>
            Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist die
            betreibende Praxis. Die konkreten Kontaktdaten stehen im Impressum.
          </p>
          <h2>Beim Besuch der Website</h2>
          <p>
            Der Server verarbeitet die technisch erforderlichen Verbindungsdaten, um die Seite
            auszuliefern und den Betrieb abzusichern. Rechtsgrundlage ist das berechtigte Interesse
            an einem funktionierenden Angebot (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <h2>Kontaktformular</h2>
          <p>
            Name, E-Mail-Adresse und Nachricht verwenden wir, um die Anfrage zu beantworten.
            Rechtsgrundlage ist die Anbahnung oder Durchführung der Betreuung (Art. 6 Abs. 1 lit. b
            DSGVO) oder unser berechtigtes Interesse an der Kommunikation (Art. 6 Abs. 1 lit. f
            DSGVO).
          </p>
          <h2>Ihre Rechte</h2>
          <ul>
            <li>Auskunft, Berichtigung und Löschung</li>
            <li>Einschränkung der Verarbeitung und Datenübertragbarkeit</li>
            <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO</li>
            <li>Beschwerde bei einer Datenschutzaufsichtsbehörde</li>
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default Privacy;
