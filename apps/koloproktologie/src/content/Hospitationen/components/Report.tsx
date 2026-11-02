import settings from "@settings";
import React, { useState } from "react";
import { AppImage, ContentBox, Label, SlideIn } from "@ui";
import { ReportProps } from "../types";
import { useGetImages } from "@provider";

const Report: React.FC<ReportProps> = ({
    id,
    title,
    subtitle,
    text,
    background,
    label,
    image
}) => {
    const [open, setOpen] = useState(false);
    const { findImageUrl } = useGetImages();

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
            </SlideIn>
        </div>
    );
};

export default Report;
