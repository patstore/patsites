import React from "react";
import { useSiteContext } from "../context";
import { EventLocation } from "@types";

const useFindLocation = () => {
    const { locations } = useSiteContext();

    const findLocation: (T: EventLocation) => string = (
        location: EventLocation
    ) => {
        if (!location) {
            return "-";
        }
        if (location.type === "address") {
            if (location.address) {
                return location.address;
            } else return "-";
        }

        if (location.type === "location") {
            if (location.location) {
                const locationObject = locations.find(
                    (loc) => loc.objectId === location.location
                );
                if (locationObject && locationObject.name) {
                    return locationObject.name;
                } else return "-";
            } else return "-";
        }

        if (location.type === "online") {
            return "online";
        }

        if (location.type === "map") {
            return "Map";
        }
        return "-";
    };

    return { findLocation };
};

export default useFindLocation;
