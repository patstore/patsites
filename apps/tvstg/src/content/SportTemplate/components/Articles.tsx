import React, { useMemo } from "react";
import settings from "@settings";
import { useGetArticle } from "@provider";
import { BlogElement, FlexBox } from "@ui";

const Articles: React.FC<{ category: string }> = ({ category }) => {
  const { articles } = useGetArticle();

  const siteArticles = useMemo(
    () =>
      articles
        .filter((article) => article.categories.includes(category))
        .sort(
          (a, b) =>
            new Date(b.date || "").getTime() - new Date(a.date || "").getTime(),
        )
        .slice(0, 4),
    [articles, category],
  );

  return (
    <FlexBox
      direction="row"
      align="stretch"
      justify="flex-start"
      gap={settings.sizes.medium}
      wrap
    >
      {siteArticles.map((value) => (
        <BlogElement
          type="tile"
          image={value.image}
          categories={value.categories}
          title={value.title}
          date={value.date}
          key={value.objectId}
          flex={["1 1 300px"]}
        />
      ))}
    </FlexBox>
  );
};

export default Articles;
