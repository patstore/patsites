import React from "react";
import { getWeekday } from "@provider";
import { FlexBox } from "@ui";
import TrainingCalendarElement from "./components/TrainingCalendarElement";
import { WeekDayProps } from "./types";
import styles from "./WeekDay.module.css";

const WeekDay: React.FC<WeekDayProps> = ({ weekday, trainingszeiten, view }) => {
  if (trainingszeiten.length === 0) {
    return null;
  }

  const items = [...trainingszeiten].sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div id={weekday} className={styles.day}>
      <div className={`section-header ${styles.header}`}>{getWeekday(weekday)}</div>
      {view === "grid" ? (
        <div className={styles.frame}>
          <div className={styles.grid}>
            {items.map((value) => (
              <TrainingCalendarElement key={value.id} training={value} view={view} />
            ))}
          </div>
        </div>
      ) : (
        <FlexBox direction="row" align="stretch" justify="flex-start" wrap hasFullWidth>
          {items.map((value, index) => (
            <TrainingCalendarElement
              key={value.id}
              training={value}
              view={view}
              striped={index % 2 === 1}
            />
          ))}
        </FlexBox>
      )}
    </div>
  );
};

export default WeekDay;
