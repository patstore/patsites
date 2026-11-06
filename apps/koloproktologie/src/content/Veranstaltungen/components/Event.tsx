import React, { useState } from "react";
import { Button, ContentBox, FlexBox, SlideIn } from "@ui";
import { EventProps } from "../types";
import { useCollection } from "@provider";
import type { DownloadClass } from "@data";
import settings from "@settings";

const Event: React.FC<EventProps> = ({
    title,
    subtitle,
    text,
    link,
    date,
    place,
    documents = []
}) => {
    const { find: findDownload } = useCollection<DownloadClass>("Download");
    const [open, setOpen] = useState(false);

    return (
        <>
            <ContentBox
                label={`${date} - ${place}`}
                title={title}
                labelBackground={settings.colors.white}
            >
                {subtitle && <p> {subtitle}</p>}

                {documents &&
                    documents.length > 0 &&
                    documents.map((document: string) => {
                        const download = findDownload(document);
                        return (
                            <div key={document}>
                                <a
                                    href={download?.file?.url}
                                    target="__blank"
                                >
                                    {download?.title}
                                </a>
                            </div>
                        );
                    })}

                <FlexBox
                    direction="row"
                    align="flex-start"
                    justify="flex-start"
                    gap={settings.sizes.medium}
                >
                    {text && (
                        <>
                            <Button
                                text="Weitere Informationen"
                                onClick={() => setOpen(true)}
                                size="medium"
                            />
                        </>
                    )}
                    {link && (
                        <>
                            <Button
                                text="Zur Anmeldung"
                                externalLink={link}
                            />
                        </>
                    )}
                </FlexBox>
            </ContentBox>
            <SlideIn
                open={open}
                cancelButtonHandler={() => setOpen(false)}
                width="medium"
            >
                <div>
                    <h2>Weitere Informationen</h2>
                    <div dangerouslySetInnerHTML={{ __html: text }} />
                </div>
            </SlideIn>
        </>
    );
};

export default Event;
