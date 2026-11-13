import React from "react";
import { AgeFilterProps } from "../types";
import { choiceButtonRow, label, sidebarFilterField } from "../styles";
import SquareChoiceButton from "./SquareChoiceButton";

const AgeFilter: React.FC<AgeFilterProps> = ({ ages, age, setAge }) => {
  const agesObjects: { value: number | null; label: string }[] = React.useMemo(
    () => [
      { value: null, label: "Alle" },
      ...ages.map((ageValue) => ({
        value: ageValue,
        label: ageValue === 19 ? "19+" : ageValue.toString(),
      })),
    ],
    [ages],
  );

  return (
    <div css={sidebarFilterField}>
      <span css={label}>Alter</span>
      <div css={choiceButtonRow}>
        {agesObjects.map((ageObject) => (
          <SquareChoiceButton
            key={ageObject.label}
            shape="filter-square"
            label={ageObject.label}
            selected={age === ageObject.value}
            onClick={() => setAge(ageObject.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgeFilter;
