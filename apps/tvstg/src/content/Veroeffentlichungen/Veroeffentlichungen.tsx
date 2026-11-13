import React, { useMemo } from "react";
import { Layout } from "@components";
import { ContentBlock, FlexBox, HeadContent } from "@ui";
import { useCollection } from "@provider";
import { PatstoreDownload, UnwrapScalar } from "@types";
import { Image } from "@repo/ui";
import styles from "./Veroeffentlichungen.module.css";

const Veroeffentlichungen: React.FC = () => {
  const { items: downloads } = useCollection("Download");
  const { items: categorys } = useCollection("Category");

  const mediaElements: UnwrapScalar<PatstoreDownload>[] = useMemo(() => {
    const mediaArray: UnwrapScalar<PatstoreDownload>[] = [];
    const mediaCategory = categorys.find((cat) => cat.title === "Medien");
    if (!mediaCategory) return mediaArray;

    downloads.forEach((download) => {
      if (download?.categories?.includes(mediaCategory?.objectId)) {
        mediaArray.push(download);
      }
    });

    return mediaArray;
  }, [downloads, categorys]);

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          titel="Veröffentlichungen"
          titeltext="Unsere Zeitschriften und Flyer hier in digitaler Form."
        />
        <div className="site-container">
          <FlexBox
            direction="row"
            align="stretch"
            justify="space-between"
            hasFullWidth
            changeToColumn
            wrap
            gap="12px"
          >
            {mediaElements.map((value: PatstoreDownload) => (
              <ContentBlock key={value.objectId} className={styles.card}>
                <a
                  target="__blank"
                  href={value?.file?.url || ""}
                  className={styles.cover}
                >
                  <span>{value.title}</span>
                </a>
                {value?.image ? (
                  <Image
                    id={value.image}
                    alt={value.title || "TV Freiburg St. Georgen"}
                  />
                ) : null}
                <div className={styles.copy}>
                  <p> {value?.description}</p>
                </div>
              </ContentBlock>
            ))}
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};

export default Veroeffentlichungen;
