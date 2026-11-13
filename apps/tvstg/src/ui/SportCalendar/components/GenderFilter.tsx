import React from "react";
import genders from "../constants/genders";
import { GenderFilterProps } from "../types";

const GenderFilter: React.FC<GenderFilterProps> = ({ gender, setGender }) => {
  return (
    <div className="field">
      <span className="field-label">Geschlecht</span>
      <div className="choice-row">
        {genders.map((gen) => (
          <button
            key={gen.value}
            type="button"
            className="btn-choice padded"
            aria-pressed={gender === gen.value}
            onClick={() => setGender(gen.value)}
          >
            {gen.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderFilter;
