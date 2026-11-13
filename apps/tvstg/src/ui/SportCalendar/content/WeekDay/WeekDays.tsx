import React, { FC, useMemo } from "react";

import settings from "@settings";
import WeekDay from "./WeekDay";
import { FlexBox } from "@ui";
import { weekDaysList } from "./styles";
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
      gap={settings.sizes.medium}
      styles={weekDaysList}
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
