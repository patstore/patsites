/** German month abbreviations for filter buttons (uppercase). */
export const MONTH_SHORT_LABELS = [
  "JAN",
  "FEB",
  "MRZ",
  "APR",
  "MAI",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OKT",
  "NOV",
  "DEZ",
] as const;

export const MONTH_WINDOW_START_OFFSET = -3;
export const MONTH_WINDOW_END_OFFSET = 9;

export type YearMonth = { year: number; month: number };

export const shiftYearMonth = (
  year: number,
  month: number,
  offset: number,
): YearMonth => {
  const index = year * 12 + (month - 1) + offset;
  return {
    year: Math.floor(index / 12),
    month: (index % 12) + 1,
  };
};

export const buildMonthWindow = (anchor: YearMonth): YearMonth[] => {
  const result: YearMonth[] = [];
  for (
    let offset = MONTH_WINDOW_START_OFFSET;
    offset <= MONTH_WINDOW_END_OFFSET;
    offset++
  ) {
    result.push(shiftYearMonth(anchor.year, anchor.month, offset));
  }
  return result;
};

export const yearMonthKey = ({ year, month }: YearMonth) => `${year}-${month}`;
