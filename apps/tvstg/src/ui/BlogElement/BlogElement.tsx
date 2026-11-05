import { Link } from "@tanstack/react-router";
import React from "react";
import {
  blogContainer,
  fontContainer,
  imageContainer,
  linkContainer,
  mainContainerHeader,
  blogContainerHeader,
  mainContainer,
} from "./styles";
import {
  getDateString,
  slugify,
  useFindCategories,
  useFindImages
} from "@provider";
import { BlogElementProps } from "./types";
import settings from "@settings";
import { Label } from "../Label";
import { FlexBox } from "../FlexBox";
import { Image } from "../Image";

const BlogElement: React.FC<BlogElementProps> = ({
  type = "tile",
  title,
  categories,
  image,
  date,
  flex,
}) => {
  const { findCategories } = useFindCategories();
  const { findImage } = useFindImages();
  const articleLink = (
    <Link
      to="/aktuelles/$slug"
      params={{ slug: slugify(title ?? "") }}
      css={linkContainer}
    >
      {title}
    </Link>
  );

  if (type === "tile") {
    return (
      <div css={blogContainer(flex)}>
        {articleLink}
        <div css={imageContainer}>
          <Image
            alt={title || "TV Freiburg St. Georgen"}
            style={{ width: "100%" }}
            imgStyle={{ width: "100%", height: "240px" }}
            sizes="(max-width: 800px) 100vw, 400px"
            image={findImage(image)}
          />
        </div>
        <div>
          <FlexBox
            direction="row"
            align="center"
            justify="flex-start"
            gap={settings.sizes.small}
          >
            {categories && categories.length > 0
              ? findCategories(categories).map((category, index) => {
                  return <Label text={category?.title || ""} key={index} />;
                })
              : null}
          </FlexBox>
          <div css={fontContainer}>
            <h3>{title}</h3>
          </div>
          <div>
            <h4
              css={{
                marginBottom: 0,
                color: `${settings.colors.grey} !important`,
              }}
            >
              {getDateString(date).date}
            </h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div css={blogContainerHeader}>
      {articleLink}
      <div
        css={settings.mq({
          width: "100%",
          maxWidth: "800px",
          overflow: "hidden",
          display: "inline-block",
        })}
      >
        <Image
          alt={title || "TV Freiburg St. Georgen"}
          css={[imageContainer, { height: "auto !important" }]}
          loading="eager"
          sizes="(max-width: 800px) 100vw, 800px"
          image={findImage(image)}
        />
      </div>
      <div css={mainContainerHeader}>
        <FlexBox
          direction="row"
          align="center"
          justify="flex-start"
          gap={settings.sizes.small}
        >
          {categories && categories.length > 0
            ? findCategories(categories).map((category, index) => {
                return <Label text={category?.title || ""} key={index} />;
              })
            : null}
        </FlexBox>
        <h2>{title}</h2>
        <h3>{getDateString(date).date}</h3>
      </div>
    </div>
  );
};

export default BlogElement;
