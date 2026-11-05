import React from "react";
import { getWeekday } from "@provider";
import { FlexBox, Label } from "@ui";
import TrainingCalendarElement from "./components/TrainingCalendarElement";
import { weekDayContainer } from "./styles";
import { WeekDayProps } from "./types";
import { sectionHeader } from "@styles";

const WeekDay: React.FC<WeekDayProps> = ({ weekday, trainingszeiten, view }) => {
  if (trainingszeiten.length === 0) {
    return null;
  }

  return (
    <div id={weekday} css={weekDayContainer}>
      <div css={sectionHeader}>{getWeekday(weekday)} </div>
      <FlexBox
        direction="row"
        align="stretch"
        justify="flex-start"
        // styles={{ gap: ["12px"] }}
        wrap
      >
        {trainingszeiten
          .sort((a, b) => a.start.localeCompare(b.start))
          .map((value) => (
            <TrainingCalendarElement key={value.id} training={value} view={view} />
          ))}
      </FlexBox>
    </div>
  );
};

export default WeekDay;
