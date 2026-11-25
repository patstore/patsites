// Matches the @repo/server snapshot shape. Regenerated when PatStore credentials are set.
export interface FileRecord {
  __typename?: string;
  name?: string;
  url: string;
}

export type FileClass = FileRecord;

export interface DownloadedFile {
  objectId: string;
  originalUrl: string;
  localPath: string;
  filename: string;
  type: "image" | "document";
  thumbnailPath?: string;
}

export interface DownloadClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  title?: string | null;
  description?: string | null;
  state?: string | null;
  file?: FileClass | null;
  filePath?: string;
}

export interface ArticleData {
  vorschaubild?: string | string[] | null;
  kategorie?: string | null;
  leistungen?: string | null;
  Jahr?: string | null;
}

export interface ArticleClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  title?: string | null;
  description?: string | null;
  text?: string | null;
  image?: string | null;
  state?: string | null;
  gallery?: string[] | null;
  date?: string | null;
  link?: string | null;
  slug?: string | null;
  data?: ArticleData | null;
}

export interface UserClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  email?: string | null;
  roles?: string | null;
  title?: string | null;
}

export interface ImageClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  file?: FileClass | null;
  connected_elements?: unknown[] | null;
  title?: string | null;
  description?: string | null;
  filePath?: string;
  thumbnailPath?: string;
}

export interface CategoryClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  title?: string | null;
}

export interface WebpageClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  path?: string | null;
  text?: string | null;
  title?: string | null;
}

export interface EmailClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  title?: string | null;
}

export interface BookingClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
}

export interface FormClass {
  objectId: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[] | null;
  title?: string | null;
  file?: FileClass | null;
  filePath?: string;
}

export interface BuildTimeData {
  _meta?: {
    generatedAt: string;
    projectId: string;
    moduleCount: number;
    states: string[] | null;
  };
  _modules?: unknown[];
  downloadedFiles?: DownloadedFile[];
  downloads?: DownloadClass[];
  articles?: ArticleClass[];
  users?: UserClass[];
  images?: ImageClass[];
  categorys?: CategoryClass[];
  webpages?: WebpageClass[];
  emails?: EmailClass[];
  bookings?: BookingClass[];
  forms?: FormClass[];
  [key: string]: unknown;
}
