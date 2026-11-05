import { EventTime } from "@types";
import { SportCalendarFilters } from "./filters";

export type Trainingszeit = EventTime & {
  group_id: string;
  group_name: string;
  categories: string[];
  search_name: string;
  search_time: string;
  search_weekday: string;
  search_location: string;
  search_age: number[];
  search_gender: string;
  location: string;
};

export type UseGetTrainingTimes = (T: {
  categories: string[];
  searchValue: string;
  age: number | null;
  gender: SportCalendarFilters["geschlecht"];
}) => {
  trainingszeiten: Trainingszeit[];
  ages: number[];
};

export type GenderFilterProps = {
  gender: SportCalendarFilters["geschlecht"];
  setGender: (gender: SportCalendarFilters["geschlecht"]) => void;
};

export type AgeFilterProps = {
  ages: number[];
  age: number | null;
  setAge: (age: number | null) => void;
};
