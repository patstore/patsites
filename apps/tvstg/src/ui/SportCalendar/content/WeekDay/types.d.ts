import { EventTime, TrainingTime } from "@types";
import WeekDay from "./WeekDay";
import { ReactNode } from "react";

/** `list` shows table-like rows on desktop; smaller screens always get cards. */
export type CalendarView = "list" | "grid";

export type WeekDayProps = {
  weekday: EventTime["weekday"];
  trainingszeiten: TrainingTime[];
  view: CalendarView;
};

export type TrainingCalendarElementProps = {
  training: TrainingTime;
  view: CalendarView;
};

export type WeekDayButtonsProps = {
  weekDayButtons: string[];
  setWeekDayButtons: React.Dispatch<React.SetStateAction<string[]>>;
  allWeekdays: EventTime["weekday"][];
};

export type WeekDaysProps = {
  trainingszeiten: TrainingTime[];
  view: CalendarView;
};
