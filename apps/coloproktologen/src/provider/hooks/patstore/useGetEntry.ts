import type { PatstoreEntry } from "@types";
import { useClassRecords } from "./useClassRecords";

const useGetEntry = () => {
    const { records, find } = useClassRecords<PatstoreEntry>("entrys");
    return { findEntry: find, entrys: records };
};

export default useGetEntry;
