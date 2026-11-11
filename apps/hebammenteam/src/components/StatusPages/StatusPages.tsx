import { ErrorComponentProps, Link, useRouter } from "@tanstack/react-router";
import { Layout } from "../Layout";
import styles from "./StatusPages.module.css";

export const NotFound = () => (
  <Layout>
    <div className={styles.page}>
      <h1>Seite nicht gefunden</h1>
      <p>Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
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
      <div className={styles.page}>
        <h1>Etwas ist schiefgelaufen</h1>
        <p>Die Inhalte konnten gerade nicht geladen werden. Bitte versuchen Sie es gleich noch einmal.</p>
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
