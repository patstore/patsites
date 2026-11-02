import React, { useMemo, useState } from "react";
import { FilterButtonsProps } from "../types";
import { SwitchButton } from "@ui";
import { filterButtonsContainer } from "../styles";
import filter_array from "../constants/filter_array";

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div css={filterButtonsContainer}>
      <h4>Filter</h4>
      {filter_array.map((item) => (
        <SwitchButton
          key={item.value}
          text={item.label}
          initialState={filter}
          state={item}
          onClick={() => setFilter(item)}
        />
      ))}
    </div>
  );
};

export default FilterButtons;
