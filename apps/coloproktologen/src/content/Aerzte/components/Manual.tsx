import staticAsset0 from "../images/manual_1_2.webp";
import settings from "@settings";
import { buttonsContainer } from "@styles";
import { AppImage, Button, ContentContainer, FlexBox } from "@ui";
import React from "react";

const Manual: React.FC = () => {
  return (
    <ContentContainer
      largeBackground={settings.colors.lightgrey}
      id="manual-der-koloproktologie"
    >
      <FlexBox
        direction="row"
        align="center"
        justify="space-between"
        gap={settings.sizes.large}
        hasFullWidth
        changeToColumn
      >
        <div css={{ flex: "1 1 50%" }}>
          <h2>Manual der Koloproktologie Teil I und II</h2>
          <p css={{ color: settings.colors.primary }}>
            Kostenloser Download - 2. Auflage
          </p>
          <p>
            Das neue praxisorientierte Standardwerk der Deutschen Gesellschaft
            für Koloproktologie ist endlich erschienen. Die zwei Bände stehen
            unter den Bedingungen des Open Access für jedermann frei nutzbar zur
            Verfügung.
          </p>
          <div css={buttonsContainer}>
            <Button
              text="Manual 1"
              background={settings.colors.primary}
              color={settings.colors.white}
              externalLink="https://www.degruyterbrill.com/document/doi/10.1515/9783111331270/html"
            />
            <Button
              text="Manual 2"
              background={settings.colors.primary}
              color={settings.colors.white}
              externalLink="https://www.degruyterbrill.com/document/doi/10.1515/9783111253237/html"
            />
          </div>
        </div>
        <div
          css={{
            flex: "1 1 50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppImage
            src={staticAsset0}
            alt="Manual"
            css={{
              maxWidth: "300px",
            }}
          />
        </div>
      </FlexBox>
    </ContentContainer>
  );
};

export default Manual;
