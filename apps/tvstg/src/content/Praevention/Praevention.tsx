import React from "react";
import { useCollection } from "@provider";
import { Layout, RenderContent } from "@components";
import { ContactPerson, HeadContent } from "@ui";
import styles from "./Praevention.module.css";

const Praevention: React.FC = () => {
  const { items: persons } = useCollection("Person");
  const { items: webpages } = useCollection("Webpage");
  const webpage = webpages.find((page) => page?.path?.includes("praevention"));
  const { items: downloads } = useCollection("Download");
  const praeventionDownloads = downloads.filter((download) => download.categories.includes("3zUkKuH1v8")) || [];
  const praPersons = persons.filter((person) =>
    person?.categories?.includes("7wjIlSmQ8x"),
  );

  if (!webpage) {
    return null;
  }

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          titel={webpage.title || "Prävention"}
          titeltext={webpage.subtitle}
        />
        <div className="site-container">
          <div className="page-row">
            <div className="main-column">
              <RenderContent path="/verein/praevention" />
            </div>
            <div className="sidebar-column">
              <div className="section-header flush">Ansprechpartner:Innen</div>
              <div className={styles.sidebarBody}>
                {praPersons.map((value) => (
                  <ContactPerson person={value} key={value.objectId} />
                ))}
              </div>
              <div className="section-header flush">Dokumente</div>
              {praeventionDownloads?.map((download) => (
                <a
                  key={download.objectId}
                  target="__blank"
                  href={download.file?.url || ""}
                  className={styles.docLink}
                >
                  {download.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Praevention;
