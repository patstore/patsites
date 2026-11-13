import React, { useMemo } from "react";
import { Layout, Sidebar } from "@components";
import { useCollection } from "@provider";
import {
  mainContainer,
  sidebarContainer,
  siteContainer,
  wrapper,
} from "@styles";
import { BlogElement, FlexBox, Image, Sponsors, SportBanner } from "@ui";
import settings from "@settings";
import shopTeaser from "./images/marketing-teaser-970x250.jpg";
import HomeAppointments from "./components/HomeAppointments";
import HomeStickySidebar from "./components/HomeStickySidebar";
import { HOME_ARTICLE_COUNT, HOME_SIDEBAR_CATEGORY } from "./constants";
import {
  homeSectionGap,
  homeSidebarColumn,
  homeSidebarInner,
  homeTwoColumnRow,
} from "./styles";

export { HOME_ARTICLE_COUNT, HOME_SIDEBAR_CATEGORY } from "./constants";

const Home: React.FC = () => {
  const { items: articles } = useCollection("Article");

  const blogArray = useMemo(
    () =>
      articles
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
          <FlexBox
            direction="row"
            align="flex-start"
            justify="space-between"
            wrap
            styles={homeTwoColumnRow}
          >
            <div css={[mainContainer, homeSectionGap]}>
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

              <HomeAppointments />

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
                    }}
                  />
                </a>
              </div>
            </div>
            <div css={[sidebarContainer, homeSidebarColumn]}>
              <HomeStickySidebar>
                <div css={homeSidebarInner}>
                  <Sidebar
                    category={HOME_SIDEBAR_CATEGORY}
                    showCalendar={false}
                    showNews
                    displayAllNews
                  />
                </div>
              </HomeStickySidebar>
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
