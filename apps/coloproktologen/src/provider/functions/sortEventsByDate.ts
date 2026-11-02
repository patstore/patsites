type DatedEvent = {
    dates?: { start?: string; end?: string }[] | null;
};

export const sortEventsByDate = <T extends DatedEvent>(events: T[]): T[] => {
    return [...events].sort((a, b) => {
        const aStart = a.dates?.[0]?.start;
        const bStart = b.dates?.[0]?.start;
        if (!aStart || !bStart) {
            return 0;
        }
        return new Date(bStart).getTime() - new Date(aStart).getTime();
    });
};
