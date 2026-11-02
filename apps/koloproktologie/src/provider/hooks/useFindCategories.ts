import { useMemo } from "react";
import { useFindData } from "@data";
import type { CategoryClass } from "@data";

const useFindCategories = () => {
    const { findByClassName } = useFindData();

    const categories = useMemo(
        () => findByClassName("categories") as CategoryClass[],
        [findByClassName]
    );

    const findCategories: (cats: string[]) => CategoryClass[] = (cats) => {
        const categoryArray: CategoryClass[] = [];

        if (!cats) {
            return categoryArray;
        }

        cats.forEach((category) => {
            const cat = categories.find((c) => c.objectId === category);
            if (cat) {
                categoryArray.push(cat);
            }
        });
        return categoryArray;
    };

    return { findCategories };
};

export default useFindCategories;
