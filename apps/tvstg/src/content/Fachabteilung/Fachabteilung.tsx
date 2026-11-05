import React from "react";
import { PatstoreCategory } from "@types";
import { Layout } from "@components";
import { siteContainer, wrapper } from "@styles";
import { FlexBox, HeadContent, SportCalendar, SportCalendarFilters } from "@ui";

const Fachabteilung: React.FC<{
  fachabteilung: PatstoreCategory;
  filters: SportCalendarFilters;
  onFiltersChange: (filters: Partial<SportCalendarFilters>) => void;
}> = ({ fachabteilung, filters, onFiltersChange }) => (
  <Layout>
    <div css={wrapper}>
      <HeadContent
        titel={fachabteilung.title ?? ""}
        titeltext={fachabteilung.description ?? ""}
        site={fachabteilung.title ?? ""}
      />

      <div css={siteContainer}>
        <FlexBox direction="column">
          <SportCalendar
            categories={[fachabteilung.objectId]}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </FlexBox>
      </div>
    </div>
  </Layout>
);

export default Fachabteilung;
