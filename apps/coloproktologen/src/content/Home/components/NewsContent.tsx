import { useCollection, useFindImages } from "@provider";
import type { PatstoreEntry } from "@types";
import settings from "@settings";
import { Maybe } from "@types";
import { AppImage, ContentContainer, FlexBox, SmallContentElement } from "@ui";
import React from "react";

const NewsContentElement: React.FC<{
  image?: Maybe<string>;
  title?: Maybe<string>;
  text?: Maybe<string>;
  date?: Maybe<string>;
}> = ({ image, title, text, date }) => {
    const { findImage } = useFindImages();
    if (!title || !text) return null;
    return (
        <React.Fragment>
            {image ? (
                <AppImage src={findImage(image)} alt={title as string} css={{borderRadius: settings.borderRadius.medium, marginBottom: settings.sizes.medium}} />
            ) : null}
            <div dangerouslySetInnerHTML={{ __html: text as string }} />
        </React.Fragment>
    );
};

const NewsContent: React.FC = () => {
    const { items } = useCollection<PatstoreEntry>("Entry");
    const news = items.filter((item) => item.categories?.includes("hSXInJfDmK"));

    return (
        <ContentContainer>
            <FlexBox
                direction="row"
                align="stretch"
                justify="space-between"
                gap={settings.sizes.medium}
                hasFullWidth
                changeToColumn
                wrap
            >
                <div css={{ flex: "1 1 100%" }}>
                    <h2>Aktuelles aus der Proktologie</h2>
                </div>
                {news.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime()).slice(0, 6).map((item) => (
                    <SmallContentElement
                        key={item.objectId}
                        title={item.title as string}
                        text={item.description as string}
                        flex={["1 1 100%", "1 1 100%", "1 1 30%"]}
                        date={item.date || undefined}
                        content={
                            <NewsContentElement
                                key={item.objectId}
                                image={item.image}
                                title={item.title}
                                text={item.text}
                                date={item.date}
                            />
                        }
                    />
                ))}
            </FlexBox>
        </ContentContainer>
    );
};
export default NewsContent;
