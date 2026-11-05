import { PatstoreGroup } from "@types";

const findAgeInGroups = ({ groups }: { groups: PatstoreGroup[] }): number[] => {
  const ages: number[] = [];
  groups.forEach((group) => {
    if (group.data && group.data?.start_age && group.data?.end_age) {
      const start = Number(group.data.start_age);
      const end = Number(group.data.end_age);
      for (let i = start; i <= end; i++) {
        let n = i;
        if (i >= 19) {
          n = 19;
        }
        if (!ages.includes(n)) {
          ages.push(n);
        }
      }
    }
  });
  return ages.sort((a, b) => a - b);
};

export default findAgeInGroups;
