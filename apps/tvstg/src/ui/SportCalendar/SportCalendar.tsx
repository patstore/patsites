import React, { useMemo, useState } from "react";
import { AiOutlineAppstore, AiOutlineUnorderedList } from "react-icons/ai";
import settings from "@settings";
import type { EventTime } from "@types";
import { FlexBox } from "../FlexBox";
import { StickyAside } from "../StickyAside";
import {
  calendarFiltersPanel,
  calendarFiltersSidebar,
  calendarFiltersStack,
  calendarLayout,
  calendarMain,
  calendarContainer,
  sidebarFilterField,
  viewSwitchContainer,
  label,
  styledInput,
} from "./styles";
import WeekDays from "./content/WeekDay";
import { CalendarView } from "./content/WeekDay/types";
import useGetTrainingTimes from "./hooks/useGetTrainingTimes";
import { useDebounceCallback } from "usehooks-ts";
import { Divider } from "../Divider";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
import SquareChoiceButton from "./components/SquareChoiceButton";
import { SportCalendarFilters } from "./filters";
import WeekdayButtons from "./content/WeekDay/components/WeekdayButtons";
import { berlinWeekday, countGroupsByWeekday } from "./content/WeekDay/weekDaysUtils";

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

  const groupCounts = useMemo(
    () => countGroupsByWeekday(trainingszeiten),
    [trainingszeiten],
  );
  const [selectedWeekday, setSelectedWeekday] = useState<EventTime["weekday"]>(
    () => berlinWeekday(),
  );

  const setSearch = useDebounceCallback(
    (suche: string) => onFiltersChange({ suche }),
    500,
  );
  const [view, setView] = useState<CalendarView>("list");

  return (
    <div css={calendarLayout}>
      <WeekdayButtons
        counts={groupCounts}
        selected={selectedWeekday}
        onSelect={setSelectedWeekday}
      />

      <div css={calendarMain}>
        <FlexBox
          direction="column"
          align="stretch"
          justify="space-between"
          gap={settings.sizes.medium}
          styles={calendarContainer}
          wrap
          hasFullWidth
        >
          <WeekDays
            trainingszeiten={trainingszeiten}
            view={view}
            selectedWeekday={selectedWeekday}
          />
        </FlexBox>
      </div>

      <aside css={calendarFiltersSidebar} aria-label="Trainingszeiten filtern">
        <StickyAside panelCss={calendarFiltersPanel}>
          <div css={calendarFiltersStack}>
            <div css={viewSwitchContainer} role="group" aria-label="Ansicht">
              {VIEWS.map((option) => (
                <SquareChoiceButton
                  key={option.value}
                  label={option.icon}
                  ariaLabel={option.label}
                  selected={view === option.value}
                  onClick={() => setView(option.value)}
                />
              ))}
            </div>

            <Divider />

            <div css={sidebarFilterField}>
              <label css={label} htmlFor="sport-calendar-search">
                Suche
              </label>
              <input
                id="sport-calendar-search"
                type="search"
                defaultValue={filters.suche}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Suche ..."
                css={styledInput}
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
          </div>
        </StickyAside>
      </aside>
    </div>
  );
};

export default SportKalender;
