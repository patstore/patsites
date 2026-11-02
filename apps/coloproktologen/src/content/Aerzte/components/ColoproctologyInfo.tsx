import settings from '@settings'
import { ContentContainer, FlexBox } from '@ui'
import React from 'react'

const ColoproctologyInfo: React.FC = () => {
  return (
    <ContentContainer smallBackground={settings.colors.light} padding borderRadius>
        <FlexBox direction="column" gap={settings.sizes.medium}>
            <h3>
                Information für Mitglieder von BCD
            </h3>
            <p>
                Liebe Mitglieder des BCD/DGK,
            </p>
            <p>
                wie Sie bereits wissen, erhalten seit 2026 alle Mitglieder die Zeitschrift Coloproctology kostenfrei als Printausgabe.
            </p>
            <p>
                Ergänzend dazu möchten wir Sie herzlich einladen, sich auf springermedizin.de für den Online-Zugang zu registrieren. So haben Sie die Möglichkeit, alle Ausgaben von Coloproctology digital zu lesen, CME-Fortbildungen zu absolvieren sowie aktuelle Verbandsinformationen bequem online abzurufen.

            </p>
            <p>
            Zur Registrierung gelangen Sie über folgenden Link: <br />
            <a href="https://www.springermedizin.de/coloproctology/7925988?utm_medium=gesellschaftswebsite&utm_source=bcd&utm_campaign=regmar_society" target="_blank" rel="noreferrer">
                springermedizin.de
            </a>

            </p>
        </FlexBox>
    </ContentContainer>
  )
}

export default ColoproctologyInfo