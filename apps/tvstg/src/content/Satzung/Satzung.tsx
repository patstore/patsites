import { Layout, RenderContent } from "@components";
import { HeadContent } from "@ui";
import React from "react";
import { useCollection } from "@provider";

const Satzung: React.FC = () => {
  const { items: webpages } = useCollection("Webpage");
  const webpage = webpages.find((page) => page?.path?.includes("satzung"));

  if (!webpage) {
    return null;
  }

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          smallContent
          titel={webpage.title}
          titeltext={webpage.subtitle}
        />
        <div className="site-container-small">
          <RenderContent path="/satzung" />
        </div>
      </div>
    </Layout>
  );
};
export default Satzung;
