import React from "react";
import settings from "@settings";
import { Layout, RenderContent, RenderForm } from "@components";
import { sectionHeader, siteContainer, wrapper } from "@styles";
import { FlexBox, HeadContent } from "@ui";
import { mainContainer, sidebarContainer } from "@styles";
import { sidebarHeader, sidebarContent } from "@components";
import { useFindWebpage } from "@provider";
import { useCollection } from "@provider";

const Kontakt: React.FC = () => {
  const webpage = useFindWebpage({ path: "kontakt" });
  const { items: forms } = useCollection("Form");
  const form = forms.find((form) => form.title === "Kontaktformular");

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          titel={webpage?.title as string}
          titeltext={webpage?.subtitle}
        />
        <div css={siteContainer}>
          <FlexBox
            direction="row"
            align="flex-start"
            justify="space-between"
            wrap
          >
            <div css={mainContainer}>
              <div css={[sectionHeader, { marginTop: 0 }]}>Kontaktformular</div>
              {form && (
                <RenderForm
                  form={form}
                  initialValues={{}}
                  onSubmit={() => {
                    return null;
                  }}
                  buttonStyles={{
                    backgroundColor: settings.colors.dark,
                    color: settings.colors.light,
                  }}
                  buttonText="Formular absenden"
                  hasHoneypot
                />
              )}
            </div>
            <div css={sidebarContainer}>
              <div css={sidebarHeader}>Kontakt</div>
              <div css={sidebarContent}>
                <div>
                  <RenderContent contentId="contact_page" />
                </div>
              </div>
            </div>
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};
export default Kontakt;
