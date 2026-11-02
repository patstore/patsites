import settings from "@settings";
import { highlightText } from "@styles";
import { Button, FlexBox } from "@ui";
import React from "react";

const ColoproctologyHeadContent: React.FC = () => {
    return (
        <div>
            <p css={highlightText}>
                Die interdisziplinäre deutschsprachige Zeitschrift ist für alle
                proktologisch tätigen Ärzte zur Fort- und Weiterbildung
                unentbehrlich.
            </p>
            <p css={highlightText}>
                Das Kernstück jeder Ausgabe sind praxisorientierte
                Übersichtsarbeiten zu einem aktuellen Schwerpunktthema. Neben
                der Vermittlung von praktischen Hintergrundwissen erhält der
                Leser zudem konkrete Handlungsempfehlungen.
            </p>
            <p css={highlightText}>
                Frei eingereichte Originalien ermöglichen die Präsentation
                wichtiger klinischer Studien und dienen dem wissenschaftlichen
                Austausch.
            </p>
            <FlexBox
                direction="row"
                gap={settings.sizes.medium}
            >
                <div>
                    <Button
                        size="large"
                        text="Übersicht"
                        externalLink="https://www.springermedizin.de/coloproctology/7925988"
                    />
                </div>
                <div>
                    <Button
                        size="large"
                        text="Alle Ausgaben"
                        externalLink="https://www.springermedizin.de/archive/journal/53"
                    />
                </div>
            </FlexBox>
        </div>
    );
};

export default ColoproctologyHeadContent;
