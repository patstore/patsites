import settings from "@settings";
import { buttonsContainer } from "@styles";
import { Button, ContentContainer } from "@ui";
import React from "react";

const FirstContent: React.FC = () => {
  return (
    <ContentContainer largeBackground={settings.colors.light} id="fortbildung">
      <h2>Vom Facharzt zum Proktologen</h2>
      <p>
        Enddarmbeschwerden - mehr als 25 Prozent der Bevölkerung in Deutschland
        leiden darunter. Ansprechpartner Nummer 1 ist der Koloproktologe, der
        sich um anale Erkrankungen wie das Hämorrhoidalleiden, aber auch um
        entzündliche und bösartige Erkrankungen des Enddarms und des Dickdarms
        kümmert.
      </p>
      <p>
        Als Standesvertretung der koloproktologisch arbeitenden Fachärzte
        streben wir daher eine möglichst breite und qualifizierte Betreuung der
        betroffenen Patienten an. Die Proktologie wurde 2004 dank den Bemühungen
        des BCDs als eigenständiges Fach anerkannt und - einmalig in Europa -
        als Zusatzbezeichnung in die Weiterbildung der Länder aufgenommen. Mit
        dieser Entscheidung hat die Ärzteschaft die Eigenständigkeit des Faches
        anerkannt und der qualitativ hochwertigen Versorgung proktologischer
        Patienten einen besonderen Stellenwert zuerkannt.
      </p>
      <div css={buttonsContainer}>
        <Button
          text="Zusatzbezeichnung Proktologie"
          background={settings.colors.primary}
          color={settings.colors.white}
          internalLink="#zusatzbezeichnung"
        />
        <Button
          text="Koloproktologischer Grundkurs"
          background={settings.colors.primary}
          color={settings.colors.white}
          internalLink="#koloproktologischer-grundkurs"
        />
      </div>
    </ContentContainer>
  );
};

export default FirstContent;
