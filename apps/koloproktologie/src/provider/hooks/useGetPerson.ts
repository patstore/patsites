import { useMemo } from "react";
import { useFindData } from "@data";
import type { PersonClass } from "@data";

const useGetPerson = () => {
    const { findByClassName } = useFindData();

    const allPerson = useMemo(
        () => findByClassName("persons") as PersonClass[],
        [findByClassName]
    );

    const findPerson = (id: string) => {
        return allPerson.find((person) => person.objectId === id);
    };

    return {
        findPerson,
        persons: allPerson
    };
};

export default useGetPerson;
