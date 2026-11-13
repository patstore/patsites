import React from "react";
import { getWeekday } from "@provider";
import { FlexBox } from "@ui";
import TrainingCalendarElement from "./components/TrainingCalendarElement";
import { trainingGrid, trainingGridFrame, weekDayContainer } from "./styles";
import { WeekDayProps } from "./types";
import { weekDayStickyHeader } from "./styles";

const WeekDay: React.FC<WeekDayProps> = ({ weekday, trainingszeiten, view }) => {
  if (trainingszeiten.length === 0) {
    return null;
  }

  return (
    <div id={weekday} css={weekDayContainer}>
      <div css={weekDayStickyHeader}>{getWeekday(weekday)}</div>
      {view === "grid" ? (
        <div css={trainingGridFrame}>
        <div css={trainingGrid}>
          {trainingszeiten
            .sort((a, b) => a.start.localeCompare(b.start))
            .map((value) => (
              <TrainingCalendarElement
                key={value.id}
                training={value}
                view={view}
              />
            ))}
        </div>
        </div>
      ) : (
        <FlexBox direction="row" align="stretch" justify="flex-start" wrap hasFullWidth>
          {trainingszeiten
            .sort((a, b) => a.start.localeCompare(b.start))
            .map((value, index) => (
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
