import type { LocationClass } from "@types";
import { useClassRecords } from "./useClassRecords";

const useGetLocation = () => {
    const { records, find } = useClassRecords<LocationClass>("locations");
    return { findLocation: find, locations: records };
};

export default useGetLocation;
