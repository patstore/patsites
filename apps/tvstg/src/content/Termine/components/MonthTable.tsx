import React from "react";
import months from "../constants/months";
import EventElementTable from "./EventElementTable";
import { sectionHeader } from "@styles";
import settings from "@settings";
import { FlexBox } from "@ui";
import {
  eventCategory,
  eventDate,
  eventInfo,
  eventName,
  eventPlace,
  eventTime,
} from "../styles";

const MonthTable: React.FC<{
  month: (typeof months)[number];
  year: number;
}> = ({ month, year }) => {
  return (
    <div>
      <div css={sectionHeader}>
        {month.name} {year}
      </div>
      <div
        css={{
          width: "100%",
          borderCollapse: "collapse",
          position: "relative",
          overflowX: "auto",
        }}
      >
        <FlexBox
          hasFullWidth
          direction="row"
          align="flex-end"
          justify="space-between"
        >
          <div css={eventName}>Event</div>
          <div css={eventCategory}>Kategorie</div>
          <div css={eventDate}>Datum</div>
          <div css={eventTime}>Zeit </div>
          <div css={eventPlace}>Ort</div>
          <div css={eventInfo}>Info</div>
        </FlexBox>
        {month.dates
          .sort((a, b) => {
            const aDate = a.date?.start ? new Date(a.date.start).getTime() : 0;
            const bDate = b.date?.start ? new Date(b.date.start).getTime() : 0;
            return aDate - bDate;
          })
          .map((value, index) => (
            <EventElementTable
              key={value.objectId}
              date={value}
              background={
                index % 2 === 0 ? "transparent" : settings.colors.light
              }
            />
          ))}
      </div>
    </div>
  );
};

export default MonthTable;
