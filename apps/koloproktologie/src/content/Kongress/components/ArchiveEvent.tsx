import React, { Dispatch, SetStateAction } from "react";
import { EventClass } from "@data";
import { isArray } from "lodash-es";
import { useGetDownload } from "@provider";
import { Divider, Gallery } from "@ui";
import settings from "@settings";
import { summaryStyle } from "../styles";

const ArchiveEvent = ({
    event,
    open,
    setOpenEvent
}: {
    event: EventClass;
    open: boolean;
    setOpenEvent: Dispatch<SetStateAction<EventClass["objectId"] | null>>;
}) => {
    const { findDownload } = useGetDownload();

    let documentIds: string[] = [];
    if (isArray(event.documents) && event.documents.length > 0) {
        documentIds = event.documents;
    } else if (event.data?.document) {
        documentIds = [event.data.document];
    }

    const galleryImages = isArray(event.gallery) ? event.gallery : [];

    const handleSummaryClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setOpenEvent((current) =>
            current === event.objectId ? null : event.objectId
        );
    };

    return (
        <div>
            <h3>{event.title}</h3>
            <details open={open}>
                <summary
                    css={summaryStyle}
                    onClick={handleSummaryClick}
                >
                    Mehr Informationen
                </summary>
                <div
                    css={{
                        marginTop: "1rem",
                        padding: "24px",
                        backgroundColor: settings.colors.light,
                        borderRadius: settings.sizes.medium
                    }}
                >
                    {event.text && (
                        <div dangerouslySetInnerHTML={{ __html: event.text }} />
                    )}
                    {event.text &&
                        (documentIds.length > 0 ||
                            galleryImages.length > 0) && <Divider />}
                    {documentIds.length > 0 &&
                        documentIds.map((docId) => {
                            const dl = findDownload(docId);
                            if (!dl?.file?.url) return null;
                            return (
                                <div key={docId}>
                                    <a
                                        href={dl.file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {dl.title ||
                                            "Weitere Informationen zu der Veranstaltung"}
                                    </a>
                                </div>
                            );
                        })}
                    {documentIds.length > 0 && galleryImages.length > 0 && (
                        <Divider />
                    )}
                    {galleryImages.length > 0 && (
                        <>
                            <h4>Galerie</h4>
                            <Gallery images={galleryImages} />
                        </>
                    )}
                </div>
            </details>
            <Divider showLine />
        </div>
    );
};

export default ArchiveEvent;
