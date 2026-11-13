import type { EventTime, Weekdays } from "@types";
import type { WeekDaysProps } from "./types";

export const WEEKDAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const satisfies readonly EventTime["weekday"][];

export const WEEKDAY_SHORT: Record<EventTime["weekday"], string> = {
  monday: "MO",
  tuesday: "DI",
  wednesday: "MI",
  thursday: "DO",
  friday: "FR",
  saturday: "SA",
  sunday: "SO",
};

export function berlinWeekday(value: string | number | Date = Date.now()): EventTime["weekday"] {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "long",
  })
    .format(new Date(value))
    .toLowerCase();
  return name as EventTime["weekday"];
}

export function countGroupsByWeekday(
  trainingszeiten: WeekDaysProps["trainingszeiten"],
): Record<EventTime["weekday"], number> {
  const groups = Object.fromEntries(
    WEEKDAY_ORDER.map((day) => [day, new Set<string>()]),
  ) as Record<EventTime["weekday"], Set<string>>;

  trainingszeiten.forEach((training) => {
    groups[training.weekday].add(training.group_id);
  });

  return Object.fromEntries(
    WEEKDAY_ORDER.map((day) => [day, groups[day].size]),
  ) as Record<EventTime["weekday"], number>;
}

export const weekdayLabels = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
] as const;

export function weekdaySortIndex(value: string): number {
  const index = weekdayLabels.findIndex((day) => day === value);
  return index >= 0 ? index : weekdayLabels.length;
}

export function groupByWeekday(
  trainingszeiten: WeekDaysProps["trainingszeiten"],
): Weekdays {
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
    if (!Object.keys(wochentage).includes(trainingszeit.weekday)) {
      wochentage[trainingszeit.weekday] = [{ ...trainingszeit }];
    } else {
      wochentage[trainingszeit.weekday].push(trainingszeit);
    }
  });
  return wochentage;
}

export function daysWithTimes(weekDays: Weekdays): string[] {
  return Object.keys(weekDays).filter(
    (day) => weekDays[day as keyof Weekdays].length > 0,
  );
}

export function activeWeekdayKeys(
  weekDays: Weekdays,
): EventTime["weekday"][] {
  return Object.keys(weekDays).filter(
    (day) => weekDays[day as keyof Weekdays].length > 0,
  ) as EventTime["weekday"][];
}
