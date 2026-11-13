import React, { useMemo } from "react";
import { Layout } from "@components";
import { FlexBox, HeadContent } from "@ui";
import { PatstoreCategory, PatstoreDownload } from "@types";
import { useCollection } from "@provider";
import styles from "./Downloads.module.css";

const Downloads: React.FC = () => {
  const { items: downloads } = useCollection("Download");
  const { items: categorys } = useCollection("Category");

  const downloadCategoryArray: PatstoreCategory[] = useMemo(() => {
    const downloadKategorienArray: PatstoreCategory[] = [];
    categorys.forEach((category: PatstoreCategory) => {
      if (category.type === "downloads") {
        downloadKategorienArray.push(category);
      }
    });
    return downloadKategorienArray;
  }, [categorys]);

  return (
    <Layout>
      <HeadContent site="Downloads" titel="Alle Downloads und Dokumente" />
      <div className="wrapper">
        <div className="site-container">
          <FlexBox
            direction="column"
            align="stretch"
            justify="space-between"
            gap="12px"
            wrap
            hasFullWidth
          >
            {downloadCategoryArray.map(
              (kategorie) =>
                kategorie.objectId !== "3voTJpShwb" && (
                  <div className={styles.group} key={kategorie.objectId}>
                    <h3>{kategorie.title}</h3>
                    {downloads.map((download: PatstoreDownload) => {
                      if (
                        download?.categories?.includes(
                          kategorie.objectId as string,
                        )
                      ) {
                        return (
                          <a
                            className={`linkStyle ${styles.link}`}
                            key={download.title}
                            target="__blank"
                            href={download.file?.url || ""}
                          >
                            {download.title}
                          </a>
                        );
                      }
                      return null;
                    })}
                  </div>
                ),
            )}
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};

export default Downloads;
