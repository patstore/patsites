import { useClassRecords } from "./useClassRecords";

type CategoryRecord = {
    objectId?: string;
    title?: string | null;
    label?: string | null;
    categories?: string[] | null;
    text?: string | null;
};

const useGetCategory = () => {
    const { records, find } = useClassRecords<CategoryRecord>("categorys");
    return { findCategory: find, categorys: records };
};

export default useGetCategory;
