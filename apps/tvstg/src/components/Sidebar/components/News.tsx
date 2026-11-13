import React, { useMemo } from "react";
import settings from "@settings";
import { sidebarElement, sidebarElementContainer, sidebarElementContent, sidebarElementHeader, sidebarHeader } from "../styles";
import { NewsProps } from "../types";
import { Button, FlexBox, Label } from "@ui";
import { getDateString, useCollection } from "@provider";
import { Link } from "@tanstack/react-router";

const News: React.FC<NewsProps> = ({ category, displayAllNews = false }) => {
  const { items: news } = useCollection("Entry");

  console.log(news);

  const newsArray = useMemo(() => {
    const sixtyDaysAgo = new Date();  
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const now = new Date();
    const actualNews = news.filter((value) => {
      if (!value?.date) return false;
      if (!value.categories?.includes("YLHdF8iCjA")) return false;
      const newsDate = new Date(value.date);
      return newsDate <= now && newsDate >= sixtyDaysAgo;
    });
    if (displayAllNews) {
      return actualNews.slice(0, 5);
    }
    if (category) {
      return actualNews
        .filter((value) => value?.categories?.includes(category))
        .slice(0, 5);
    }
    return [];
  }, [news, category, displayAllNews]);

  return (
    <div
        css={sidebarElement}
    >
      <div css={sidebarElementHeader}>Jobbörse</div>
      {newsArray.length > 0 ? (
        <FlexBox
          direction="column"
          align="stretch"
          hasFullWidth
          gap={settings.sizes.medium}
          styles={{padding: settings.padding.small}}
        >
          {newsArray.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()).map((value) => (
            <div key={value.objectId} css={sidebarElementContent}>
                <Label text={getDateString(value.date!).date} color={settings.colors.primary} />
                <h4>{value.title}</h4>
                <div css={{marginTop: settings.sizes.large}}>
                  <Link to={`/jobboerse`} hash={value.slug} css={{textDecoration: "none !important"}}>
                    <Button text="Mehr erfahren" onClick={() => (`/news/${value.objectId}`)} />
                  </Link>
              </div>
              
            </div>
          ))}
        </FlexBox>
      ) : (
        <div>
          <p>Hier gibt es gerade keine Neuigkeiten</p>
        </div>
      )}
    </div>
  );
};

export default News;
