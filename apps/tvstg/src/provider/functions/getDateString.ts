import { getBerlinDateParts } from "./berlinTime";

export const getDateString = (datum: string | undefined | null | Date) => {
  if (!datum) return { date: "", time: "", dateTime: "" };

  const { year, month, day, hours, minutes: rawMinutes } = getBerlinDateParts(datum);
  const minutes = rawMinutes < 10 ? `0${rawMinutes}` : rawMinutes;
  return {
    date: `${day}.${month}.${year}`,
    time: `${hours}:${minutes}`,
    dateTime: `${day}.${month}.${year} ${hours}:${minutes}`,
  };
};

export default getDateString;
