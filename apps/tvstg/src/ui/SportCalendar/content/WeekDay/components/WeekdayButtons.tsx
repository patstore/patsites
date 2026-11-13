import React from "react";
import type { EventTime } from "@types";
import { getWeekday } from "@provider";
import { weekdayFilterBar, weekdayLabelFull, weekdayLabelShort } from "../../../styles";
import SquareChoiceButton from "../../../components/SquareChoiceButton";
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
    <div css={weekdayFilterBar} role="group" aria-label="Wochentage">
      {WEEKDAY_ORDER.map((weekday) => {
        const count = counts[weekday];
        const isSelected = selected === weekday;
        return (
          <SquareChoiceButton
            key={weekday}
            shape="weekday"
            selected={isSelected}
            disabled={count === 0 && !isSelected}
            ariaLabel={`${getWeekday(weekday)}, ${count} Gruppen`}
            label={
              <>
                <span css={weekdayLabelShort}>{WEEKDAY_SHORT[weekday]}</span>
                <span css={weekdayLabelFull}>{getWeekday(weekday)}</span>
                <span css={{ fontSize: "0.85em", fontWeight: 400 }}>({count})</span>
              </>
            }
            onClick={() => onSelect(weekday)}
          />
        );
      })}
    </div>
  );
};

export default WeekdayButtons;
