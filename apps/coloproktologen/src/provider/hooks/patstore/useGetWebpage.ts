import type { WebpageClass } from "@types";
import { useClassRecords } from "./useClassRecords";

const useGetWebpage = () => {
    const { records, find } = useClassRecords<WebpageClass>("webpages");
    return { findWebpage: find, webpages: records };
};

export default useGetWebpage;
