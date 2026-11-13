import React, { useMemo } from "react";
import {
  buildMonthWindow,
  MONTH_SHORT_LABELS,
  yearMonthKey,
  type YearMonth,
} from "../constants/monthShortLabels";
import { getBerlinDateParts } from "@provider";
import type { PatstoreDate } from "@types";
import styles from "../Termine.module.css";

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
    <div className={`choice-row ${styles.filterBar}`} role="group" aria-label="Monate filtern">
      {months.map((entry) => {
        const key = yearMonthKey(entry);
        const count = eventCounts.get(key) ?? 0;
        const isDisabled = count === 0;
        const isSelected = key === selectedKey;

        return (
          <button
            key={key}
            type="button"
            disabled={isDisabled}
            aria-pressed={isSelected}
            className="btn-choice square"
            onClick={() => onSelect(entry)}
          >
            <span>{MONTH_SHORT_LABELS[entry.month - 1]}</span>
            <span className={styles.count}>({count})</span>
          </button>
        );
      })}
    </div>
  );
};

export default MonthFilterBar;
