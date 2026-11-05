import React from "react";
import DateTilemall from "./components/DateTileSmall";
import DateTileMedium from "./components/DateTileMedium";
import DateTileLarge from "./components/DateTileLarge";
import { DateTileProps } from "./types";

const DateTile: React.FC<DateTileProps> = ({
  size,
  title,
  date,
  location,
  description,
  categories,
}) => {
  if (size === "small") {
    return (
      <DateTilemall
        title={title}
        date={date}
        location={location}
        categories={categories}
      />
    );
  }
  if (size === "medium") {
    return (
      <DateTileMedium
        title={title}
        date={date}
        description={description}
        location={location}
      />
    );
  }
  if (size === "large") {
    return (
      <DateTileLarge
        categories={categories}
        title={title}
        date={date}
        description={description}
        location={location}
      />
    );
  }
  return null;
};

export default DateTile;
