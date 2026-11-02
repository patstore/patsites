import React from "react";
import settings from "@settings";
import { Link } from "@tanstack/react-router";
import { AppImage, Button, ContentContainer, Divider, FlexBox } from "@ui";
import { footerContainer, footerLinksTwo } from "./styles";
import { FaLinkedin } from "react-icons/fa6";
import { useSiteContext } from "@provider";
import { highlightContent } from "@styles";
import footerBackground from "./images/footer_background.jpg";

const FooterTwo: React.FC<{ isUserProfile?: boolean }> = ({
    isUserProfile = false
}) => {
    const { setApplicationOpen } = useSiteContext();

    if (isUserProfile) {
        return (
            <ContentContainer
                // noPaddingTop
                largeBackground={settings.colors.primary}
            >
                <FlexBox
                    direction="row"
                    align="center"
                    justify="flex-start"
                    wrap
                    styles={{
                        width: "100%",
                        position: "relative",
                        p: { margin: "0 0.4em" },
                        overflow: "hidden"
                    }}
                >
                    <span css={footerLinksTwo}>
                        <Link to="/kontakt">Kontakt</Link> {" / "}
                        <Link to="/datenschutzerklaerung">
                            Datenschutz
                        </Link>{" "}
                        {" / "}
                        <Link to="/impressum">Impressum</Link>
                    </span>
                </FlexBox>
            </ContentContainer>
        );
    }

    return (
        <>
            <ContentContainer noPaddingTop>
                <Divider />
                <FlexBox
                    direction="column"
                    align="stretch"
                    gap="30px"
                    hasFullWidth
                >
                    <div
                        css={[
                            highlightContent({
                                background: settings.colors.white
                            }),
                            {
                                paddingTop: "24px",
                                paddingBottom: "24px",
                                marginTop: "24px",
                                border: `1px solid ${settings.colors.grey}`,
                                p: { textAlign: "center" }
                            }
                        ]}
                    >
                        <FlexBox
                            direction="column"
                            align="center"
                            justify="center"
                            gap="12px"
                            styles={{ marginBottom: "24px" }}
                        >
                            <h2 css={{ textAlign: "center" }}>
                                Jetzt Mitglied werden
                            </h2>
                            <p>
                                Werden Sie Mitglied der DGK: Bündeln Sie Wissen,
                                stärken Sie das Fach und gestalten Sie aktiv die
                                Zukunft der Koloproktologie – im starken
                                Netzwerk, durch intensiven Austausch und mit
                                exklusiven Vorteilen.
                            </p>
                            <Button
                                size="large"
                                text="Zum Mitgliedsantrag"
                                onClick={() => setApplicationOpen(true)}
                                color={settings.colors.white}
                                background={settings.colors.primary}
                            />
                        </FlexBox>
                    </div>
                </FlexBox>
            </ContentContainer>
            <div css={{ position: "relative" }}>
                <AppImage
                    src={footerBackground}
                    alt="Deutsche Gesellschaft für Koloproktologie"
                    objectFit="cover"
                    css={{
                        width: "100%",
                        height: "100%",
                        position: "absolute"
                    }}
                />
                <div
                    css={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.2)"
                    }}
                ></div>
                <ContentContainer largeBackground={"transparent"}>
                    <footer css={footerContainer}>
                        <FlexBox
                            styles={{
                                width: "100%",
                                color: `${settings.colors.white} !important`
                            }}
                        >
                            <div
                                css={settings.mq({
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    width: "100%",
                                    gap: "2em"
                                })}
                            >
                                <div css={{ flex: 1, minWidth: "300px" }}>
                                    <h4>
                                        Deutsche Gesellschaft für
                                        Koloproktologie e.V. (DGK)
                                    </h4>
                                    <p>
                                        Maienstraße 3 <br />
                                        79102 Freiburg
                                    </p>
                                    <p>
                                        Telefon:
                                        <a href="tel:+4972170438113">
                                            +49 (0)761 70 438 - 113
                                        </a>
                                    </p>
                                    <p>
                                        E-Mail:
                                        <a href="mailto:info@koloproktologie.org">
                                            info@koloproktologie.org
                                        </a>
                                    </p>
                                    <FlexBox
                                        direction="row"
                                        justify="flex-start"
                                        align="center"
                                        hasFullWidth
                                        gap={settings.sizes.medium}
                                    >
                                        <a
                                            href="https://www.linkedin.com/company/deutsche-gesellschaft-koloproktologie/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FaLinkedin
                                                size={24}
                                                color={
                                                    settings.colors.secondary
                                                }
                                            />
                                        </a>
                                    </FlexBox>
                                </div>
                                <div
                                    css={{
                                        flex: 1,
                                        a: {
                                            textDecoration: "none !important"
                                        }
                                    }}
                                >
                                    <h4>DGK</h4>
                                    <Link to="/dgk/vorstand">
                                        Vorstand & Präsidium
                                    </Link>{" "}
                                    <br />
                                    <Link to="/dgk/mitgliedschaft">
                                        Mitglied werden
                                    </Link>{" "}
                                    <br />
                                    <Link to="/dgk/mitgliedersuche">
                                        Mitgliedersuche
                                    </Link>{" "}
                                    <br />
                                    <Link to="/dgk/beitragsordnung">
                                        Beitragsordnung
                                    </Link>{" "}
                                    <br />
                                    <Link to="/dgk/satzung">Satzung</Link>{" "}
                                    <br />
                                    <Link to="/dgk/geschichte">
                                        Geschichte
                                    </Link>{" "}
                                    <br />
                                </div>
                                <div
                                    css={{
                                        flex: 1,
                                        a: { textDecoration: "none !important" }
                                    }}
                                >
                                    <h4>Aktivitäten</h4>
                                    <Link to="/aktivitaeten/kongress">
                                        Kongress
                                    </Link>{" "}
                                    <br />
                                    <Link to="/aktivitaeten/auszeichnungen">
                                        Auszeichnungen
                                    </Link>{" "}
                                    <br />
                                    <Link to="/aktivitaeten/leitlinien">
                                        Leitlinien
                                    </Link>{" "}
                                    <br />
                                    <Link to="/aktivitaeten/forschungsfoerderung">
                                        Forschungsförderung
                                    </Link>{" "}
                                    <br />
                                    <Link to="/aktivitaeten/hospitationen">
                                        Hospitationen
                                    </Link>{" "}
                                    <br />
                                    <Link to="/aktivitaeten/zertifizierung">
                                        Zertifizierung
                                    </Link>{" "}
                                    <br />
                                    <Link to="/aktivitaeten/schirmherrschaft">
                                        Schirmherrschaft
                                    </Link>{" "}
                                    <br />
                                </div>
                                <div
                                    css={{
                                        flex: 1,
                                        a: { textDecoration: "none !important" }
                                    }}
                                >
                                    <h4>Fortbildung</h4>
                                    <Link to="/fortbildung/manual">
                                        Manual der Koloproktologie
                                    </Link>{" "}
                                    <br />
                                    <Link to="/fortbildung/coloproctology">
                                        Coloproctology
                                    </Link>{" "}
                                    <br />
                                    <Link to="/fortbildung/grundkurs">
                                        Koloproktologischer Grundkurs
                                    </Link>{" "}
                                    <br />
                                    <Link to="/fortbildung/ebsq">
                                        EBSQ-Coloproctology
                                    </Link>{" "}
                                    <br />
                                    <Link to="/fortbildung/veranstaltungen">
                                        Veranstaltungen
                                    </Link>{" "}
                                    <br />
                                </div>
                            </div>
                        </FlexBox>
                        <FlexBox
                            direction="row"
                            styles={{ marginTop: 0, padding: "0" }}
                            gap="30px"
                        >
                            <FlexBox
                                direction="row"
                                justify="flex-start"
                                wrap
                                styles={{
                                    width: "100%",
                                    position: "relative",
                                    p: { margin: "0 0.4em" },
                                    overflow: "hidden"
                                }}
                            >
                                <span css={footerLinksTwo}>
                                    <Link to="/kontakt">Kontakt</Link> /{" "}
                                    <Link to="/datenschutzerklaerung">
                                        Datenschutz
                                    </Link>{" "}
                                    / <Link to="/impressum">Impressum</Link>
                                </span>
                            </FlexBox>
                        </FlexBox>
                    </footer>
                </ContentContainer>
            </div>
        </>
    );
};

export default FooterTwo;
