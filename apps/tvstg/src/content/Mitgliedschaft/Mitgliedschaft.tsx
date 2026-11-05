import React from "react";
import settings from "@settings";
import "./styles.scss";
import { Layout, RenderContent } from "@components";
import { Divider, FlexBox, FullButton, HeadContent } from "@ui";
import { siteContainer, wrapper } from "@styles";
import { useFindWebpage, useGetDownload } from "@provider";

const Mitgliedschaft: React.FC = () => {
  const webpage = useFindWebpage({ path: "/mitgliedschaft" });
  const { downloads } = useGetDownload();

  const mitgliedsAntrag = downloads.find(
    (download: any) => download.title === "Mitgliedsantrag",
  );

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          titel={webpage?.title || ""}
          titeltext={webpage?.subtitle || ""}
        />
        <div css={siteContainer}>
          <FlexBox
            direction="row"
            align="flex-start"
            justify="space-between"
            gap={settings.sizes.medium}
            hasFullWidth
            changeToColumn
          >
            <div css={{ flex: "1 1 50%" }}>
              <h2>Online-Anmeldung</h2>
              <p css={{ fontWeight: 600 }}>
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

            <div css={{ flex: "1 1 50%" }}>
              <h2>Mitgliedsantrag</h2>
              <div
                css={settings.mq({
                  padding: ["2em 2em", "2em 2em", "2em 2em", "2em 0", "2em 0"],
                })}
              >
                <a
                  href={mitgliedsAntrag?.file?.url || ""}
                  target="_blank"
                  rel="noreferrer"
                  css={{ textDecoration: "none" }}
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
              direction="column"
              align="flex-start"
              justify="center"
              styles={{
                width: "100%",
                padding: ["2em 2em", "2em 2em", "2em 2em", "2em 0", "2em 0"],
              }}
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
