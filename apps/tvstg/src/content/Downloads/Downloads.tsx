import React, { useMemo } from "react";
import { Layout } from "@components";
import { FlexBox, HeadContent } from "@ui";
import { siteContainer, wrapper } from "../../styles/styles";
import { PatstoreCategory, PatstoreDownload } from "@types";
import { useGetCategory } from "@provider";
import settings from "@settings";
import { downloadsContainer } from "./styles";
import { useGetDownload } from "@provider";

const Downloads: React.FC = () => {
  const { downloads } = useGetDownload();
  const { categorys } = useGetCategory();

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
      <div css={wrapper}>
        <div css={siteContainer}>
          <FlexBox
            direction="column"
            align="stretch"
            justify="space-between"
            gap={settings.sizes.medium}
            wrap
            hasFullWidth
          >
            {downloadCategoryArray.map(
              (kategorie) =>
                kategorie.objectId !== "3voTJpShwb" && (
                  <div css={downloadsContainer} key={kategorie.objectId}>
                    <h3>{kategorie.title}</h3>
                    {downloads.map((download: PatstoreDownload) => {
                      if (
                        download?.categories?.includes(
                          kategorie.objectId as string,
                        )
                      ) {
                        return (
                          <a
                            className="linkStyle"
                            key={download.title}
                            target="__blank"
                            href={download.file?.url || ""}
                            css={{ margin: "0.6rem 0" }}
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
