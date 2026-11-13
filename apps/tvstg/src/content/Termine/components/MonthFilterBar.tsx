import React, { useMemo } from "react";
import {
  buildMonthWindow,
  MONTH_SHORT_LABELS,
  yearMonthKey,
  type YearMonth,
} from "../constants/monthShortLabels";
import { monthFilterBar, monthFilterButton } from "../styles";
import { getBerlinDateParts } from "@provider";
import type { PatstoreDate } from "@types";

type MonthFilterBarProps = {
  calendar: PatstoreDate[];
  selected: YearMonth;
  onSelect: (value: YearMonth) => void;
};

const MonthFilterBar: React.FC<MonthFilterBarProps> = ({
  calendar,
  selected,
  onSelect,
}) => {
  const anchor = useMemo(() => getBerlinDateParts(Date.now()), []);

  const eventCounts = useMemo(() => {
    const counts = new Map<string, number>();
    calendar.forEach((termin) => {
      if (!termin.date?.start) {
        return;
      }
      const parts = getBerlinDateParts(termin.date.start);
      const key = yearMonthKey(parts);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return counts;
  }, [calendar]);

  const months = useMemo(() => buildMonthWindow(anchor), [anchor]);

  const selectedKey = yearMonthKey(selected);

  return (
    <div css={monthFilterBar} role="group" aria-label="Monate filtern">
      {months.map((entry) => {
        const key = yearMonthKey(entry);
        const count = eventCounts.get(key) ?? 0;
        const isDisabled = count === 0;
        const isSelected = key === selectedKey;
        const variant = isDisabled
          ? "disabled"
          : isSelected
            ? "selected"
            : "default";

        return (
          <button
            key={key}
            type="button"
            disabled={isDisabled}
            aria-pressed={isSelected}
            css={monthFilterButton(variant)}
            onClick={() => onSelect(entry)}
          >
            <span>{MONTH_SHORT_LABELS[entry.month - 1]}</span>
            <span css={{ fontSize: "0.7em", fontWeight: 400 }}>({count})</span>
          </button>
        );
      })}
    </div>
  );
};

export default MonthFilterBar;
