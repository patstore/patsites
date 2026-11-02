import type { PatstoreDownload } from "@types";
import { useClassRecords } from "./useClassRecords";

const useGetDownload = () => {
    const { records, find } = useClassRecords<PatstoreDownload>("downloads");
    return { findDownload: find, downloads: records };
};

export default useGetDownload;
