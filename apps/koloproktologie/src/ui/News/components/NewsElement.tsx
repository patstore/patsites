import settings from "@settings";
import React, { useState } from "react";
import { NewsElementProps } from "../types";
import { AppImage, ContentBox, Divider, FlexBox, SlideIn } from "@ui";
import { getDateString, useGetDownload, useGetImages } from "@provider";

const NewsElement: React.FC<NewsElementProps> = ({ news, background }) => {
    const [open, setOpen] = useState(false);
    const { findImageUrl } = useGetImages();
    const { findDownload } = useGetDownload();
    return (
        <div
            css={{
                width: "300px",
                height: "fit-content"
            }}
        >
            <ContentBox
                key={news.title}
                title={news.title}
                text={news.description}
                // link={news.link}
                label="Aktuelles"
                date={getDateString(news.date).date}
                background={background}
                image={news.image}
                color={settings.colors.dark}
                buttonBackground={settings.colors.primary}
                buttonText="Weiter lesen"
                onClick={() => setOpen(true)}
                labelBackground={"transparent"}
            ></ContentBox>
            <SlideIn
                width="small"
                open={open}
                cancelButtonHandler={() => setOpen(false)}
            >
                <FlexBox direction="row" align="center" justify="center">
                    {news.image && (
                        <AppImage
                            src={findImageUrl(news.image)}
                            alt={news.title}
                            objectFit="contain"
                            css={{ height: "300px", borderRadius: "24px" }}
                        />
                    )}
                </FlexBox>
                <Divider />
                <h2>{news.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: news.text }} />
                {news.documents &&
                    news.documents.map((document: string) => (
                        <div key={document}>
                            <a
                                href={findDownload(document)?.file?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {findDownload(document)?.title}
                            </a>
                        </div>
                    ))}
            </SlideIn>
        </div>
    );
};

export default NewsElement;
