import React from "react";
import { Layout, Sidebar } from "@components";
import { HeadContent } from "@ui";
import Articles from "./components/Articles";
import { PatstoreCategory } from "@types";
import Mannschaften from "./components/Teams";
import styles from "./SportTemplate.module.css";

const SportartenSeite: React.FC<{
  sport: PatstoreCategory;
}> = ({ sport }) => (
  <Layout>
    <div className="wrapper">
      <HeadContent
        titel={sport.title ?? ""}
        titeltext={sport.description ?? ""}
        site={sport.title ?? ""}
      />
      <div className="site-container">
        <div className="page-row">
          <div className="main-column">
            <div className={`section-header ${styles.tight}`}>
              Unsere neuesten Beiträge
            </div>
            <Articles category={sport.objectId} />
            <div className="section-header">Unsere Mannschaften</div>
            <Mannschaften category={sport.objectId} />
          </div>
          <div className="sidebar-column">
            <Sidebar category={sport.objectId} showCalendar showNews />
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default SportartenSeite;
