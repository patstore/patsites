import settings from "@settings";
import { contentBox } from "@styles";
import { Button, ContentContainer, FlexBox } from "@ui";
import React from "react";

const Statute: React.FC = () => {
    return (
        <ContentContainer id="satzung" largeBackground={settings.colors.light}>
            <FlexBox
                direction="row"
                align="stretch"
                justify="space-between"
                gap={settings.sizes.large}
                hasFullWidth
            >
                <div css={[contentBox(), { backgroundColor: settings.colors.white }]}>
                    <h3>Satzung</h3>
                    <h4>Wesentliche Grundlagen</h4>
                    <p>
                        Der BCD wurde am 23.01.1979 gegründet. Ziel ist der Zusammenschluss
                        und die Wahrnehmung der beruflichen und wirtschaftlichen Belange der
                        Mitglieder. Stand 14.03.2025
                    </p>
                    <Button
                        text="Satzung"
                        background={settings.colors.primary}
                        color={settings.colors.white}
                        size="medium"
                        externalLink="/BCD-Satzung.pdf"
                    />
                </div>
                <div css={[contentBox(), { backgroundColor: settings.colors.white }]}>
                    <h3>Beitragsordnung</h3>
                    <h4>Wesentliche Grundlagen</h4>
                    <p>
                        Beitragsverpflichtungen und Gebühren für Mitglieder. Die
                        Mitgliederversammlung beschließt gemäß § 10d der Satzung Höhe und
                        Fälligkeit der Beträge.
                    </p>
                    <Button
                        text="Beitragsordnung"
                        background={settings.colors.primary}
                        color={settings.colors.white}
                        size="medium"
                        externalLink="/BCD_Beitragsordnung_ab_01_01_2026.pdf"
                    />
                </div>
            </FlexBox>
        </ContentContainer>
    );
};

export default Statute;
