import { Link } from "@tanstack/react-router";
import React from "react";
import {
  blogContainer,
  fontContainer,
  imageContainerHeader,
  imageContainerTile,
  linkContainer,
  mainContainerHeader,
  blogContainerHeader,
  footerContainer,
} from "./styles";
import { getDateString, slugify, useCollection } from "@provider";
import { BlogElementProps } from "./types";
import settings from "@settings";
import { Label } from "../Label";
import { FlexBox } from "../FlexBox";
import { Image } from "@repo/ui";

const BlogElement: React.FC<BlogElementProps> = ({
  type = "tile",
  title,
  categories,
  image,
  date,
  flex,
}) => {
  const { find: findCategories } = useCollection("Category");
  const imageId = image || "";

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
        <div css={imageContainerTile}>
          <Image
            id={imageId}
            style={{ width: "100%", height: "100%" }}
            hoverOnZoom
          />
        </div>
        <div>
          <div css={footerContainer}>
            <FlexBox
              direction="row"
              align="center"
              justify="flex-start"
              gap={settings.sizes.small}
            >
              {categories && categories.length > 0
                ? categories.map((category: string) => (
                    <Label text={findCategories(category)?.title || ""} key={category} color={settings.colors.primary} />
                  ))
                : null}
            </FlexBox>
            <div>
             <Label text={getDateString(date).date} color={settings.colors.grey}/>
            </div>
          </div>
          <div css={fontContainer}>
            <h3>{title}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div css={blogContainerHeader}>
      {articleLink}
      <div css={imageContainerHeader}>
        <Image id={imageId} style={{ width: "100%" }} hoverOnZoom />
      </div>
      <div css={mainContainerHeader}>
        <FlexBox
          direction="row"
          align="center"
          justify="flex-start"
          gap={settings.sizes.small}
        >
          {categories && categories.length > 0
            ? categories.map((category: string) => (
                <Label text={findCategories(category)?.title || ""} key={category} color={settings.colors.primary} />
              ))
            : null}
        </FlexBox>
        <h2>{title}</h2>
        <h3>{getDateString(date).date}</h3>
      </div>
    </div>
  );
};

export default BlogElement;
