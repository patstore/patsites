import { Link } from "@router";
import React from "react";
import settings from "@settings";
import { Button, ContentContainer, FlexBox } from "@ui";
import { footerContainer, footerLinksTwo } from "./styles";
import { BsLinkedin } from "react-icons/bs";

const FooterTwo: React.FC<{ isUserProfile?: boolean }> = ({
  isUserProfile = false,
}) => {
  if (isUserProfile) {
    return (
      <ContentContainer
        // noPaddingTop
        largeBackground={settings.colors.primary}
      >
        <FlexBox
          direction="row"
          align="center"
          justify="flex-start"
          wrap
          styles={{
            width: "100%",
            position: "relative",
            p: { margin: "0 0.4em" },
            overflow: "hidden",
          }}
        >
          <span css={footerLinksTwo}>
            <Link to="/datenschutzerklaerung">Datenschutz</Link> {" / "}
            <Link to="/impressum">Impressum</Link>
          </span>
        </FlexBox>
      </ContentContainer>
    );
  }

  return (
    <>
      <div css={{ position: "relative" }}>
        <ContentContainer largeBackground={settings.colors.white}>
          <FlexBox
            direction="column"
            align="center"
            justify="center"
            hasFullWidth
          >
            <h2>Mitglied werden</h2>
            <p css={{ textAlign: "center" }}>
              Werden Sie Mitglied im Berufsverband Coloproktologie Deutschland
              e.V. (BCD) und profitieren Sie von den Vorteilen des BCD.
            </p>
            <Button text="Mitglied werden" internalLink="/mitgliedschaft" />
          </FlexBox>
        </ContentContainer>
        <ContentContainer largeBackground={settings.colors.light}>
          <footer css={footerContainer}>
            <FlexBox hasFullWidth>
              <div
                css={settings.mq({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  gap: "30px",
                })}
              >
                <div css={{ flex: 1, minWidth: "300px" }}>
                  <h4>Berufsverband Coloproktologie Deutschland e.V. (BCD)</h4>
                  <p>
                    Maienstraße 3 <br />
                    79102 Freiburg
                  </p>
                  <p>
                    Telefon:{" "}
                    <a href="tel:+4972170438113">+49 (0)761 70 438 - 113</a>
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:info@coloproktologen.de">
                      info@coloproktologen.de
                    </a>
                  </p>
                  <a href="https://www.linkedin.com/company/berufsverband-coloproktologie-deutschland" target="_blank">
                    <BsLinkedin size={20} />
                  </a>

                </div>
                <div css={{ flex: 1 }}>
                  <h4>Öffnungszeiten</h4>
                  <p>
                    Persönlich erreichen Sie uns dienstags, mittwochs und
                    donnerstags von 10.00 bis 13.00 Uhr.
                  </p>
                </div>
                <div css={{ flex: 1 }}>
                  <h4>Auf dieser Seite</h4>
                  <Link to="/aerzte">Für Ärzte</Link> <br />
                  <Link to="/patienten">Für Patienten</Link> <br />
                  <Link to="/bcd">Der BCD</Link> <br />
                  <Link to="/fortbildung">Fortbildung</Link> <br />
                  <Link to="/mitgliedschaft">Mitgliedschaft</Link> <br />
                  <Link to="/login">Login</Link> <br />
                  <Link to="/spezialistensuche">Spezialistensuche</Link>{" "}
                </div>
              </div>
            </FlexBox>
          </footer>
        </ContentContainer>
        <ContentContainer
          largeBackground={settings.colors.primary}
          styles={{ padding: "12px 0" }}
        >
          <FlexBox
            direction="row"
            styles={{ marginTop: 0, padding: "0" }}
            gap="30px"
          >
            <FlexBox
              direction="row"
              justify="flex-start"
              wrap
              styles={{
                backgroundColor: settings.colors.primary,
                width: "100%",
                position: "relative",
                p: { margin: "0 0.4em" },
                overflow: "hidden",
              }}
            >
              <span css={footerLinksTwo}>
                <Link to="/datenschutzerklaerung">Datenschutz</Link> /{" "}
                <Link to="/impressum">Impressum</Link>
              </span>
            </FlexBox>
          </FlexBox>
        </ContentContainer>
      </div>
    </>
  );
};

export default FooterTwo;
