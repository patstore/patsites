import { PatstoreCategory } from "@types";
import { useGetCategory } from "./collections";

const useFindCategories = () => {
  const { categorys } = useGetCategory();

  const findCategories: (T: string[]) => PatstoreCategory[] = (
    cats: string[],
  ) => {
    const categoryArray: PatstoreCategory[] = [];

    if (!cats) {
      return categoryArray;
    }

    cats.forEach((category) => {
      const cat = categorys.find(
        (cat: PatstoreCategory) => cat.objectId === category,
      );
      if (cat) {
        categoryArray.push(cat);
      }
    });
    return categoryArray;
  };

  return { findCategories };
};

export default useFindCategories;
