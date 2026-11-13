import React from "react";
import genders from "../constants/genders";
import { GenderFilterProps } from "../types";
import { choiceButtonRow, label, sidebarFilterField } from "../styles";
import SquareChoiceButton from "./SquareChoiceButton";

const GenderFilter: React.FC<GenderFilterProps> = ({ gender, setGender }) => {
  return (
    <div css={sidebarFilterField}>
      <span css={label}>Geschlecht</span>
      <div css={choiceButtonRow}>
        {genders.map((gen) => (
          <SquareChoiceButton
            key={gen.value}
            shape="filter-padded"
            label={gen.label}
            selected={gender === gen.value}
            onClick={() => setGender(gen.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenderFilter;
