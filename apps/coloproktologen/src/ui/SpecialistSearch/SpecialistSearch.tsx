import { navigate } from "@router";
import settings from "@settings";
import { buttonsContainer, contentBox } from "@styles";
import { Button, ContentContainer, Divider, FlexBox } from "@ui";
import React from "react";

const SpecialistSearch: React.FC = () => {
    return (
        <ContentContainer id="spezialistensuche">
            <FlexBox
                direction="column"
                align="center"
                justify="space-between"
                gap="30px"
                hasFullWidth
            >
                <div>
                    <h2 css={{ textAlign: "center" }}>Spezialistensuche</h2>
                    <Divider />
                    <p css={{ textAlign: "center" }}>
                        Sie suchen End- und Dickdarmspezialisten in Ihrer Nähe? Mit unserer
                        Umkreissuche finden Sie Proktologen und Koloproktologen in Ihrer
                        Umgebung.
                    </p>
                </div>
                <FlexBox
                    direction="row"
                    align="stretch"
                    justify="space-between"
                    gap={settings.sizes.large}
                    hasFullWidth
                    changeToColumn
                >
                    <div css={contentBox()}>
                        <FlexBox
                            direction="column"
                            align="flex-start"
                            justify="space-between"
                            hasFullWidth
                            styles={{ height: "100%" }}
                        >
                            <h3>Spezialisten finden per Postleitzahl</h3>
                            <p>
                                Um Spezialisten in der Nähe Ihres Wohnortes zu finden, geben Sie
                                Ihre Postleitzahl ein und tippen dann auf „PLZ senden“.
                            </p>
                            <form
                                css={buttonsContainer}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target as HTMLFormElement);
                                    const plz = formData.get("plz") as string;
                                    navigate(`/spezialistensuche?plz=${plz}`);
                                }}
                            >
                                <input
                                    css={{ width: "240px" }}
                                    type="number"
                                    min={10000}
                                    max={99999}
                                    step={1}
                                    name="plz"
                                    id="plz"
                                    placeholder="Postleitzahl"
                                />
                                <Button
                                    text="PLZ senden"
                                    type="submit"
                                    background={settings.colors.primary}
                                    color={settings.colors.white}
                                />
                            </form>
                        </FlexBox>
                    </div>
                    <div css={contentBox()}>
                        {/* <BiCurrentLocation size={36} /> */}
                        <FlexBox
                            direction="column"
                            align="flex-start"
                            justify="space-between"
                            hasFullWidth
                            styles={{ height: "100%" }}
                        >
                            <div>
                                <h3>Standort übermitteln</h3>
                                <p>
                                    Um Spezialisten im Umkreis Ihres Standortes zu finden, tippen
                                    Sie einfach auf &quot;Standort übermitteln&quot;.
                                </p>
                            </div>
                            <div css={buttonsContainer}>
                                <Button
                                    text="Standort übermitteln"
                                    background={settings.colors.primary}
                                    color={settings.colors.white}
                                    internalLink={`/spezialistensuche?standort=true`}
                                />
                            </div>
                        </FlexBox>
                    </div>
                </FlexBox>
            </FlexBox>
        </ContentContainer>
    );
};

export default SpecialistSearch;
