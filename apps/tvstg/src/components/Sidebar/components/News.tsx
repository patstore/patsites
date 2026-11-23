import React, { useMemo, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FlexBox, Label } from "@ui";
import { getDateString, useCollection } from "@provider";
import type { PatstoreEntry } from "@types";
import JobSlideIn from "../../../content/Jobboerse/components/JobSlideIn";
import { findTrainingGroup } from "../../../content/Jobboerse/components/findTrainingGroup";
import { NewsProps } from "../types";
import styles from "./News.module.css";

const JobSidebarItem: React.FC<{ job: PatstoreEntry }> = ({ job }) => {
	const { items: groups } = useCollection("Group");
	const { find: findPerson } = useCollection("Person");
	const [open, setOpen] = useState(false);
	const group = findTrainingGroup(job, groups);
	const contact = findPerson(job.contact);

	return (
		<>
			<button
				type="button"
				className={`sidebar-block ${styles.block}`}
				onClick={() => setOpen(true)}
			>
				<div className={styles.copy}>
					{job.date ? (
						<Label text={getDateString(job.date).date} />
					) : null}
					<h4>{job.title}</h4>
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

const News: React.FC<NewsProps> = ({ category, displayAllNews = false }) => {
	const { items: news } = useCollection("Entry");

	const newsArray = useMemo(() => {
		const actualNews = news.filter((value) => {
			if (!value.categories?.includes("YLHdF8iCjA")) return false;
			return true;
		});
		if (displayAllNews) {
			return actualNews.slice(0, 5);
		}
		if (category) {
			return actualNews
				.filter((value) => value?.categories?.includes(category))
				.slice(0, 5);
		}
		return [];
	}, [news, category, displayAllNews]);

	return (
		<div className="sidebar-panel">
			<div className="section-header flush">Jobbörse</div>
			{newsArray.length > 0 ? (
				<FlexBox direction="column" align="stretch" hasFullWidth>
					{newsArray
						.sort(
							(a, b) =>
								new Date(b.date!).getTime() -
								new Date(a.date!).getTime()
						)
						.map((value) => (
							<JobSidebarItem key={value.objectId} job={value} />
						))}
				</FlexBox>
			) : (
				<div>
					<p>Hier gibt es gerade keine Neuigkeiten</p>
				</div>
			)}
		</div>
	);
};

export default News;
