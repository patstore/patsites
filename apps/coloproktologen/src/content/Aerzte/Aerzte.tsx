import { Layout } from "@components";
import { HeadContent } from "@ui";
import React from "react";
import { Events, Manual, Hygiene, Guidelines, Membership, Wundpflege } from "./components";
import ColoproctologyInfo from "./components/ColoproctologyInfo";

const Aerzte: React.FC = () => {
  return (
    <Layout>
      <HeadContent
        title="Für Ärzte"
        description="Veranstaltungen und Informationen"
        content={
          <>
            <p>
              Die Koloproktologie beschäftigt sich speziell mit den Erkrankungen
              des Dickdarms, insbesondere mit den Erkrankungen des letzten
              Abschnitts des Darmes, des sog. Enddarms. Dieser umfasst den
              Mastdarm und den Afterkanal mit dem Schließmuskelapparat.
            </p>
            <p>
              Als interdisziplinäres Fachgebiet hat die moderne Proktologie
              Berührungspunkte mit vielen Fachrichtungen, vor allem Chirurgie,
              Dermatologie und Gastroenterologie. Wachsende Anforderungen im
              Zuge von Innovation und Wandel prägen ihre Zukunft als Fachbereich
              mit vielen Möglichkeiten (Systemfach).
            </p>
          </>
        }
        image="/images/dvarg_AdobeStock_200890368_b_xxl.jpg"
        isInline
      />
      <ColoproctologyInfo />
      <Events />
      <Manual />
      <Hygiene />
      <Guidelines />
      <Wundpflege />
      <Membership />
    </Layout>
  );
};

export default Aerzte;
