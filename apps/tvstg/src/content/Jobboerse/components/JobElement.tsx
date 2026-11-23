import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Image } from "@repo/ui";
import { Label, contentBlockStyles } from "@ui";
import { getDateString, useCollection } from "@provider";
import type { PatstoreEntry, PatstoreGroup } from "@types";
import { findTrainingGroup } from "./findTrainingGroup";
import JobSlideIn from "./JobSlideIn";
import styles from "./JobElement.module.css";

const ageLabel = (group: PatstoreGroup) => {
	const startAge = Number(group.data?.start_age);
	if (!startAge) return "";
	const endAge =
		group.data?.end_age == null || group.data?.end_age === ""
			? null
			: Number(group.data.end_age);
	if (startAge >= 18) return "Erwachsene";
	if (endAge == null || Number.isNaN(endAge)) return `Ab ${startAge} Jahren`;
	return `Von ${startAge} bis ${endAge} Jahre`;
};

const unique = (labels: Array<string | null | undefined>) => {
	const seen = new Set<string>();
	return labels.filter((label): label is string => {
		const text = label?.trim();
		if (!text || seen.has(text)) return false;
		seen.add(text);
		return true;
	});
};

const JobElement: React.FC<{ job: PatstoreEntry }> = ({ job }) => {
	const { items: groups } = useCollection("Group");
	const { find: findCategory } = useCollection("Category");
	const { find: findPerson } = useCollection("Person");
	const [open, setOpen] = useState(false);

	const group = findTrainingGroup(job, groups);
	const contact = findPerson(job.contact);
	const imageId = group?.team?.image || group?.image;
	const categoryIds = group?.categories?.length
		? group.categories
		: (job.categories ?? []);
	const tags = unique([
		...categoryIds.map((id) => findCategory(id)?.title),
		group ? ageLabel(group) : ""
	]).filter((label) => label !== "Jobbörse");

	console.log(job);

	return (
		<>
			<button
				type="button"
				className={styles.card}
				id={job.objectId}
				onClick={() => setOpen(true)}
			>
				<div className={styles.image}>
					<Image
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover"
						}}
						alt={group?.title || job.title || ""}
						id={imageId}
						placeholder="/tvstg_placeholder.png"
					/>
				</div>
				<div className={styles.info}>
					{job.date ? (
						<Label text={getDateString(job.date).date} />
					) : null}
					<h3 className={styles.title}>{job.title}</h3>
					{tags.length > 0 ? (
						<div className={contentBlockStyles.tags}>
							{tags.map((tag) => (
								<span
									key={tag}
									className={contentBlockStyles.tag}
								>
									{tag}
								</span>
							))}
						</div>
					) : null}

					{job.description ? (
						<p className={styles.infoRow}>{job.description}</p>
					) : null}
				</div>
				<span className={styles.arrow} aria-hidden>
					<AiOutlineArrowRight size={16} />
				</span>
			</button>
			<JobSlideIn
				job={job}
				group={group}
				contact={contact}
				open={open}
				onClose={() => setOpen(false)}
			/>
		</>
	);
};

export default React.memo(JobElement);
