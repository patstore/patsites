import { useFindNews, useGetImages } from "@provider";
import React, { useState } from "react";
import { AppImage, Button, Divider, SlideIn } from "@ui";

const CongressArticle: React.FC<{ event?: PatstoreEvent }> = ({ event }) => {
    const { allNews } = useFindNews({ category: "" });
    const [showArticle, setShowArticle] = useState(false);
    const { findImageUrl } = useGetImages();

    if (!event) {
        return null;
    }

    const news = allNews.find((newsElement) =>
        event.categories.includes(newsElement.objectId)
    );

    if (!news) {
        return null;
    }

    return (
        <>
            <Button
                text="Zum Bericht"
                onClick={() => setShowArticle(true)}
            ></Button>
            <SlideIn
                width="small"
                open={showArticle}
                cancelButtonHandler={() => setShowArticle(false)}
            >
                {news.image && (
                    <AppImage
                        src={findImageUrl(news.image)}
                        alt={news.title}
                        objectFit="contain"
                        css={{ height: "300px", borderRadius: "24px" }}
                    />
                )}
                <Divider />
                <h2>{news.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: news.text }} />
            </SlideIn>
        </>
    );
};

export default CongressArticle;
