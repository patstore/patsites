import React from "react";
import type { EventTime } from "@types";
import { getWeekday } from "@provider";
import { WEEKDAY_ORDER, WEEKDAY_SHORT } from "../weekDaysUtils";

type WeekdayButtonsProps = {
  counts: Record<EventTime["weekday"], number>;
  selected: EventTime["weekday"];
  onSelect: (weekday: EventTime["weekday"]) => void;
};

const WeekdayButtons: React.FC<WeekdayButtonsProps> = ({
  counts,
  selected,
  onSelect,
}) => {
  return (
    <div className="weekday-bar" role="group" aria-label="Wochentage">
      {WEEKDAY_ORDER.map((weekday) => {
        const count = counts[weekday];
        const isSelected = selected === weekday;
        return (
          <button
            key={weekday}
            type="button"
            className="btn-choice weekday"
            aria-pressed={isSelected}
            disabled={count === 0 && !isSelected}
            aria-label={`${getWeekday(weekday)}, ${count} Gruppen`}
            onClick={() => onSelect(weekday)}
          >
            <span className="label-short">{WEEKDAY_SHORT[weekday]}</span>
            <span className="label-full">{getWeekday(weekday)}</span>
            <span>({count})</span>
          </button>
        );
      })}
    </div>
  );
};

export default WeekdayButtons;
