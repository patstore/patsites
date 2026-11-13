import React from "react";
import months from "../constants/months";
import EventElementTable from "./EventElementTable";
import { FlexBox } from "@ui";
import styles from "../Termine.module.css";

const MonthTable: React.FC<{
  month: (typeof months)[number];
  year: number;
}> = ({ month, year }) => {
  return (
    <div>
      <div className="section-header">
        {month.name} {year}
      </div>
      <div className={styles.scroll}>
        <FlexBox
          hasFullWidth
          direction="row"
          align="flex-end"
          justify="space-between"
        >
          <div className={`${styles.col} ${styles.name}`}>Event</div>
          <div className={`${styles.col} ${styles.category}`}>Kategorie</div>
          <div className={`${styles.col} ${styles.date}`}>Datum</div>
          <div className={`${styles.col} ${styles.time}`}>Zeit </div>
          <div className={`${styles.col} ${styles.place}`}>Ort</div>
          <div className={`${styles.col} ${styles.info}`}>Info</div>
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
              striped={index % 2 !== 0}
            />
          ))}
      </div>
    </div>
  );
};

export default MonthTable;
