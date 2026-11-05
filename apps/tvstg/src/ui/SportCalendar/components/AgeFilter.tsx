import React from "react";
import { AgeFilterProps } from "../types";
import { SwitchButton } from "../../SwitchButton";
import { searchInputContainer } from "../styles";

const AgeFilter: React.FC<AgeFilterProps> = ({ ages, age, setAge }) => {
  const agesObjects: { value: number | null; label: string }[] = React.useMemo(
    () => [
      { value: null, label: "Alle" },
      ...ages.map((ageValue) => {
        const ageObject = {
          value: ageValue,
          label: ageValue === 19 ? "19+" : ageValue.toString(),
        };
        return ageObject;
      }),
    ],
    [ages],
  );

  return (
    <div css={searchInputContainer}>
      <label>Alter</label>
      <div>
        {agesObjects.map((ageObject) => {
          return (
            <SwitchButton
              text={ageObject.label}
              key={ageObject.value}
              initialState={ageObject}
              state={
                agesObjects.find(
                  (ag) => ag.value === age,
                ) as (typeof agesObjects)[number]
              }
              onClick={() => setAge(ageObject.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AgeFilter;
