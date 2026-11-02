import React, { useState } from "react";
import { EmailClass, NewsItem } from "../types";
import { Button, FlexBox, Label, SlideIn } from "@ui";
import settings from "@settings";
import { memberHighlightContent } from "../styles";
import { useGetDownload } from "@provider";
import { buttonsContainer } from "@styles";
import { transformToWeb } from "../functions/transformToWeb";
import Attachments from "./Attachments";
import "../email_content.scss";

const News: React.FC<{
    item: NewsItem | EmailClass;
    label: string;
    type?: "email";
}> = ({ item, label, type }) => {
    const { findDownload } = useGetDownload();
    const [open, setOpen] = useState(false);

    if (type === "email") {
        const email = item as EmailClass;
        return (
            <>
                <div css={memberHighlightContent}>
                    <FlexBox
                        direction="column"
                        justify="space-between"
                        align="flex-start"
                        gap={settings.sizes.medium}
                    >
                        <div>
                            <Label
                                text={label}
                                background={settings.colors.white}
                            />
                            <h4>{email.title}</h4>
                            <div css={buttonsContainer}>
                                <Button
                                    background={settings.colors.primary}
                                    text="Öffnen"
                                    onClick={() => setOpen(true)}
                                />
                            </div>
                        </div>
                    </FlexBox>
                </div>
                <SlideIn
                    open={open}
                    cancelButtonHandler={() => setOpen(false)}
                    width="medium"
                    hasNoOverflow={false}
                >
                    <div className="content-preview">
                        {email.attachments?.length ? (
                            <Attachments attachments={email.attachments} />
                        ) : null}

                        <div className="content-preview-body">
                            <div className="web-preview">
                                <div className="web-preview-container">
                                    {transformToWeb(email.content)}
                                </div>
                            </div>
                        </div>
                    </div>
                </SlideIn>
            </>
        );
    }

    const news = item as NewsItem;
    return (
        <div css={memberHighlightContent}>
            <FlexBox
                direction="column"
                justify="space-between"
                align="flex-start"
                gap={settings.sizes.medium}
            >
                <div>
                    <Label
                        text={label}
                        background={settings.colors.white}
                    />
                    <h4>{news.label}</h4>
                    <div dangerouslySetInnerHTML={{ __html: news.text }} />
                    {news.documents &&
                        news.documents.map((doc) => {
                            const download = findDownload(doc);

                            if (!download) {
                                return null;
                            }
                            const fileUrl = download.filePath
                                ? `/data/files/${download.filePath}`
                                : download.file?.url;
                            if (!fileUrl) {
                                return null;
                            }
                            return (
                                <div key={doc}>
                                    <p>
                                        <a
                                            href={fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {download.title}
                                        </a>
                                    </p>
                                </div>
                            );
                        })}
                </div>
                {/* <Button
                    size="medium"
                    text="Download"
                    background={settings.colors.primary}
                    externalLink={item.file.url}
                /> */}
            </FlexBox>
        </div>
    );
};

export default News;
