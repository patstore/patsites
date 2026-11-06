import type { EventClass } from "@types";

const now = new Date();

export const getCurrentEvents = (events: EventClass[]) => {
    const eventsWithDate = events.filter(
        (event) =>
            event.dates &&
            event.dates.length > 0 &&
            event.categories?.includes("1CTfrEkW6Y")
    );

    const sortedEvents = [...eventsWithDate].sort((a, b) => {
        const aStart = a.dates?.[0]?.start;
        const bStart = b.dates?.[0]?.start;
        if (!aStart || !bStart) return 0;
        return new Date(aStart).getTime() - new Date(bStart).getTime();
    });

    const current = sortedEvents
        .filter((event) => {
            const dates = event.dates ?? [];
            return new Date(dates[dates.length - 1]?.end || "") <= now;
        })
        .pop();

    const upcoming = sortedEvents.find((event) => {
        const startDate = event.dates?.[0]?.start;
        if (!startDate) return false;
        return new Date(startDate) > now;
    });

    const past = sortedEvents.filter((event) => {
        const dates = event.dates ?? [];
        return new Date(dates[dates.length - 1]?.end || "") <= now;
    });

    return { current, upcoming, past };
};
