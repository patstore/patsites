import React from "react";
import { Layout } from "@components";
import { FlexBox, Label, SportBanner, Gallery } from "@ui";
import { Image } from "@repo/ui";
import { PatstoreArticle } from "@types";
import { useCollection } from "@provider";
import styles from "./Bericht.module.css";

const Blog: React.FC<{ article: PatstoreArticle }> = ({ article }) => {
  const { find: findCategory } = useCollection("Category");

  const label = findCategory(article.categories?.[0])?.title ?? "";

  return (
    <Layout>
      <div className="wrapper">
        <div className="site-container">
          <div className={styles.page}>
            <FlexBox direction="column" gap="40px">
              <div className={styles.heading}>
                <div>{label && <Label text={label} />}</div>
                <h1>{article.title}</h1>
              </div>
              {article.image ? (
                <div className={styles.imageFrame}>
                  <Image
                    id={article.image}
                    alt={article.title ?? ""}
                    style={{ width: "100%", maxHeight: "600px", aspectRatio: "16 / 9" }}
                  />
                </div>
              ) : null}
              <div>
                <div dangerouslySetInnerHTML={{ __html: article.text ?? "" }} />
              </div>

              {article.gallery?.length > 0 && (
                <Gallery
                  imageIds={article.gallery}
                  displayMode="mosaic"
                  getAltText={(_id, index) => `${article.title} - Bild ${index + 1}`}
                />
              )}
            </FlexBox>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className={styles.bannerBand}>
          <SportBanner />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
