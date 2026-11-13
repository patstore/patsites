import React from "react";
import { Layout, RenderContent } from "@components";
import { HeadContent } from "@ui";

const Impressum: React.FC = () => (
  <Layout>
    <div className="wrapper">
      <HeadContent titel="Impressum" />
      <div className="site-container">
        <RenderContent path="impressum" />
      </div>
    </div>
  </Layout>
);

export default Impressum;
