import { highlightText } from "@styles";
import { ContentContainer, FlexBox, MultiContentDisplay } from "@ui";
import React from "react";
import additional_title from "../constants/additional_title";
import settings from "@settings";

const AdditionalTitle = () => {
    return (
        <ContentContainer id="zusatzbezeichnung">
            <FlexBox
                direction="row"
                align="stretch"
                justify="space-between"
                gap={settings.sizes.large}
                hasFullWidth
                changeToColumn
            >
                <div css={{ flex: "1 1 50%" }}>
                    <h2>Zusatzbezeichnung Proktologie</h2>
                    <p css={highlightText}>Vom Facharzt zum Proktologen</p>
                    <p>
                        Das Führen der Zusatzbezeichnung „Proktologie“ bescheinigt eine über
                        die fachärztliche Weiterbildung hinausgehende Spezialisierung.
                        Voraussetzung ist eine mindestens einjährige Weiterbildung bei einem
                        Weiterbildungsbefugten und eine mündliche Prüfung vor der
                        Landesärztekammer.
                    </p>
                </div>
                <div css={{ flex: "1 1 50%" }}></div>
            </FlexBox>
            <MultiContentDisplay content={additional_title} />
        </ContentContainer>
    );
};

export default AdditionalTitle;
