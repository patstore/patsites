import { EventClass } from "@data";

export type Maybe<T> = T | null;

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

export type PatstoreCategory = PatstoreEntity & {
  date: Maybe<string>;
  category_id: Maybe<string>;
  description: Maybe<string>;
  image: Maybe<string>;
  type: Maybe<string>;
};

export type PatstoreLocation = PatstoreEntity & {
  date: Maybe<string>;
};

export type PatstorePerson = PatstoreEntity & {
  date: Maybe<string>;
  email: Maybe<string>;
  image: Maybe<string>;
};

export type WebpageBlock = {
  id?: string;
  type?: string;
  value?: string;
  active?: boolean;
  name?: string;
};

export type PatstoreWebpage = PatstoreEntity & {
  date: Maybe<string>;
  content: WebpageBlock[];
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
  form_fields: Array<{ name?: string; label?: string }>;
};

export type PatstoreImage = {
  objectId: string;
  url: string;
};

export type PatstoreCollections = {
  Category: PatstoreCategory[];
  Content: PatstoreContent[];
  Form: PatstoreForm[];
  Image: PatstoreImage[];
  Location: PatstoreLocation[];
  Person: PatstorePerson[];
  Webpage: PatstoreWebpage[];
  Event: EventClass[];
};

export type PatstoreClassName = keyof PatstoreCollections;

/** The slice of Patstore data a route loader hands to the component tree. */
export type PatstoreData = Partial<PatstoreCollections>;
