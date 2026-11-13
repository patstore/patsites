import React from "react";
import { Layout, RenderContent } from "@components";
import { HeadContent, SportBanner } from "@ui";
import styles from "./Verein.module.css";

const Verein: React.FC = () => {
  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          titel="Über den Verein"
          titeltext="In aller Kürze das Wesentliche über den Verein. "
          smallContent
        />
        <div className={`site-container-small ${styles.intro}`}>
          <RenderContent path="vorstand" />
        </div>
      </div>
      <div className="wrapper">
        <div className="site-container">
          <SportBanner />
        </div>
      </div>
    </Layout>
  );
};
export default Verein;
