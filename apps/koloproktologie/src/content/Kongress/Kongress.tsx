import React from "react";
import { Layout } from "@components";
import {
    Button,
    ContentContainer,
    Divider,
    FlexBox,
    Gallery,
    HeadContent,
    TextContentElement
} from "@ui";
import settings from "@settings";
import { useGetEvent, getCurrentEvents, useGetDownload } from "@provider";
import { upcomingKongressContainer } from "./styles";
import { topline } from "../../styles/styles";
import KongressArchive from "./components/KongressArchive";
import CongressArticle from "./components/CongressArticle";
import { EventClass } from "@data";
import { isArray } from "lodash-es";
import Cooperation from "./components/Cooperation";

const Kongress: React.FC = () => {
    const { events } = useGetEvent();
    const { findDownload } = useGetDownload();

    const currentEvents = getCurrentEvents(events || []);

    const getYear = (event: EventClass) => {
        if (isArray(event.dates) && event.dates.length > 0) {
            const date = event.dates[0].start;
            return new Date(date).getFullYear();
        }
        return new Date().getFullYear();
    };

    return (
        <Layout>
            <HeadContent
                // topline="Deutscher Koloproktologen-Kongress"
                title="Koloproktologen-Kongress"
                subtitle={
                    "Unsere Jahrestagung hat sich als feste Größe für alle in der Koloproktologie Tätigen etabliert. Beim Expertenaustausch und Wissenstransfer stehen fachspezifische sowie interdisziplinäre Themen im Fokus."
                }
                image="/kongress_header.jpg"
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <TextContentElement title="Geballte Expertise !">
                    <p>
                        Kompakt, zielorientiert und mit dem Wissen von morgen
                        bringt Sie unser Kongress an 3 Veranstaltungstagen auf
                        den aktuellen Stand der Koloproktologie.
                    </p>
                    <p>
                        Als TeilnehmerIn erleben Sie ein abwechslungsreiches und
                        attraktives Programm aus Seminaren, Hands-on-Kursen,
                        Workshops, Satelliten-Symposien und wissenschaftlichen
                        Vorträgen, geleitet und präsentiert von ausgewiesenen
                        Experten ihres Fachs. Die parallel stattfinden
                        Fachausstellung informiert über innovative Produkte
                        sowie neueste Behandlungsangebote.
                    </p>
                </TextContentElement>
            </ContentContainer>
            {currentEvents?.upcoming && (
                <ContentContainer largeBackground={settings.colors.primary}>
                    <div css={upcomingKongressContainer}>
                        <h2>{currentEvents?.upcoming?.title}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: currentEvents?.upcoming?.text || ""
                            }}
                        />
                        {(currentEvents.upcoming.data?.link || currentEvents.upcoming.link) && (
                            <>
                                <Divider />
                                <Button
                                    size="large"
                                    background={settings.colors.secondary}
                                    color={settings.colors.primary}
                                    text={`zur Kongressseite ${getYear(currentEvents.upcoming)}`}
                                    externalLink={
                                        currentEvents.upcoming.data?.link || currentEvents.upcoming.link
                                    }
                                />
                            </>
                        )}
                    </div>
                </ContentContainer>
            )}
            <Cooperation />
            {currentEvents?.current && (
                <ContentContainer>
                    <div css={{ position: "relative", width: "100%" }}>
                        <div css={topline}>Rückblick</div>
                        <h2>{currentEvents?.current?.title}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: currentEvents?.current?.data?.text
                            }}
                        />
                        <FlexBox
                            direction="row"
                            gap="16px"
                        >
                            {(currentEvents.current.link) && (
                                <Button
                                    size="large"
                                    color={settings.colors.white}
                                    background={settings.colors.primary}
                                    text="Zum Termin"
                                    externalLink={
                                        currentEvents.current.link
                                    }
                                />
                            )}
                            {currentEvents.current.documents &&
                                currentEvents.current.documents.map(
                                    (document) => {
                                        const download = findDownload(document);

                                        if (!download) {
                                            return null;
                                        }
                                        return (
                                            <Button
                                                key={document}
                                                size="large"
                                                color={settings.colors.white}
                                                background={
                                                    settings.colors.primary
                                                }
                                                text={download.title || ""}
                                                externalLink={
                                                    download.file?.url
                                                        || ""
                                                }
                                            />
                                        );
                                    }
                                )}
                        </FlexBox>
                        {currentEvents?.current && (
                            <CongressArticle event={currentEvents?.current} />
                        )}
                        <Divider />
                        <Divider />
                        {currentEvents?.current.gallery && (
                            <>
                                <Divider />
                                <h3>Galerie</h3>

                                <div css={{ position: "relative" }}>
                                    <Gallery
                                        images={
                                            currentEvents?.current
                                                .gallery as string[]
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </ContentContainer>
            )}
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <div css={topline}>Die vergangenen Jahre</div>

                    <h2>Kongressarchiv</h2>
                    <p>
                        Im Kongressarchiv finden Sie die Kongressprogramme der
                        vergangenen Jahre.
                    </p>
                    <KongressArchive events={currentEvents?.past || []} />
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Kongress;
