import React, { useMemo, useState } from "react";
import { AiOutlineAppstore, AiOutlineUnorderedList } from "react-icons/ai";
import type { EventTime } from "@types";
import { FlexBox } from "../FlexBox";
import { StickyAside } from "../StickyAside";
import { ContentBlock } from "../ContentBlock";
import styles from "./SportCalendar.module.css";
import WeekDays from "./content/WeekDay";
import { CalendarView } from "./content/WeekDay/types";
import useGetTrainingTimes from "./hooks/useGetTrainingTimes";
import { useDebounceCallback } from "usehooks-ts";
import { Divider } from "../Divider";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
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
    <div className={styles.layout}>
      <WeekdayButtons
        counts={groupCounts}
        selected={selectedWeekday}
        onSelect={setSelectedWeekday}
      />

      <ContentBlock className={styles.main}>
        <FlexBox
          direction="column"
          align="stretch"
          justify="space-between"
          gap="12px"
          wrap
          hasFullWidth
        >
          <WeekDays
            trainingszeiten={trainingszeiten}
            view={view}
            selectedWeekday={selectedWeekday}
          />
        </FlexBox>
      </ContentBlock>

      <aside className={styles.sidebar} aria-label="Trainingszeiten filtern">
        <StickyAside panelClassName="content-block padded">
          <div className="content-stack">
            <div className={styles.viewSwitch} role="group" aria-label="Ansicht">
              {VIEWS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="btn-choice square"
                  aria-label={option.label}
                  aria-pressed={view === option.value}
                  onClick={() => setView(option.value)}
                >
                  {option.icon}
                </button>
              ))}
            </div>

            <Divider />

            <div className="field">
              <label className="field-label" htmlFor="sport-calendar-search">
                Suche
              </label>
              <input
                id="sport-calendar-search"
                type="search"
                defaultValue={filters.suche}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Suche ..."
                className="field-input"
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
