export type DateTileProps = {
  size: "small" | "medium" | "large";
  title: string;
  date: string;
  location: string | undefined;
  description: string;
  categories?: string[];
};

export type DateTileSmallProps = {
  title: string;
  date: string;
  location: string | undefined;
  categories?: string[];
};

export type DateTileMediumProps = {
  title: string;
  date: string;
  location: string | undefined;
  description: string;
};

export type DateTileLargeProps = {
  title: string;
  date: string;
  location: string | undefined;
  description: string;
  categories?: string[];
};
