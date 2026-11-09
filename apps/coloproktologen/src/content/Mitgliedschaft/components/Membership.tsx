import staticAsset0 from "../images/Flyer_Mitgliedschaft_1-2026.png";
import settings from "@settings";
import { buttonsContainer, contentBox } from "@styles";
import { AppImage, Button, ContentContainer, Divider, FlexBox, SmallContentElement } from "@ui";
import React from "react";
import services from "../constants/services";

const Membership: React.FC = () => {
    const downloadUrl = (filename: string) => `/${filename}`;
    return (
        <>
            <ContentContainer id="mitglied-werden" largeBackground={settings.colors.light}>
                <FlexBox
                    direction="row"
                    align="stretch"
                    gap={settings.sizes.large}
                    hasFullWidth
                    changeToColumn
                >
                    <FlexBox
                        direction="row"
                        align="center"
                        justify="space-between"
                        gap={settings.sizes.large}
                        hasFullWidth
                        changeToColumn
                    >
                        <div css={[contentBox(), {backgroundColor: settings.colors.white}]}>
                            <h3>Ihre Mitgliedschaft beim BCD</h3>
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
                                    externalLink="/Aufnahmeantrag_BCD.pdf"
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
                </FlexBox>
                </ContentContainer>
                <ContentContainer >
                <FlexBox direction="column"
                    align="center"
                    justify="center"
                    hasFullWidth>
                    <h2 css={{ textAlign: "center" }}>
                        Profitieren Sie <br /> von unseren Leistungen!
                    </h2>
                </FlexBox>
                <FlexBox
                    direction="row"
                    align="stretch"
                    gap={settings.sizes.large}
                    hasFullWidth
                    changeToColumn
                    wrap
                >
                    {services.map((service) => (
                        <SmallContentElement
                            title={service.title}
                            text={service.text}
                            buttonText={service.files ? "Dokumente und Downloads" : undefined}
                            flex={["1 1 100%", "1 1 100%", "1 1 30%"]}
                            noTextBreak
                            key={service.title}
                            content={ service.files ? (
                                <div>
                                    <h4>Downloads</h4>
                                    <p>
                                        Hier finden Sie die Downloads für die {service.title}.
                                    </p>
                                    <ul>

                                        {service.files?.map((file) => (
                                            <li>
                                                <a href={downloadUrl(file)} target="_blank">
                                                    {file}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : undefined}
                        />
                    ))}
                </FlexBox>
            </ContentContainer>
        </>
    );
};

export default Membership;
