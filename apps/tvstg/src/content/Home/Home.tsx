import React, { useMemo } from "react";
import { Layout, Sidebar } from "@components";
import { useCollection } from "@provider";
import { BlogElement, Sponsors, SportBanner } from "@ui";
import shopTeaser from "./images/marketing-teaser-970x250.jpg";
import HomeAppointments from "./components/HomeAppointments";
import HomeStickySidebar from "./components/HomeStickySidebar";
import { HOME_ARTICLE_COUNT, HOME_SIDEBAR_CATEGORY } from "./constants";
import styles from "./Home.module.css";

export { HOME_ARTICLE_COUNT, HOME_SIDEBAR_CATEGORY } from "./constants";

const Home: React.FC = () => {
  const { items: articles } = useCollection("Article");

  const blogArray = useMemo(
    () =>
      [...articles].sort(
        (a, b) =>
          new Date(b?.date || "").getTime() - new Date(a?.date || "").getTime(),
      ),
    [articles],
  );

  return (
    <Layout>
      <div className="wrapper">
        <div className="site-container">
          <div className="page-row">
            <div className={`main-column ${styles.gap}`}>
              <div className={styles.articles}>
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
              </div>

              <HomeAppointments />

              <div>
                <a
                  href="https://tvstg.fan12.de"
                  title="TV Freiburg St. Georgen Onlineshop"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={shopTeaser}
                    alt="TV Freiburg St. Georgen"
                    className={styles.teaser}
                  />
                </a>
              </div>
            </div>
            <div className={`sidebar-column ${styles.sidebar}`}>
              <HomeStickySidebar>
                <div className={styles.sidebarInner}>
                  <Sidebar
                    category={HOME_SIDEBAR_CATEGORY}
                    showCalendar={false}
                    showNews
                    displayAllNews
                  />
                </div>
              </HomeStickySidebar>
            </div>
          </div>
        </div>
      </div>
      <div className="site-container">
        <Sponsors />
      </div>
      <div className="site-container">
        <SportBanner />
      </div>
    </Layout>
  );
};

export default Home;
