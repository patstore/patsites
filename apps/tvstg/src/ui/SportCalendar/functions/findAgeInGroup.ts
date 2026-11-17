import { PatstoreGroup } from "@types";

const findAgeInGroup = ({ group }: { group: PatstoreGroup }): number[] => {
	const ages: number[] = [];

	if (group?.data?.start_age) {
		const start = Number(group.data.start_age);
		const end = Number(group.data.end_age) || 99;

		for (let i = start; i <= end; i++) {
			const n = i;
			if (!ages.includes(n)) {
				ages.push(n);
			}
		}
	}
	return ages;
};

export default findAgeInGroup;
