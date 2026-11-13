import React from "react";
import "./styles.scss";
import { Layout, RenderContent } from "@components";
import { Divider, FlexBox, FullButton, HeadContent } from "@ui";
import { useCollection } from "@provider";
import styles from "./Mitgliedschaft.module.css";

const Mitgliedschaft: React.FC = () => {
  const { items: webpages } = useCollection("Webpage");
  const webpage = webpages.find((page) => page?.path?.includes("/mitgliedschaft"));
  const { items: downloads } = useCollection("Download");

  const mitgliedsAntrag = downloads.find(
    (download: any) => download.title === "Mitgliedsantrag",
  );

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          titel={webpage?.title || ""}
          titeltext={webpage?.subtitle || ""}
        />
        <div className="site-container">
          <FlexBox
            direction="row"
            align="flex-start"
            justify="space-between"
            gap="12px"
            hasFullWidth
            changeToColumn
          >
            <div className={styles.column}>
              <h2>Online-Anmeldung</h2>
              <p className={styles.lead}>
                Melden Sie sich einfach über unser Online-Portal an.
              </p>
              <a
                target="__blank"
                href="https://tvstg.pw-ng.de/Frontend/Home/NewMember"
              >
                <FullButton
                  onClick={() => null}
                  text="Online anmelden"
                  color="dark"
                />
              </a>
            </div>

            <div className={styles.column}>
              <h2>Mitgliedsantrag</h2>
              <div className={styles.download}>
                <a
                  href={mitgliedsAntrag?.file?.url || ""}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.plainLink}
                >
                  <FullButton
                    text="Mitgliedsantrag herunterladen"
                    color="dark"
                    onClick={() => null}
                  />
                </a>
              </div>
            </div>
          </FlexBox>
          <Divider />
          <FlexBox direction="column" align="stretch" justify="space-between">
            <RenderContent path="/mitgliedschaft" />
            <FlexBox
              className={styles.notes}
              direction="column"
              align="flex-start"
              justify="center"
            >
              <p>Die Beiträge werden jeweils jährlich im Voraus abgebucht.</p>
              <p>
                * Ab dem Kalenderjahr nach Vollendung des 18. Lebensjahres gilt
                der Beitragssatz für Erwachsene. Bei Vorlage einer aktuellen
                Schul- oder Hochschulbescheinigung wird bis einschließlich 25
                Jahre ein ermäßigter Beitrag gewährt. Diese Bescheinigung ist zu
                Beginn jedes Kalenderjahres erneut einzureichen. Ab dem 26.
                Lebensjahr gilt automatisch der Erwachsenenbeitrag.
              </p>
              <p>
                ** Der Familienbeitrag setzt voraus, dass bereits eine Person
                aus der Familie Mitglied im Turnverein Freiburg-St. Georgen ist.
              </p>
              <p>
                *** Eventuelle Zusatzbeiträge einzelner Abteilungen erhöhen den
                Familienbeitrag (siehe Abteilungsbeitrag).
              </p>
              <p>**** Hier entfällt die Aufnahmegebühr.</p>
              <p>
                Weitere Informationen entnehmen Sie bitte dem Aufnahmeantrag
                oder fragen Sie den/die Abteilungsleiter:in oder bei der
                Geschäftsstelle des TV Freiburg – St. Georgen
                <br />
                Tel.: 0761 46732, E-Mail:{" "}
                <a href="mailto:info@tvstg.de">info@tvstg.de</a>
              </p>
            </FlexBox>
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};
export default Mitgliedschaft;
