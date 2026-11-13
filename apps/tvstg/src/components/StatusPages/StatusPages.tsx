import React from "react";
import { ErrorComponentProps, Link, useRouter } from "@tanstack/react-router";
import { FullButton, HeadContent } from "@ui";
import { Layout } from "../Layout";

export const NotFound: React.FC = () => (
  <Layout>
    <div className="wrapper">
      <HeadContent
        titel="Seite nicht gefunden"
        titeltext="Die angeforderte Seite existiert nicht oder wurde verschoben."
      />
      <div className="site-container">
        <Link to="/">Zur Startseite</Link>
      </div>
    </div>
  </Layout>
);

export const RouteError: React.FC<ErrorComponentProps> = ({ error, reset }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          titel="Etwas ist schiefgelaufen"
          titeltext="Die Inhalte konnten gerade nicht geladen werden. Bitte versuche es gleich noch einmal."
        />
        <div className="site-container">
          {import.meta.env.DEV && (
            <pre>{error instanceof Error ? error.message : String(error)}</pre>
          )}
          <FullButton
            text="Erneut versuchen"
            color="dark"
            onClick={() => {
              reset();
              router.invalidate();
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
