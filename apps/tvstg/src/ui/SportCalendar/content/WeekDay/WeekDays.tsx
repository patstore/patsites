import React, { FC, useMemo, useState } from "react";

import settings from "@settings";
import WeekDay from "./WeekDay";
import { FlexBox } from "@ui";
import { calendarContainer } from "./styles";
import { EventTime, Weekdays } from "@types";
import WeekdayButtons from "./components/WeekdayButtons";
import { WeekDaysProps } from "./types";
import { searchInputContainer } from "../../styles";

const days = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

const sortSchema = (value: string) => {
  let number = 0;
  days.forEach((day, index) => {
    if (day === value) {
      number = index;
    }
  });

  return number;
};

const groupByWeekday = (trainingszeiten: WeekDaysProps["trainingszeiten"]) => {
    const wochentage: Weekdays = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    trainingszeiten.forEach((trainingszeit) => {
      if (
        wochentage &&
        !Object.keys(wochentage).includes(trainingszeit.weekday)
      ) {
        wochentage[trainingszeit.weekday] = [{ ...trainingszeit }];
      } else if (
        wochentage &&
        Object.keys(wochentage).includes(trainingszeit.weekday)
      ) {
        wochentage[trainingszeit.weekday].push(trainingszeit);
      }
    });
    return wochentage;
};

const daysWithTimes = (weekDays: Weekdays) =>
  Object.keys(weekDays).filter(
    (day) => weekDays[day as keyof Weekdays].length > 0,
  );

const WeekDays: FC<WeekDaysProps> = ({ trainingszeiten, view }) => {
  const weekDays = useMemo(() => groupByWeekday(trainingszeiten), [trainingszeiten]);

  const [weekDayButtons, setWeekDayButtons] = useState<string[]>(() =>
    daysWithTimes(weekDays),
  );
  const [shownFor, setShownFor] = useState(weekDays);
  if (shownFor !== weekDays) {
    setShownFor(weekDays);
    setWeekDayButtons(daysWithTimes(weekDays));
  }

  if (weekDays)
    return (
      <>
        <div css={searchInputContainer}>
          <label>Wochentage</label>
          <WeekdayButtons
            allWeekdays={
              Object.keys(weekDays).filter(
                (day) => weekDays[day as keyof Weekdays].length > 0,
              ) as EventTime["weekday"][]
            }
            weekDayButtons={weekDayButtons}
            setWeekDayButtons={setWeekDayButtons}
          />
        </div>

        <FlexBox
          direction="column"
          align="stretch"
          justify="space-between"
          gap={settings.sizes.medium}
          styles={calendarContainer}
        >
          {Object.keys(weekDays)
            .sort((a, b) => sortSchema(a) - sortSchema(b))
            .map(
              (dayKey) =>
                weekDayButtons.includes(dayKey) && (
                  <WeekDay
                    key={dayKey as keyof Weekdays}
                    weekday={dayKey as keyof Weekdays}
                    trainingszeiten={weekDays[dayKey as keyof Weekdays]}
                    view={view}
                  />
                ),
            )}
        </FlexBox>
      </>
    );
  return null;
};

export default WeekDays;
