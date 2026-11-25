// Matches the @repo/server data barrel. Regenerated when PatStore credentials are set.
import buildTimeData from "./build-time-data.json";
import { registerStaticSnapshot } from "@repo/server";

registerStaticSnapshot(buildTimeData);

export { useFindData } from "./useFindData";
export type { UseFindDataReturn } from "./useFindData";
export { applicationSchemas } from "./schema";
export type { Application } from "./schema";
export { default as buildTimeData } from "./build-time-data.json";
export type {
  BuildTimeData,
  DownloadedFile,
  FileRecord,
  FileClass,
  DownloadClass,
  ArticleClass,
  ArticleData,
  UserClass,
  ImageClass,
  CategoryClass,
  WebpageClass,
  EmailClass,
  BookingClass,
  FormClass
} from "./types";
