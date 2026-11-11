import { ErrorComponentProps, Link, useRouter } from "@tanstack/react-router";
import { Layout } from "../Layout";
import { PageHeader } from "../PageHeader";
import styles from "./StatusPages.module.css";

export const NotFound = () => (
  <Layout>
    <PageHeader
      eyebrow="Hinweis"
      title="Seite nicht gefunden"
      lead="Die angeforderte Seite existiert nicht oder wurde verschoben."
    />
    <div className={styles.page}>
      <div className={styles.actions}>
        <Link to="/" className={styles.link}>
          Zur Startseite
        </Link>
      </div>
    </div>
  </Layout>
);

export const RouteError = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <Layout>
      <PageHeader
        eyebrow="Hinweis"
        title="Etwas ist schiefgelaufen"
        lead="Die Inhalte konnten gerade nicht geladen werden. Bitte versuchen Sie es gleich noch einmal."
      />
      <div className={styles.page}>
        {import.meta.env.DEV ? (
          <pre>{error instanceof Error ? error.message : String(error)}</pre>
        ) : null}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.link}
            onClick={() => {
              reset();
              void router.invalidate();
            }}
          >
            Erneut versuchen
          </button>
          <Link to="/" className={`${styles.link} ${styles.secondary}`}>
            Zur Startseite
          </Link>
        </div>
      </div>
    </Layout>
  );
};
