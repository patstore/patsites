import React from "react";
import { AgeFilterProps } from "../types";

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
    <div className="field">
      <span className="field-label">Alter</span>
      <div className="choice-row">
        {agesObjects.map((ageObject) => (
          <button
            key={ageObject.label}
            type="button"
            className="btn-choice square"
            aria-pressed={age === ageObject.value}
            onClick={() => setAge(ageObject.value)}
          >
            {ageObject.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeFilter;
