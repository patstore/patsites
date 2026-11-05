export type PatstoreProject = {
  name: string;
  description: string;
  objectId: string;
  content: { label: string; value: string; icon: string }[];
  logo: string;
  path: string;
  modules: {
    results: Module[];
  };
  settings: {};
};

export type ClassCategories = string[];

export type ClassState = {
  value: string;
  label: string;
  color: string;
};

export type ClassProperties = {
  objectId: string;
  createdAt: string;
  data: 7;
  module: Module;
  categories: ClassCategories;
  label: string;
};

export type EventLocation = {
  type: "address" | "map" | "online" | "location";
  address?: string;
  map?: object | null;
  online?: string;
  location?: string;
};

export type EventDate = {
  label: string;
  start: string;
  end: string;
  place: EventLocation;
  full_day: boolean;
  id: string;
};

export type EventTime = {
  weekday:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  start: string;
  end: string;
  place: EventLocation;
  id: string;
  text?: string;
};
