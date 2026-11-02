import { EventClass } from "@data";
import { get } from "lodash-es";

const sortEventsByDate = (events: EventClass[]) => {
    return events.sort((a: EventClass, b: EventClass) => {
        const aStart = get(a, "dates[0].start");
        const bStart = get(b, "dates[0].start");
        if (!aStart || !bStart) {
            return 0;
        }
        const aDate = new Date(aStart);
        const bDate = new Date(bStart);
        return bDate.getTime() - aDate.getTime();
    });
};

export default sortEventsByDate;
