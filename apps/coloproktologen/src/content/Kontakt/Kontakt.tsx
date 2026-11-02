import { Layout } from "@components";
import settings from "@settings";
import { ContentContainer, FlexBox, HeadContent } from "@ui";
import React from "react";
import { highlightContent } from "@styles";

const Kontakt: React.FC = () => {
  return (
    <Layout>
      <HeadContent title="Kontakt" isInline />
      <ContentContainer noPaddingTop>
        <FlexBox
          direction="row"
          align="flex-start"
          gap={settings.sizes.extraLarge}
          hasFullWidth
          changeToColumn
        >
          <div>
            <h2> Geschäftsstelle </h2>
            <p css={{ color: settings.colors.primary }}>
              Für Anfragen und Anliegen zur Mitgliedschaft
            </p>
            <p>
              Maienstr. 3<br /> 79102 Freiburg i. Br.
            </p>
            <p>
              Persönlich erreichen Sie uns Di., Mi. und Do. von 10:00 - 13:00
              Uhr.
              <br /> Telefon: +49 (0)761 70 438 - 113
              <br /> Email: info@koloproktologie.org
              <br /> Internet: www.koloproktologie.org
            </p>
          </div>
          <div>
            <h2>Kongress-Sekretariat</h2>
            <p css={{ color: settings.colors.primary }}>
              Für Anfragen und Anliegen zum Koloproktologen Kongress
            </p>
            <p>
              MCN <br /> Medizinische Congressorganisation Nürnberg GmbH
              <br /> Neuwieder Str. 9<br /> 90411 Nürnberg
              <br /> Fon: +49 (0)911 - 39316-16
              <br /> Fax: +49 (0)911 - 39316-56
              <br /> Email: veith@mcn-nuernberg.de
              <br /> Internet: www.koloproktologen-kongress.de/kontakt.php
            </p>
          </div>
        </FlexBox>
      </ContentContainer>
    </Layout>
  );
};

export default Kontakt;
