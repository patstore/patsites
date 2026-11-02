import staticAsset0 from "../images/bsd_header.jpg";
import settings from "@settings";
import { highlightText } from "@styles";
import { AppImage, Button, ContentContainer, Divider, TextContentElement } from "@ui";
import React from "react";

const BSD: React.FC = () => {
    return (
        <ContentContainer styles={{ color: settings.colors.white, paddingTop: "120px", paddingBottom: "120px" }}>
            <AppImage
                src={staticAsset0}
                alt="BSD Header"
                objectFit="cover"
                css={{
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    objectFit: "cover",
                    position: "absolute"
                }}
            />
            <div
                css={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
            />
            <TextContentElement title="Kooperationspartner BCD">
                <div>
                    <p css={[highlightText, {color: settings.colors.white}]}>
                        Deutscher Koloproktologen-Kongress 2026
                    </p>
                    <p css={[highlightText, {color: settings.colors.white}]}>
                        12. - 14.03.2026;
                        Kongress am Park Augsburg - HYBRID
                    </p>
                    <Divider size="large" />
                    <p>
                        Als Mitveranstalter des jährlich stattfindenden
                        Koloproktologen-Kongress setzt der BCD auf praxisnahe Fortbildung
                        und berufspolitische Impulse.
                    </p>
                    <p>
                        Nutzen Sie diese Gelegenheit, um Ihr Wissen auszubauen, Netzwerke zu
                        stärken und sich über aktuelle Entwicklungen zu informieren.
                    </p>
                    <Divider size="medium" />
                    <div css={{marginTop: settings.sizes.extraLarge}}>
                        <Button
                            text="Koloproktologen Kongress 2026"
                            background={settings.colors.light}
                            color={settings.colors.primary}
                            size="large"
                            externalLink="https://www.koloproktologen-kongress.de/"
                        />
                    </div>
                </div>
            </TextContentElement>
        </ContentContainer>
    );
};

export default BSD;
