import staticAsset0 from "../images/congress.jpg";
import settings from "@settings";
import { buttonsContainer, contentBox, headlineContainer } from "@styles";
import { AppImage, Button, ContentContainer, FlexBox } from "@ui";
import React from "react";

const Dgk: React.FC = () => {
  return (
    <>
      <ContentContainer
        id="kooperation"
        largeBackground={settings.colors.lightgrey}
      >
        <FlexBox
          direction="row"
          align="stretch"
          justify="space-between"
          gap={settings.sizes.large}
          hasFullWidth
          changeToColumn
        >
          <div css={headlineContainer}>
            <h2>Zusammenarbeit mit der DGK</h2>
            <p>
              Wir sind eng verbunden mit der
              <strong>
                <em>Dt. Gesellschaft für Koloproktologie, </em>
              </strong>
              der wissenschaftlichen Gesellschaft unseres Fachgebietes. Zwei
              Organisationen, die gemeinsame Werte und Ziele teilen. <br /> 1991
              gegründet, beschäftigt sie sich interdisziplinär mit allen auf dem
              Gebiet der Koloproktologie auftretenden Erkrankungen, insbesondere
              deren Diagnostik und Therapie.
            </p>
          </div>
        </FlexBox>
        <FlexBox
          direction="row"
          align="stretch"
          justify="space-between"
          gap={settings.sizes.large}
          hasFullWidth
          changeToColumn
        >
          <div css={contentBox()}>
            <p>
              Als Kooperationspartner ist der BCD Mitveranstalter der jährlich
              stattfindenden, größten wissenschaftlichen Veranstaltung, dem{" "}
              <a href="http://koloproktologen-kongress.de/">
                Deutschen Koloproktologenkongress
              </a>
              . Im Rahmen dieses Kongresses bietet der BCD den
              Koloproktologischen Grundkurs, den Aufbaukurs zu Einzelthemen und
              ein - für Mitglieder kostenloses - berufspolitisches Seminar an.
              Darüber hinaus unterstützen wir gemeinsam mit der DGK viele
              Veranstaltungen im deutschsprachigen Raum.
            </p>
            <div>
              <Button
                text="Deutsche Gesellschaft für Koloproktologie"
                background={settings.colors.primary}
                color={settings.colors.white}
                size="medium"
                externalLink="https://www.koloproktologie.org/"
              />
              <Button
                text="Kongressrückblick"
                background={settings.colors.primary}
                color={settings.colors.white}
                size="medium"
                internalLink="/kongressrueckblicke"
              />
            </div>
          </div>
          <div css={[contentBox(), { padding: "0 !important" }]}>
            <AppImage
              src={staticAsset0} alt="Congress"
              objectFit="cover"
              css={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </FlexBox>
      </ContentContainer>
      {/* <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <h2>
                        Mitgliederbereich
                    </h2>
                </div>
            </ContentContainer> */}
    </>
  );
};

export default Dgk;
