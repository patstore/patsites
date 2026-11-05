import React from "react";
import { Layout } from "@components";
import { HeadContent, SportCalendar, SportCalendarFilters } from "@ui";
import { siteContainer, wrapper } from "@styles";

const NO_CATEGORIES: string[] = [];

const Sportangebot: React.FC<{
  filters: SportCalendarFilters;
  onFiltersChange: (filters: Partial<SportCalendarFilters>) => void;
}> = ({ filters, onFiltersChange }) => (
  <Layout>
    <div css={wrapper}>
      <HeadContent titel="Unser Sportangebot" />
      <div css={siteContainer}>
        <SportCalendar
          categories={NO_CATEGORIES}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </div>
  </Layout>
);

export default Sportangebot;
