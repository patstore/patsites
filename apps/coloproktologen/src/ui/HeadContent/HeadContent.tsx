import { AppImage } from "@ui";
import staticAsset0 from "./images/main_header.jpg";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  backgroundOverlay,
  headContentBackgroundImage,
  headContentContainer,
  headContentContent,
  headContentImage,
  headContentImageContainer,
  headContentSubtitle,
  headContentTextContainer,
  titleContainer,
} from "./styles";
import { HeadContentProps } from "./types";
import settings from "@settings";
import { FlexBox } from "../FlexBox";
import { contentBox, highlightText } from "@styles";
import { Divider } from "../Divider";

const HeadContent: React.FC<HeadContentProps> = ({
  title,
  subtitle,
  description,
  content,
  backgroundImage,
  image,
  isInline = false,
  id = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 1.8]);

  if (image) {
    return (
      <div
        id={id}
        ref={containerRef}
        css={[
          headContentContainer({ isInline }),
          { backgroundColor: "transparent" },
        ]}
      >
        <div css={headContentContent({ alignItems: "center" })}>
          <div css={titleContainer}>
            <h1 css={{ textAlign: "center" }}>
              {title}
              {subtitle && (
                <>
                  <span
                    css={{
                      fontWeight: 400,
                      marginTop: settings.sizes.medium,
                      display: "block",
                    }}
                  >
                    {subtitle}
                  </span>
                </>
              )}
            </h1>
            {description && <p css={highlightText}>{description}</p>}
          </div>
          <Divider />
          <FlexBox
            direction="row"
            align="stretch"
            justify="space-between"
            gap={settings.sizes.large}
            hasFullWidth
            changeToColumn
            styles={{
              paddingLeft: [
                settings.sizes.medium,
                settings.sizes.large,
                settings.sizes.large,
                0
            ],
            paddingRight: [
                settings.sizes.medium,
                settings.sizes.large,
                settings.sizes.large,
                0
            ]
            }}
          >
            {content && (
                <div
                css={
                  contentBox( ["1 1 100%", "1 1 100%", "1 1 30%"])
                }
              >
                {content}
              </div>
            )}
            <div css={[contentBox(["1 1 100%", "1 1 100%", "1 1 60%"]), {padding: 0}]}>
              <img
                src={image}
                alt={title}
                css={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </FlexBox>
        </div>
      </div>
    );
  }

  return (
    <div id={id} ref={containerRef} css={headContentContainer({ isInline })}>
      {backgroundImage && (
        <AppImage
          css={headContentBackgroundImage}
          src={staticAsset0}
          alt="background"
          objectPosition="bottom"
        />
      )}
      {backgroundImage && <div css={backgroundOverlay} />}
      <div css={headContentContent({ alignItems: "center" })}>
        <FlexBox
          direction={"column"}
          align="center"
          justify="space-between"
          hasFullWidth
          gap={"36px"}
        >
          <div css={headContentTextContainer(!!image)}>
            <h1
              css={{
                color: backgroundImage
                  ? settings.colors.white
                  : settings.colors.dark,
              }}
            >
              {title}
              {subtitle && (
                <>
                  <span
                    css={{
                      fontWeight: 400,
                      marginTop: settings.sizes.medium,
                      display: "block",
                    }}
                  >
                    {subtitle}
                  </span>
                </>
              )}
            </h1>
            {description && (
              <p
                css={[
                  headContentSubtitle,
                  {
                    color: backgroundImage
                      ? settings.colors.white
                      : settings.colors.dark,
                    whiteSpace: "pre-line",
                  },
                ]}
              >
                {description}
              </p>
            )}
            {content && (
              <div css={{ marginTop: settings.sizes.medium }}>{content}</div>
            )}
          </div>
          {image && (
            <motion.div css={headContentImageContainer}>
              <motion.img
                style={{ scale }}
                transition={{ duration: 0.5 }}
                css={headContentImage}
                src={image}
                alt="image"
              />
            </motion.div>
          )}
        </FlexBox>
      </div>
    </div>
  );
};

export default HeadContent;
