import React, { useState } from "react";
import { AiOutlineAppstore, AiOutlineUnorderedList } from "react-icons/ai";
import settings from "@settings";
import { FlexBox } from "../FlexBox";
import { SwitchButton } from "../SwitchButton";
import { calendarContainer, searchInputContainer, viewSwitchContainer } from "./styles";
import WeekDays from "./content/WeekDay";
import { CalendarView } from "./content/WeekDay/types";
import useGetTrainingTimes from "./hooks/useGetTrainingTimes";
import { useDebounceCallback } from "usehooks-ts";
import { Divider } from "../Divider";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
import { SportCalendarFilters } from "./filters";

const VIEWS = [
  { value: "list", label: "Listenansicht", icon: <AiOutlineUnorderedList size={18} /> },
  { value: "grid", label: "Kachelansicht", icon: <AiOutlineAppstore size={18} /> },
] satisfies { value: CalendarView; label: string; icon: React.ReactNode }[];

type SportKalenderProps = {
  categories: string[];
  filters: SportCalendarFilters;
  onFiltersChange: (filters: Partial<SportCalendarFilters>) => void;
};

const SportKalender: React.FC<SportKalenderProps> = ({
  categories = [],
  filters,
  onFiltersChange,
}) => {
  const { trainingszeiten, ages } = useGetTrainingTimes({
    categories,
    searchValue: filters.suche,
    age: filters.alter ?? null,
    gender: filters.geschlecht,
  });

  const setSearch = useDebounceCallback(
    (suche: string) => onFiltersChange({ suche }),
    500,
  );
  const [view, setView] = useState<CalendarView>("list");
  const activeView = VIEWS.find((option) => option.value === view)!;

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div css={{ width: "100%" }}>
        <div css={viewSwitchContainer} role="group" aria-label="Ansicht">
          {VIEWS.map((option) => (
            <SwitchButton
              key={option.value}
              text={option.icon}
              ariaLabel={option.label}
              initialState={option}
              state={activeView}
              onClick={() => setView(option.value)}
            />
          ))}
        </div>
        <div css={searchInputContainer}>
          <label htmlFor="sport-calendar-search">Suche</label>
          <input
            id="sport-calendar-search"
            type="search"
            defaultValue={filters.suche}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suche ..."
          />
        </div>
        <GenderFilter
          gender={filters.geschlecht}
          setGender={(geschlecht) => onFiltersChange({ geschlecht })}
        />
        <AgeFilter
          ages={ages}
          age={filters.alter ?? null}
          setAge={(alter) => onFiltersChange({ alter: alter ?? undefined })}
        />
        <Divider />
        <FlexBox
          direction="column"
          align="stretch"
          justify="space-between"
          gap={settings.sizes.medium}
          styles={calendarContainer}
          wrap
          hasFullWidth
        >
          <WeekDays key="weekdays" trainingszeiten={trainingszeiten} view={view} />
        </FlexBox>
      </div>
    </div>
  );
};

export default SportKalender;
