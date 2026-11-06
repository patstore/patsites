import { EventLocation } from "@types";
import { useCollection } from "./collections";

const useFindLocation = () => {
  const { items: locations } = useCollection("Location");

  const findLocation: (T: EventLocation) => string | undefined = (
    location: EventLocation,
  ) => {
    if (!location) {
      return undefined;
    }
    if (location.type === "address") {
      if (location.address) {
        return location.address;
      } else return undefined;
    }

    if (location.type === "location") {
      if (location.location) {
        const locationObject = locations.find(
          (loc) => loc.objectId === location.location,
        );
        if (locationObject && locationObject.title) {
          return locationObject.title;
        } else return undefined;
      } else return undefined;
    }

    if (location.type === "online") {
      return "online";
    }

    if (location.type === "map") {
      return "Map";
    }
    return undefined;
  };

  return { findLocation };
};

export default useFindLocation;
