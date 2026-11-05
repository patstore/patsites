import type { EventDate, EventTime } from "./Classes";
import type { Team } from "./Group";

export type Maybe<T> = T | null;

export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type PatstoreFile = {
  name: string;
  url: string;
};

type PatstoreEntity = {
  id: string;
  objectId: string;
  categories: string[];
  createdAt: Maybe<string>;
  gallery: string[];
  label: Maybe<string>;
  state: Maybe<string>;
  text: Maybe<string>;
  title: Maybe<string>;
};

export type PatstoreArticle = PatstoreEntity & {
  date: Maybe<string>;
  image: Maybe<string>;
};

export type PatstoreCategory = PatstoreEntity & {
  date: Maybe<string>;
  category_id: Maybe<string>;
  description: Maybe<string>;
  image: Maybe<string>;
  type: Maybe<string>;
};

export type PatstoreDownload = PatstoreEntity & {
  date: Maybe<string>;
  description: Maybe<string>;
  file: Maybe<PatstoreFile>;
  image: Maybe<string>;
};

export type PatstoreGroup = PatstoreEntity & {
  date: Maybe<string>;
  data: any;
  description: Maybe<string>;
  image: Maybe<string>;
  persons: string[];
  team: Maybe<Team>;
  times: EventTime[];
};

export type PatstoreLocation = PatstoreEntity & {
  date: Maybe<string>;
};

export type PatstorePerson = PatstoreEntity & {
  date: Maybe<string>;
  email: Maybe<string>;
  image: Maybe<string>;
  portrait: Maybe<string>;
};

export type PatstoreWebpage = PatstoreEntity & {
  date: Maybe<string>;
  content: any[];
  path: Maybe<string>;
  subtitle?: Maybe<string>;
};

export type PatstoreContent = PatstoreEntity & {
  active: Maybe<boolean>;
  content_id: Maybe<string>;
  data: any;
};

export type PatstoreForm = PatstoreEntity & {
  date: Maybe<string>;
  form_fields: any[];
};

export type PatstoreEntry = PatstoreEntity & {
  date: Maybe<string>;
  description?: Maybe<string>;
  time?: Maybe<string>;
  /** Group objectId */
  group?: Maybe<string>;
  /** Person objectId */
  contact?: Maybe<string>;
};

export type PatstoreAppointment = Omit<PatstoreEntity, "gallery"> & {
  date: EventDate;
  description: Maybe<string>;
  image: Maybe<string>;
};

export type PatstoreDate = PatstoreAppointment;

export type PatstoreImage = {
  objectId: string;
  url: string;
};

export type PatstoreCollections = {
  Article: PatstoreArticle[];
  Appointment: PatstoreAppointment[];
  Category: PatstoreCategory[];
  Content: PatstoreContent[];
  Download: PatstoreDownload[];
  Entry: PatstoreEntry[];
  Form: PatstoreForm[];
  Group: PatstoreGroup[];
  Image: PatstoreImage[];
  Location: PatstoreLocation[];
  Person: PatstorePerson[];
  Webpage: PatstoreWebpage[];
};

export type PatstoreClassName = keyof PatstoreCollections;

/** The slice of Patstore data a route loader hands to the component tree. */
export type PatstoreData = Partial<PatstoreCollections>;
