const TIME_ZONE = "Europe/Berlin";

const formatter = new Intl.DateTimeFormat("de-DE", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

export type BerlinDateParts = {
  year: number;
  /** 1-12 */
  month: number;
  day: number;
  hours: number;
  minutes: number;
};

/**
 * Calendar parts in the club's time zone, so server-rendered and hydrated
 * markup agree regardless of the runtime's local zone.
 */
export const getBerlinDateParts = (value: string | number | Date): BerlinDateParts => {
  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date(value))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hours: parts.hour,
    minutes: parts.minute,
  };
};
