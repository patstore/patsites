import { EventTime, TrainingTime } from "@types";

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
  striped?: boolean;
};

export type WeekDaysProps = {
  trainingszeiten: TrainingTime[];
  view: CalendarView;
  selectedWeekday: EventTime["weekday"];
};
