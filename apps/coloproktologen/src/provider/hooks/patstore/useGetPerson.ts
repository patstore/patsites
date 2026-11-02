import type { PatstorePerson } from "@types";
import { useClassRecords } from "./useClassRecords";

const useGetPerson = () => {
    const { records, find } = useClassRecords<PatstorePerson>("persons");
    return { findPerson: find, persons: records };
};

export default useGetPerson;
