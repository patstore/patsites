import { EventTime } from "@types";

export const getWeekday = (weekday: EventTime["weekday"]) => {
  switch (weekday) {
    case "monday":
      return "Montag";
    case "tuesday":
      return "Dienstag";
    case "wednesday":
      return "Mittwoch";
    case "thursday":
      return "Donnerstag";
    case "friday":
      return "Freitag";
    case "saturday":
      return "Samstag";
    case "sunday":
      return "Sonntag";
    default:
      return "";
  }
};
