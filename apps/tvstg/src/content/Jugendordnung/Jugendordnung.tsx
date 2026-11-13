import { Layout, RenderContent } from "@components";
import { HeadContent } from "@ui";
import React from "react";
import { useCollection } from "@provider";

const Jugendordnung: React.FC = () => {
  const { items: webpages } = useCollection("Webpage");
  const webpage = webpages.find((page) => page?.path?.includes("/jugendordnung"));

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
          <RenderContent path="/jugendordnung" />
        </div>
      </div>
    </Layout>
  );
};
export default Jugendordnung;
