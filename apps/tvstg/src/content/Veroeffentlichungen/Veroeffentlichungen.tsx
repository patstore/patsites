import React, { useMemo } from "react";
import settings from "@settings";
import { Layout } from "@components";
import { FlexBox, HeadContent } from "@ui";
import { siteContainer, wrapper } from "@styles";
import {
  useFindImages,
  useGetCategory,
  useGetDownload
} from "@provider";
import { PatstoreDownload, UnwrapScalar } from "@types";
import { Image } from "@ui";

const boxelement = {
  position: "relative",
  borderTop: `5px solid ${settings.colors.secondary}`,
  cursor: "pointer",
  marginBottom: "0.5em",
  padding: "0.5em 1em",
  textAlign: "left",
  background: settings.colors.white,
  border: `1px solid ${settings.colors.lightgrey}`,
  transition: "box-shadow 0.4s ease",
  ":hover": {
    boxShadow: "0px 6px 6px -2px rgba(0, 0, 0, 0.25)",
    h2: { color: settings.colors.secondary },
  },
};

const Veroeffentlichungen: React.FC = () => {
  const { downloads } = useGetDownload();
  const { categorys } = useGetCategory();
  const { findImage } = useFindImages();

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
      <div css={wrapper}>
        <HeadContent
          titel="Veröffentlichungen"
          titeltext="Unsere Zeitschriften und Flyer hier in digitaler Form."
        />
        <div css={siteContainer}>
          <FlexBox
            direction="row"
            align="stretch"
            justify="space-between"
            hasFullWidth
            changeToColumn
            wrap
            gap={settings.sizes.medium}
          >
            {mediaElements.map((value: PatstoreDownload) => (
              <div
                key={value.objectId}
                css={settings.mq([
                  boxelement,
                  {
                    flex: ["100%", "100%", "50%", "30%", "30%"],
                    maxWidth: "300px",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    margin: "1em 0",
                  },
                ])}
              >
                <a
                  target="__blank"
                  href={value?.file?.url || ""}
                  css={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    background: "transparent",
                    zIndex: 3,
                  }}
                >
                  <span css={{ opacity: 0 }}>{value.title}</span>
                </a>
                {value?.image && (
                  <div css={{ width: "100%", height: "100%" }}>
                    {findImage(value.image) && (
                      <Image
                        alt={value.title || "TV Freiburg St. Georgen"}
                        image={findImage(value.image)}
                      />
                    )}
                  </div>
                )}
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                  }}
                >
                  <p> {value?.description}</p>
                </div>
              </div>
            ))}
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};

export default Veroeffentlichungen;
