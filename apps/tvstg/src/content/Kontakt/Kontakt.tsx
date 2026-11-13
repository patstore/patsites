import React from "react";
import { Layout, RenderContent, RenderForm } from "@components";
import { FlexBox, HeadContent } from "@ui";
import { useCollection } from "@provider";
import styles from "./Kontakt.module.css";

const Kontakt: React.FC = () => {
  const { items: webpages } = useCollection("Webpage");
  const webpage = webpages.find((page) => page?.path?.includes("kontakt"));
  const { items: forms } = useCollection("Form");
  const form = forms.find((form) => form.title === "Kontaktformular");

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          titel={webpage?.title as string}
          titeltext={webpage?.subtitle}
        />
        <div className="site-container">
          <div className="page-row">
            <div className="main-column">
              <div className={`section-header ${styles.tight}`}>Kontaktformular</div>
              {form && (
                <RenderForm
                  form={form}
                  initialValues={{}}
                  onSubmit={() => {
                    return null;
                  }}
                  buttonText="Formular absenden"
                  hasHoneypot
                />
              )}
            </div>
            <div className="sidebar-column">
              <div className="section-header flush">Kontakt</div>
              <div className={styles.sidebarBody}>
                <div>
                  <RenderContent contentId="contact_page" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Kontakt;
