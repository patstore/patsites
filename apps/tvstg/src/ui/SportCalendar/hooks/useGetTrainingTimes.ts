import { UnwrapScalar } from "./../../../types/utils";
import React, { useCallback, useMemo } from "react";
import { EventTime, PatstoreCategory, PatstoreLocation } from "@types";
import Fuse from "fuse.js";
import { Trainingszeit, UseGetTrainingTimes } from "../types";
import {
  getWeekday,
  useGetCategory,
  useGetGroup,
  useGetLocation,
} from "@provider";
import findAgeInGroups from "../functions/findAgeInGroups";
import findAgeInGroup from "../functions/findAgeInGroup";

const useGetTrainingTimes: UseGetTrainingTimes = ({
  categories,
  searchValue,
  age,
  gender,
}) => {
  const { categorys: allCategories } = useGetCategory();
  const { groups } = useGetGroup();
  const { locations } = useGetLocation();

  const groupCategories: (c: string[]) => string[] = React.useCallback(
    (cats) => {
      const categoryArray: string[] = [];
      if (!cats) {
        return categoryArray;
      }
      cats.forEach((category) => {
        const cat = allCategories.find(
          (cat: UnwrapScalar<PatstoreCategory>) => cat.objectId === category,
        );
        if (cat && !categoryArray.includes(cat.title || "")) {
          categoryArray.push(cat.title || "");
        }
      });
      return categoryArray;
    },
    [allCategories],
  );

  const getLocation: (loc: string) => PatstoreLocation | null | undefined =
    useCallback(
      (loc) => {
        if (!loc) {
          return undefined;
        }
        const location = locations.find(
          (location) => location.objectId === loc,
        );
        return location;
      },
      [locations],
    );

  const trainingszeiten = useMemo(() => {
    if (!groups) {
      return [];
    }
    const tz: Trainingszeit[] = [];
    groups.forEach((group) => {
      if (categories.length > 0 && !group.categories) {
        return;
      }
      if (
        categories.length > 0 &&
        !group.categories.some((category: string) =>
          categories.includes(category),
        )
      ) {
        return;
      }
      if (
        group.title &&
        group.title !== "" &&
        group.state === "published" &&
        group.times &&
        group.times.length > 0
      ) {
        group.times.forEach((time: EventTime) => {
          const search_name = group.title?.toLowerCase() || "";
          const search_time = time.start.toLowerCase();
          const search_weekday = getWeekday(time.weekday).toLowerCase();
          const location = time.place.location
            ? getLocation(time.place.location)
              ? getLocation(time.place.location)?.title || ""
              : ""
            : "";
          tz.push({
            ...time,
            group_id: group.objectId as string,
            categories: groupCategories(group.categories),
            group_name: group.title as string,
            search_name: search_name,
            search_time: search_time,
            search_weekday: search_weekday,
            search_location: location || "",
            search_age: findAgeInGroup({ group }),
            search_gender: group.data?.gender || "mixed",
            location: location || "",
          });
        });
      }
    }, []);
    return tz;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, getLocation, categories.join(",")]);


  const options = {
    includeScore: true,
    findAllMatches: true,
    // ignoreLocation: true,
    threshold: 0.3,
    keys: [
      { name: "categories", weight: 0.3 },
      { name: "search_name", weight: 0.3 },
      { name: "search_weekday", weight: 0.2 },
      { name: "search_time", weight: 0.1 },
      { name: "location", weight: 0.1 },
    ],
  };

  const filteredTrainingszeiten = useMemo(() => {
    const fuse = new Fuse(trainingszeiten, options);
    let fuzeResult = fuse.search(searchValue);
    let result =
      fuzeResult.length > 0
        ? fuzeResult.map((item) => item.item)
        : trainingszeiten;

    if (gender !== "all") {
      const filteredResults = result.filter(
        (item) => item.search_gender === gender,
      );
      result = filteredResults;
    }
    if (age !== null) {
      let filteredResults = result;
      if (age < 19) {
        filteredResults = result.filter(
          (item) =>
            item.search_age.includes(age) || item.search_age.length === 0,
        );
      } else if (age >= 19) {
        filteredResults = result.filter((item) =>
          item.search_age.find((age) => age >= 19),
        );
      }

      result = filteredResults;
    }

    return result;
  }, [searchValue, gender, age, trainingszeiten]);

  const ages: number[] = findAgeInGroups({ groups });

  return {
    trainingszeiten: filteredTrainingszeiten,
    ages,
  };
};

export default useGetTrainingTimes;
