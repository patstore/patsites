import React from "react";
import { PatstoreCategory } from "@types";
import { Layout } from "@components";
import { HeadContent, SportCalendar, SportCalendarFilters } from "@ui";

const Fachabteilung: React.FC<{
  fachabteilung: PatstoreCategory;
  filters: SportCalendarFilters;
  onFiltersChange: (filters: Partial<SportCalendarFilters>) => void;
}> = ({ fachabteilung, filters, onFiltersChange }) => (
  <Layout>
    <div className="wrapper">
      <HeadContent
        titel={fachabteilung.title ?? ""}
        titeltext={fachabteilung.description ?? ""}
        site={fachabteilung.title ?? ""}
      />

      <div className="site-container">
        <SportCalendar
          categories={[fachabteilung.objectId]}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </div>
    </div>
  </Layout>
);

export default Fachabteilung;
