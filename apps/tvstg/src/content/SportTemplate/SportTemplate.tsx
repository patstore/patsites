import React from "react";
import { Layout, StreamedSidebar } from "@components";
import {
  siteContainer,
  wrapper,
  sidebarContainer,
  mainContainer,
  sectionHeader,
} from "@styles";
import { FlexBox, HeadContent } from "@ui";
import Articles from "./components/Articles";
import { PatstoreCategory, PatstoreData } from "@types";
import Mannschaften from "./components/Teams";

const SportartenSeite: React.FC<{
  sport: PatstoreCategory;
  sidebar: Promise<PatstoreData>;
}> = ({ sport, sidebar }) => (
  <Layout>
    <div css={wrapper}>
      <HeadContent
        titel={sport.title ?? ""}
        titeltext={sport.description ?? ""}
        site={sport.title ?? ""}
      />
      <div css={siteContainer}>
        <FlexBox
          direction="row"
          align="flex-start"
          justify="space-between"
          changeToColumn
        >
          <div css={mainContainer}>
            <FlexBox
              direction="column"
              align="flex-start"
              justify="flex-start"
            >
              <div css={[sectionHeader, { marginTop: 0 }]}>
                Unsere neuesten Beiträge
              </div>
              <Articles category={sport.objectId} />
            </FlexBox>
            <div css={sectionHeader}>Unsere Mannschaften</div>
            <Mannschaften category={sport.objectId} />
          </div>
          <div css={sidebarContainer}>
            <StreamedSidebar
              data={sidebar}
              category={sport.objectId}
              showCalendar
              showNews
            />
          </div>
        </FlexBox>
      </div>
    </div>
  </Layout>
);

export default SportartenSeite;
