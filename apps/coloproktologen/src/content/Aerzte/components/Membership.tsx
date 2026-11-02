import staticAsset0 from "../images/Flyer_Mitgliedschaft_1-2026.png";
import settings from "@settings";
import { buttonsContainer, contentBox, highlightText, topline } from "@styles";
import { AppImage, Button, ContentContainer, FlexBox } from "@ui";
import React from "react";

const Membership: React.FC = () => {
    return (
        <ContentContainer id="mitglied-werden">
            <FlexBox direction="column"
                align="center"
                justify="center"
                hasFullWidth>
                <div css={topline}>Mitgliedschaft</div>
                <h2 css={{ textAlign: "center" }}>
                    Mitglied werden und zu den Spezialisten gehören !
                </h2>
                <p css={highlightText}>
                    Unsere Arbeit ist unsere Leidenschaft und ein positiver Antrieb für
                    jeden neuen Tag.
                </p>
            </FlexBox>
            <FlexBox
                direction="row"
                align="stretch"
                gap={settings.sizes.large}
                hasFullWidth
                changeToColumn
            >
                <div css={contentBox()}>
                    <FlexBox
                        direction="row"
                        align="center"
                        justify="space-between"
                        gap={settings.sizes.large}
                        hasFullWidth
                        changeToColumn
                    >
                        <div>
                            <h3>Mitglied werden</h3>
                            <p css={{ maxWidth: "480px !important" }}>
                                Werden auch Sie Teil eines starken Verbandes mit über 550
                                spezialisierten Ärzten und nutzen Sie den fachlichen
                                Erfahrungsaustausch und Dialog. Ihre Mitgliedschaft sichert
                                Patienten, Kollegen und Kostenträgern den höchsten Standard
                                koloproktologischer Diagnostik und Therapie.
                            </p>
                            <div css={buttonsContainer}>
                                <Button
                                    text="Aufnahmeantrag"
                                    background={settings.colors.primary}
                                    color={settings.colors.white}
                                    size="large"
                                    externalLink="https://www.coloproktologen.de/public/pdf/Aufnahmeantrag_BCD.pdf"
                                />
                            </div>
                        </div>
                        <FlexBox
                            direction="row"
                            align="flex-end"
                            justify="flex-end"
                            styles={{ flex: "1 1 50%" }}
                        >
                            <a href="/Flyer_Mitgliedschaft_BCD.pdf" target="_blank">
                                <AppImage
                                    src={staticAsset0} alt="BCD Flyer"
                                    width={240}
                                    css={{
                                        borderRadius: settings.borderRadius.large
                                    }}
                                />
                            </a>
                        </FlexBox>
                    </FlexBox>
                </div>
            </FlexBox>
        </ContentContainer>
    );
};

export default Membership;
