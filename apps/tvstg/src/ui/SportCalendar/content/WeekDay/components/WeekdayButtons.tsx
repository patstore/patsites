import React, { useCallback } from "react";
import { FlexBox, FullButton } from "@ui";
import { getWeekday } from "@provider";
import { EventTime } from "@types";
import { WeekDayButtonsProps } from "../types";
import settings from "@settings";

const WeekdayButtons: React.FC<WeekDayButtonsProps> = ({
  allWeekdays,
  weekDayButtons,
  setWeekDayButtons,
}) => {
  const buttonHandler = useCallback(
    (weekday: string) => {
      if (weekDayButtons.includes(weekday)) {
        setWeekDayButtons(weekDayButtons.filter((day) => day !== weekday));
      } else {
        setWeekDayButtons([...weekDayButtons, weekday]);
      }
    },
    [weekDayButtons],
  );

  return (
    <FlexBox direction="row" gap={settings.sizes.medium} wrap>
      {allWeekdays.map((weekday: EventTime["weekday"]) => (
        <FullButton
          text={getWeekday(weekday)}
          key={weekday}
          color={weekDayButtons.includes(weekday) ? "dark" : "white"}
          onClick={() => buttonHandler(weekday)}
          disabled={!allWeekdays.includes(weekday)}
        />
      ))}
    </FlexBox>
  );
};

export default WeekdayButtons;
