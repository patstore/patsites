import { EventClass } from "@data";

const now = new Date();

export const getCurrentEvents = (events: EventClass[]) => {
    const eventsWithDate = events.filter(
        (event) =>
            event.dates &&
            event?.dates?.length > 0 &&
            event?.categories?.includes("6Die3pBJXA")
    );

    const sortedEvents = eventsWithDate.sort((a: EventClass, b: EventClass) => {
        const aStart = a.dates?.[0]?.start;
        const bStart = b.dates?.[0]?.start;
        if (!aStart || !bStart) {
            return 0;
        }
        const aDate = new Date(aStart);
        const bDate = new Date(bStart);
        return aDate.getTime() - bDate.getTime();
    });

    // Find current event (most recent past event)
    const current = sortedEvents
        .filter((event: EventClass) => {
            const eventEndDate = new Date(
                event.dates?.[event.dates.length - 1]?.end ?? ""
            );
            return eventEndDate <= now;
        })
        .pop();

    // Find upcoming event (next future event)
    const upcoming = sortedEvents.find((event: EventClass) => {
        const startDate = event.dates?.[0]?.end;
        if (!startDate) {
            return false;
        }
        const eventStartDate = new Date(startDate);
        return eventStartDate > now;
    });

    const past = sortedEvents.filter((event: EventClass) => {
        const startDate = event.dates?.[0]?.start;
        if (!startDate) {
            return false;
        }
        const eventStartDate = new Date(startDate);
        return eventStartDate < now;
    });

    return { current, upcoming, past };
};