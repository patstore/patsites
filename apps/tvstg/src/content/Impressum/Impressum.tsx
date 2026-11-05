import React from "react";
import { Layout, RenderContent } from "@components";
import { siteContainer, wrapper } from "@styles";
import { HeadContent } from "@ui";

const Impressum: React.FC = () => (
  <Layout>
    <div css={wrapper}>
      <HeadContent titel="Impressum" />
      <div css={[siteContainer]}>
        <RenderContent path="impressum" />
      </div>
    </div>
  </Layout>
);

export default Impressum;
