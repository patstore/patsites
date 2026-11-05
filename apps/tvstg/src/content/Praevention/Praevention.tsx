import React from "react";
import { useFindWebpage, useGetPerson } from "@provider";
import { Layout, RenderContent } from "@components";
import { wrapper, siteContainer, mainContainer } from "@styles";
import { ContactPerson, FlexBox, HeadContent } from "@ui";
import { sidebarContainer } from "../../styles/styles";
import { sidebarHeader, sidebarContent } from "../../components/Sidebar/styles";
import { useGetDownload } from "@provider";

const Praevention: React.FC = () => {
  const { persons } = useGetPerson();
  const webpage = useFindWebpage({ path: "praevention" });
  const { downloads } = useGetDownload();
  const praeventionDownloads = downloads.filter((download) => download.categories.includes("3zUkKuH1v8")) || [];
  const praPersons = persons.filter((person) =>
    person?.categories?.includes("7wjIlSmQ8x"),
  );

  if (!webpage) {
    return null;
  }

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          titel={webpage.title || "Prävention"}
          titeltext={webpage.subtitle}
        />
        <div css={siteContainer}>
          <FlexBox
            direction="row"
            align="flex-start"
            justify="space-between"
            changeToColumn
          >
            <div css={mainContainer}>
              <RenderContent path="/verein/praevention" />
            </div>
            <div css={sidebarContainer}>
              <div css={sidebarHeader}>Ansprechpartner:Innen</div>
              <div css={sidebarContent}>
                {praPersons.map((value) => (
                  <ContactPerson person={value} key={value.objectId} />
                ))}
              </div>
              <div css={sidebarHeader}>Dokumente</div>
              {
                praeventionDownloads?.map((download) => (
                  <a
                    key={download.objectId}
                    target="__blank"
                    href={download.file?.url || ""}
                    css={{ textDecoration: "underline" }}
                  >
                    {download.title}
                  </a>
                ))
              }
             
            </div>
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};
export default Praevention;
