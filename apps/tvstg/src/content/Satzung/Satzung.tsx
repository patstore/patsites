import { Layout, RenderContent } from "@components";
import { wrapper, siteContainerSmall } from "@styles";
import { HeadContent } from "@ui";
import React from "react";
import { useFindWebpage } from "@provider";

const Satzung: React.FC = () => {
  const webpage = useFindWebpage({ path: "satzung" });

  if (!webpage) {
    return null;
  }

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          smallContent
          titel={webpage.title}
          titeltext={webpage.subtitle}
        />
        <div css={siteContainerSmall}>
          <RenderContent path="/satzung" />
        </div>
      </div>
    </Layout>
  );
};
export default Satzung;
