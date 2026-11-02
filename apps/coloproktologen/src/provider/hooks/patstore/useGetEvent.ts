import type { EventClass } from "@types";
import { useClassRecords } from "./useClassRecords";

const useGetEvent = () => {
    const { records, find } = useClassRecords<EventClass>("events");
    return { findEvent: find, events: records };
};

export default useGetEvent;
