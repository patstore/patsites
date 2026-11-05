import { EventTime } from "./Classes";

export type Team = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type TrainingTime = EventTime & {
  group_id: string;
  group_name: string;
  categories: string[];
  location: string;
  search_name: string;
  search_time: string;
  search_weekday: string;
  search_location: string;
};

export type Weekdays = {
  monday: TrainingTime[];
  tuesday: TrainingTime[];
  wednesday: TrainingTime[];
  thursday: TrainingTime[];
  friday: TrainingTime[];
  saturday: TrainingTime[];
  sunday: TrainingTime[];
};
