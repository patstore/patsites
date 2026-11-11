import settings from "@settings";
import React, { useState } from "react";
import { AppImage, ContentBox, Label, SlideIn } from "@ui";
import { ReportProps } from "../types";
import { useCollection, useGetImages } from "@provider";
import { DownloadClass } from "@data";

const Report: React.FC<ReportProps> = ({
    id,
    title,
    subtitle,
    text,
    background,
    label,
    image,
    documents
}) => {
    const [open, setOpen] = useState(false);
    const { findImageUrl } = useGetImages();
    const { find: findDownload } = useCollection<DownloadClass>("Download");

    const downloadDocuments = documents?.map((document) => findDownload(document));

    return (
        <div
            css={{
                width: "100%",
                height: "fit-content"
            }}
        >
            <ContentBox
                key={id}
                title={title}
                text={subtitle}
                label={label || "Hopsitationsbericht"}
                // date={getDateString(news.date).date}
                background={background}
                color={settings.colors.dark}
                buttonBackground={settings.colors.primary}
                buttonText="Mehr erfahren"
                onClick={() => setOpen(true)}
            ></ContentBox>
            <SlideIn
                width="small"
                open={open}
                cancelButtonHandler={() => setOpen(false)}
            >
                <Label text={label || "Hopsitationsbericht"}></Label>
                <h3>{title}</h3>
                {image && (
                    <AppImage
                        src={findImageUrl(image)}
                        alt={title}
                        objectFit="contain"
                        css={{ height: "300px", borderRadius: "24px" }}
                    />
                )}
                <p>{subtitle}</p>
                <div dangerouslySetInnerHTML={{ __html: text }} />

                {downloadDocuments && downloadDocuments.map((document) => (
                    <div css={{marginBottom: "24px"}}>
                        <p>
                            Den gesamten Bericht finden Sie hier:
                        </p>
                        <a href={document?.file?.url} target="_blank" rel="noopener noreferrer">
                            {document.title}
                        </a>
                    </div>
                ))}
            </SlideIn>
        </div>
    );
};

export default Report;
