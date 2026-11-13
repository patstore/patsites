import React from "react";
import { Layout } from "@components";
import { HeadContent, SportCalendar, SportCalendarFilters } from "@ui";

const NO_CATEGORIES: string[] = [];

const Sportangebot: React.FC<{
  filters: SportCalendarFilters;
  onFiltersChange: (filters: Partial<SportCalendarFilters>) => void;
}> = ({ filters, onFiltersChange }) => (
  <Layout>
    <div className="wrapper">
      <HeadContent titel="Unser Sportangebot" />
      <div className="site-container">
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
