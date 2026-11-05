import React from "react";
import { Layout, RenderContent } from "@components";
import { HeadContent, SportBanner } from "@ui";
import { siteContainer, wrapper } from "@styles";
import { vereinsContainer } from "./styles";

const Verein: React.FC = () => {
  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          titel="Über den Verein"
          titeltext="In aller Kürze das Wesentliche über den Verein. "
          smallContent
        />
        <div css={[siteContainer, vereinsContainer]}>
          <RenderContent path="vorstand" />
        </div>
      </div>
      <div css={wrapper}>
        <div css={siteContainer}>
          <SportBanner />
        </div>
      </div>
    </Layout>
  );
};
export default Verein;
