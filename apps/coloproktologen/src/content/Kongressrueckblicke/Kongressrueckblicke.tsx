import React from "react";
import { Layout } from "@components";
import { getCurrentEvents, getRecordFileUrl, useFindImages, useGetEvent, sortEventsByDate, useGetDownload } from "@provider";
import { AppImage, ContentContainer, Divider, FlexBox, HeadContent, Gallery, Button } from "@ui";
import settings from "@settings";
import { RiNodejsLine } from "react-icons/ri";

const Kongressrueckblicke: React.FC = () => {
    const { events } = useGetEvent();
    const currentEvents = getCurrentEvents(events);
    const { findImage } = useFindImages();
    const { findDownload } = useGetDownload();

    console.log(currentEvents);

    return <Layout>
        <HeadContent
            title="Kongressrückblick"
            description="Impressionen und Kongressberichte der Deutschen Koloproktologen-Kongresse der vergangenen Jahre."
            isInline
        />
        <ContentContainer noPaddingTop>
            <FlexBox direction="column"
                align="stretch"
                justify="space-between"
                gap={settings.sizes.large}
                hasFullWidth>
                {sortEventsByDate(currentEvents?.past || []).map((event) => (
                    <>
                    <FlexBox direction="column"
                        align="stretch"
                        justify="space-between"
                        gap={settings.sizes.large}
                        key={event.objectId}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        {event.text && (
                            <details>
                                <summary>Weitere Informationen</summary>
                                <div dangerouslySetInnerHTML={{ __html: event.text }} />
                            </details>
                        )}
                        <FlexBox direction="row" align="center" justify="space-between">
                        {event.documents &&
                                event.documents.map(
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
                        {event.image && (
                            <AppImage 
                                alt={event.title || ""}
                                src={findImage(event.image)}
                            />
                        )}
                        {getRecordFileUrl(event) && (
                            <div>
                                <h3>Kongressbericht</h3>
                                <a href={getRecordFileUrl(event)} target="_blank">Den Kongressbericht können Sie hier als PDF-Datei herunterladen.</a>
                            </div>
                        )}
                        {event.gallery && event.gallery.length > 0 && (
                            <Gallery 
                                key={event.objectId}
                                imageIds={event.gallery}
                                findImage={findImage}
                                displayMode="horizontal" 
                            />

                        ) }
                        </FlexBox>
                        <Divider showLine={true} />
                    </>
                ))}
            </FlexBox>
        </ContentContainer>
    </Layout>;
};

export default Kongressrueckblicke;
