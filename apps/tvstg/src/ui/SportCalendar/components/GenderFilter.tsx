import React from "react";
import { SwitchButton } from "@ui";
import genders from "../constants/genders";
import { GenderFilterProps } from "../types";
import { searchInputContainer } from "../styles";

const GenderFilter: React.FC<GenderFilterProps> = ({ gender, setGender }) => {
  return (
    <div css={searchInputContainer}>
      <label>Geschlecht</label>
      <div>
        {genders.map((gen) => {
          return (
            <SwitchButton
              text={gen.label}
              key={gen.value}
              initialState={gen}
              state={
                genders.find(
                  (gend) => gend.value === gender,
                ) as (typeof genders)[number]
              }
              onClick={() => setGender(gen.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GenderFilter;
