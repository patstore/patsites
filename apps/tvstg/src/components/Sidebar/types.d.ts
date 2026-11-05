import React from "react";
import Calendar from "./components/Calendar";
import { PatstorePerson } from "@types";

export type ContentElement = {
  id: string;
  header: string;
  content: React.ReactNode;
};

export type SidebarProps = {
  category: string;
  contentArray?: ContentElement[];
  showNews: boolean;
  showCalendar: boolean;
  showTraining?: boolean;
  displayAllNews?: boolean;
  displayAllEvents?: boolean;
};

export type NewsProps = {
  category: string;
  displayAllNews?: boolean;
};

export type CalendarProps = {
  category: string;
  getAllEvents?: boolean;
};

export type RenderContentProps = {
  content: ContentElement[];
};

export type ContactProps = {
  contact: PatstorePerson;
};

export type SidebarSportsProps = {
  category: string;
  categoryName: string;
  contact?: PatstorePerson;
  showNews?: boolean;
  showCalendar?: boolean;
  showTraining?: boolean;
};
