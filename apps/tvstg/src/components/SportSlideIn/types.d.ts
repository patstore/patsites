import { EventTime, PatstoreGroup } from "@types";
import { Dispatch, SetStateAction } from "react";

export type SportSlideInProps = {
  group: PatstoreGroup;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
  location: string | undefined;
};

export type InformationProps = {
  titel: string;
  trainingszeiten: EventTime[];
  team?: PatstoreGroup["team"];
  beschreibung: string;
  startalter: number;
  endalter: number | null;
  email: string;
  info: string;
  trainer: string[];
  type: "regular" | "mobile";
};

export type TrainingTimesSlideInProps = {
  weekday: string;
  start: string;
  end: string;
  location: string;
  text?: string;
};
