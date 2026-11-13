import React, { FC, useMemo } from "react";
import WeekDay from "./WeekDay";
import { FlexBox } from "@ui";
import type { EventTime } from "@types";
import { WeekDaysProps } from "./types";
import { groupByWeekday, weekdaySortIndex } from "./weekDaysUtils";

const WeekDays: FC<WeekDaysProps> = ({ trainingszeiten, view, selectedWeekday }) => {
  const weekDays = useMemo(() => groupByWeekday(trainingszeiten), [trainingszeiten]);

  if (!weekDays) {
    return null;
  }

  return (
    <FlexBox
      direction="column"
      align="stretch"
      justify="space-between"
      gap="12px"
      style={{ width: "100%" }}
      hasFullWidth
    >
      {Object.keys(weekDays)
        .sort((a, b) => weekdaySortIndex(a) - weekdaySortIndex(b))
        .map(
          (dayKey) =>
            dayKey === selectedWeekday && (
              <WeekDay
                key={dayKey}
                weekday={dayKey as EventTime["weekday"]}
                trainingszeiten={weekDays[dayKey as keyof typeof weekDays]}
                view={view}
              />
            ),
        )}
    </FlexBox>
  );
};

export default WeekDays;
