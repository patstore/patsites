import { useMemo } from "react";
import { useFindData } from "@data";
import type { EventClass } from "@data";

interface LocationClass {
    objectId: string;
    title?: string | null;
}
import { getDateString } from "../functions";

const useGetEvent: () => {
    findEvent: (id: string) => EventClass | undefined;
    events: EventClass[];
    getEventDateString: (dates: EventClass["dates"]) => {
        date: string;
        location: string;
    };
} = () => {
    const { findByClassName } = useFindData();

    const events = useMemo(
        () => findByClassName("events"),
        [findByClassName]
    );

    const allLocation = useMemo(
        () => findByClassName("locations") as LocationClass[],
        [findByClassName]
    );

    const findEvent: (id: string) => EventClass | undefined = (id) => {
        return events.find((event) => event.objectId === id);
    };

    const getEventLocationString = (
        location: NonNullable<EventClass["dates"]>[0]["place"]
    ) => {
        if (!location) {
            return "";
        }
        if (location.type === "address") {
            return location.address || "-";
        }

        if (location.type === "location") {
            if (location.location) {
                const locationObject = allLocation.find(
                    (loc) => loc.objectId === location.location
                );
                return locationObject?.title || "-";
            }
            return "-";
        }

        if (location.type === "online") {
            return "online";
        }

        if (location.type === "map") {
            return "Map";
        }
        return "-";
    };

    const getEventDateString = (dates: EventClass["dates"]) => {
        const date = {
            date: "",
            location: ""
        };

        if (dates && dates.length > 0) {
            if (dates.length === 1) {
                if (dates[0].full_day) {
                    const startDate = getDateString(dates[0].start);
                    const endDate = getDateString(dates[0].end);
                    if (startDate.date === endDate.date) {
                        date.date = `${startDate.date}`;
                    } else if (startDate.date && endDate.date) {
                        date.date = `${startDate.date} - ${endDate.date}`;
                    } else {
                        date.date = `${startDate.date}`;
                    }
                    date.location = getEventLocationString(dates[0].place);
                } else {
                    date.date = `${getDateString(dates[0].start).date} / ${getDateString(dates[0].start).time} - ${
                        getDateString(dates[0].end).time
                    }`;
                    date.location = getEventLocationString(dates[0].place);
                }
            }
        }

        if (dates && dates.length > 1) {
            const lastIndex = dates.length - 1;
            date.date = `${getDateString(dates[0].start).date} - ${getDateString(dates[lastIndex].end).date}`;
            date.location = getEventLocationString(dates[0].place);
        }

        return date;
    };

    return {
        findEvent,
        events,
        getEventDateString
    };
};

export default useGetEvent;
