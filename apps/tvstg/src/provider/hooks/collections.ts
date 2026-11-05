import { useCallback } from "react";
import type { PatstoreClassName, PatstoreCollections } from "@types";
import { usePatstoreCollection } from "../data";

const useCollection = <K extends PatstoreClassName>(className: K) => {
  const items = usePatstoreCollection(className);
  const find = useCallback(
    (id: string | null | undefined): PatstoreCollections[K][number] | undefined =>
      (items as PatstoreCollections[K][number][]).find((item) => item.objectId === id),
    [items],
  );
  return { items, find };
};

export const useGetArticle = () => {
  const { items, find } = useCollection("Article");
  return { articles: items, findArticle: find };
};

export const useGetAppointment = () => {
  const { items, find } = useCollection("Appointment");
  return { appointments: items, findAppointment: find };
};

export const useGetCategory = () => {
  const { items, find } = useCollection("Category");
  return { categorys: items, findCategory: find };
};

export const useGetContent = () => {
  const { items, find } = useCollection("Content");
  return { contents: items, findContent: find };
};

export const useGetDownload = () => {
  const { items, find } = useCollection("Download");
  return { downloads: items, findDownload: find };
};

export const useGetEntry = () => {
  const { items, find } = useCollection("Entry");
  return { entrys: items, findEntry: find };
};

export const useGetForm = () => {
  const { items, find } = useCollection("Form");
  return { forms: items, findForm: find };
};

export const useGetGroup = () => {
  const { items, find } = useCollection("Group");
  return { groups: items, findGroup: find };
};

export const useGetImage = () => {
  const { items, find } = useCollection("Image");
  return { images: items, findImage: find };
};

export const useGetLocation = () => {
  const { items, find } = useCollection("Location");
  return { locations: items, findLocation: find };
};

export const useGetPerson = () => {
  const { items, find } = useCollection("Person");
  return { persons: items, findPerson: find };
};

export const useGetWebpage = () => {
  const { items, find } = useCollection("Webpage");
  return { webpages: items, findWebpage: find };
};
