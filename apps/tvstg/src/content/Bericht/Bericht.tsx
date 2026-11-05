import React from "react";
import { Layout } from "@components";
import { siteContainer, wrapper } from "@styles";
import settings from "@settings";
import { FlexBox, Label, SportBanner, Gallery, Image } from "@ui";
import { PatstoreArticle } from "@types";
import { useFindCategories, useFindImages } from "@provider";
import { imageContainer } from "./styles";

const Blog: React.FC<{ article: PatstoreArticle }> = ({ article }) => {
  const { findCategories } = useFindCategories();
  const { findImage, findImageUrl } = useFindImages();

  const label = findCategories(article.categories)[0]?.title ?? "";

  return (
    <Layout>
      <div css={wrapper}>
        <div css={siteContainer}>
          <div css={{ marginTop: "2em" }}>
            <FlexBox direction="column" gap="40px">
              <div
                css={settings.mq({
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                })}
              >
                <div>{label && <Label text={label} />}</div>
                <h1
                  css={settings.mq({
                    marginBottom: "1.2rem",
                    wordBreak: "normal",
                    color: settings.colors.dark,
                  })}
                >
                  {article.title}
                </h1>
              </div>
              {article.image && (
                <div css={imageContainer}>
                  <Image
                    css={{
                      height: "100%",
                      maxHeight: "600px",
                      borderRadius: settings.sizes.medium,
                      aspectRatio: "16/9",
                      width: "100%",
                    }}
                    alt={article.title ?? ""}
                    image={findImage(article.image)}
                    objectPosition="center"
                    loading="eager"
                  />
                </div>
              )}
              <div>
                <div dangerouslySetInnerHTML={{ __html: article.text ?? "" }} />
              </div>

              {article.gallery.length > 0 && (
                <Gallery
                  imageIds={article.gallery}
                  findImage={findImageUrl}
                  displayMode="mosaic"
                  getAltText={(_id, index) => `${article.title} - Bild ${index + 1}`}
                />
              )}
            </FlexBox>
          </div>
        </div>
      </div>
      <div css={wrapper}>
        <div css={{ background: settings.colors.dark }}>
          <SportBanner />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
