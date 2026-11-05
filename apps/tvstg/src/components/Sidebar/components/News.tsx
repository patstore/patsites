import React, { useMemo } from "react";
import settings from "@settings";
import { sidebarelement, sidebarElementContainer, sidebarHeader } from "../styles";
import { NewsProps } from "../types";
import { FlexBox, Label } from "@ui";
import { getDateString, useGetEntry } from "@provider";

const News: React.FC<NewsProps> = ({ category, displayAllNews = false }) => {
  const { entrys: news } = useGetEntry();

  const newsArray = useMemo(() => {
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const now = new Date();
    const actualNews = news.filter((value) => {
      if (!value?.date) return false;
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
      css={[
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        },
      ]}
    >
      <div css={sidebarHeader}>Jobbörse</div>
      {newsArray.length > 0 ? (
        <FlexBox
          direction="column"
          align="stretch"
          hasFullWidth
          gap={settings.sizes.medium}
        >
          {newsArray.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()).map((value) => (
            <div key={value.objectId} css={sidebarelement}>
              <div css={sidebarElementContainer(false)}>
                <p>
                  {getDateString(value.date!).date}
                </p>
                
              </div>
              <div css={sidebarElementContainer(true)}>
                <h4>{value.title}</h4>
                {value.text && (
                  <div dangerouslySetInnerHTML={{ __html: value.text }} />
                )}

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
