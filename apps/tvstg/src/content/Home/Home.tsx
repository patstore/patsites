import React, { useMemo } from "react";
import { Layout, StreamedSidebar } from "@components";
import { useGetArticle } from "@provider";
import {
  mainContainer,
  sidebarContainer,
  siteContainer,
  wrapper,
} from "@styles";
import { BlogElement, FlexBox, Image, Sponsors, SportBanner } from "@ui";
import settings from "@settings";
import type { PatstoreData } from "@types";
import shopTeaser from "./images/marketing-teaser-970x250.jpg";

export const HOME_SIDEBAR_CATEGORY = "1cU4dGw1Mu";
export const HOME_ARTICLE_COUNT = 5;

const Home: React.FC<{ sidebar: Promise<PatstoreData> }> = ({ sidebar }) => {
  const { articles } = useGetArticle();

  const blogArray = useMemo(
    () =>
      articles
        .filter((article) => article.state === "published")
        .sort(
          (a, b) =>
            new Date(b?.date || "").getTime() - new Date(a?.date || "").getTime(),
        ),
    [articles],
  );

  return (
    <Layout>
      <div css={wrapper}>
        <div css={[siteContainer]}>
          <FlexBox direction="row" align="stretch" justify="space-between" wrap>
            <div css={mainContainer}>
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "1em",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <FlexBox
                  direction="row"
                  align="stretch"
                  justify="space-between"
                  wrap
                  gap={settings.sizes.medium}
                  styles={{ width: "100%" }}
                >
                  {blogArray.slice(0, HOME_ARTICLE_COUNT).map((value, index) => (
                    <BlogElement
                      flex={["100%", "45%"]}
                      type={index === 0 ? "header" : "tile"}
                      image={value.image}
                      categories={value.categories || []}
                      title={value.title}
                      date={value.date}
                      key={value.objectId}
                    />
                  ))}
                </FlexBox>
              </div>
              <div>
                <a
                  href="https://tvstg.fan12.de"
                  title="TV Freiburg St. Georgen Onlineshop"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={shopTeaser}
                    alt="TV Freiburg St. Georgen"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "800px",
                      marginTop: "2em",
                      borderRadius: "8px",
                    }}
                  />
                </a>
              </div>
            </div>
            <div css={sidebarContainer}>
              <StreamedSidebar
                data={sidebar}
                category={HOME_SIDEBAR_CATEGORY}
                showCalendar
                showNews
                displayAllNews
                displayAllEvents
              />
            </div>
          </FlexBox>
        </div>
      </div>
      <div css={siteContainer}>
        <Sponsors />
      </div>
      <div css={siteContainer}>
        <SportBanner />
      </div>
    </Layout>
  );
};

export default Home;
