import settings from "@settings";
import { buttonsContainer } from "@styles";
import { Button, ContentContainer, FlexBox } from "@ui";
import React from "react";

const Coloproctology: React.FC = () => {
    return (
        <ContentContainer
            id="koloproktologie"
            largeBackground={settings.colors.light}
        >
            <FlexBox
                direction="row"
                align="stretch"
                justify="space-between"
                gap={settings.sizes.medium}
                changeToColumn
                hasFullWidth
            >
                <div>
                    <h2>Koloproktologie</h2>
                    <p>
                        Enddarmbeschwerden - mehr als 25 Prozent der Bevölkerung in
                        Deutschland leiden darunter. Ansprechpartner Nummer 1 ist der
                        Koloproktologe, der sich um anale Erkrankungen wie das
                        Hämorrhoidalleiden, aber auch um entzündliche und bösartige
                        Erkrankungen des Enddarms und des Dickdarms kümmert.
                    </p>
                    <p>
                        Eine rechtzeitige Diagnose ist ein wichtiger Schritt zur wirksamen
                        Behandlung der Erkrankungen. Unsere Mitglieder beschäftigen sich
                        speziell mit den Erkrankungen des Dickdarms, insbesondere mit den
                        Erkrankungen des letzten Abschnitts des Darmes, des sog. Enddarms.
                        Er umfasst den Mastdarm und den Afterkanal mit dem
                        Schließmuskelapparat.
                    </p>
                    <div css={buttonsContainer}>
                        <Button
                            text="Zur Spezialistensuche"
                            internalLink="/spezialistensuche"
                        />
                    </div>
                </div>
            </FlexBox>
        </ContentContainer>
    );
};

export default Coloproctology;
