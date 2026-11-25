// Matches the @repo/server data hook. Regenerated when PatStore credentials are set.
import { useMemo } from "react";
import buildTimeData from "./build-time-data.json";
import { filterByStates, readSnapshotRecords, type DataContext } from "@repo/server";
import type {
  ArticleClass,
  BookingClass,
  BuildTimeData,
  CategoryClass,
  DownloadClass,
  EmailClass,
  FormClass,
  ImageClass,
  UserClass,
  WebpageClass
} from "./types";

export function useFindData() {
  const typedData = buildTimeData as BuildTimeData;

  return useMemo(() => {
    function findByClassName(className: "downloads", states?: DataContext["states"]): DownloadClass[];
    function findByClassName(className: "articles", states?: DataContext["states"]): ArticleClass[];
    function findByClassName(className: "users", states?: DataContext["states"]): UserClass[];
    function findByClassName(className: "images", states?: DataContext["states"]): ImageClass[];
    function findByClassName(className: "categorys", states?: DataContext["states"]): CategoryClass[];
    function findByClassName(className: "webpages", states?: DataContext["states"]): WebpageClass[];
    function findByClassName(className: "emails", states?: DataContext["states"]): EmailClass[];
    function findByClassName(className: "bookings", states?: DataContext["states"]): BookingClass[];
    function findByClassName(className: "forms", states?: DataContext["states"]): FormClass[];
    function findByClassName(className: string, states?: DataContext["states"]): any[];
    function findByClassName(className: string, states?: DataContext["states"]): any[] {
      const rows = readSnapshotRecords(typedData, className);
      return filterByStates(rows, states ?? null);
    }

    function findByObjectId<
      T =
        | DownloadClass
        | ArticleClass
        | UserClass
        | ImageClass
        | CategoryClass
        | WebpageClass
        | EmailClass
        | BookingClass
        | FormClass
    >(objectId: string): T | null {
      for (const [key, value] of Object.entries(typedData)) {
        if (!Array.isArray(value) || key.startsWith("_") || key === "downloadedFiles") {
          continue;
        }
        const found = value.find(
          (item) =>
            !!item &&
            typeof item === "object" &&
            "objectId" in item &&
            item.objectId === objectId
        );
        if (found) {
          return found as T;
        }
      }
      return null;
    }

    return {
      findByClassName,
      findByObjectId,
      data: typedData
    };
  }, [typedData]);
}

export type UseFindDataReturn = ReturnType<typeof useFindData>;
