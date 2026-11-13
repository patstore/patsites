import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { getDateString, slugify, useCollection } from "@provider";
import { Image } from "@repo/ui";
import { contentBlockStyles } from "../ContentBlock";
import { BlogElementProps } from "./types";
import styles from "./BlogElement.module.css";

const join = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const flexStyle = (flex?: string[]): CSSProperties => {
  const [base = "100%", sm = base, md = sm, lg = md, xl = lg] = flex ?? ["100%", "45%"];
  return {
    ["--blog-flex" as string]: base,
    ["--blog-flex-sm" as string]: sm,
    ["--blog-flex-md" as string]: md,
    ["--blog-flex-lg" as string]: lg,
    ["--blog-flex-xl" as string]: xl,
  };
};

const CategoryTags = ({ ids }: { ids: string[] }) => {
  const { find: findCategory } = useCollection("Category");

  if (ids.length === 0) {
    return null;
  }

  return (
    <div className={contentBlockStyles.tags}>
      {ids.map((id) => {
        const title = findCategory(id)?.title;
        if (!title) {
          return null;
        }
        return (
          <span key={id} className={contentBlockStyles.tag}>
            {title}
          </span>
        );
      })}
    </div>
  );
};

const BlogElement = ({
  type = "tile",
  title,
  categories,
  image,
  date,
  flex,
}: BlogElementProps) => {
  const imageId = image || "";
  const categoryIds = categories ?? [];
  const articleLink = (
    <Link
      to="/aktuelles/$slug"
      params={{ slug: slugify(title ?? "") }}
      className={styles.link}
    >
      {title}
    </Link>
  );

  if (type === "tile") {
    return (
      <div className={join(contentBlockStyles.block, styles.card)} style={flexStyle(flex)}>
        {articleLink}
        <div className={styles.image}>
          <Image id={imageId} alt={title ?? ""} style={{ width: "100%", height: "100%" }} hoverOnZoom />
        </div>
        <div>
          <div className={styles.footer}>
            <CategoryTags ids={categoryIds} />
            <p className={contentBlockStyles.muted}>{getDateString(date).date}</p>
          </div>
          <div className={styles.title}>
            <h3>{title}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      {articleLink}
      <div className={styles.headerImage}>
        <Image id={imageId} alt={title ?? ""} style={{ width: "100%" }} hoverOnZoom />
      </div>
      <div className={join(contentBlockStyles.block, styles.headerBody)}>
        <CategoryTags ids={categoryIds} />
        <h2>{title}</h2>
        <h3>{getDateString(date).date}</h3>
      </div>
    </div>
  );
};

export default BlogElement;
