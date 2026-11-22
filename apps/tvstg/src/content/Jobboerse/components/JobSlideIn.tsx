import React from "react";
import { Link } from "@tanstack/react-router";
import { AiOutlineArrowDown } from "react-icons/ai";
import { ContactPerson, FlexBox, SlideIn, groupSlug } from "@ui";
import { useCollection } from "@provider";
import type { PatstoreEntry, PatstoreGroup, PatstorePerson } from "@types";
import Information from "../../../components/SportSlideIn/components/Information";
import styles from "./JobSlideIn.module.css";

type JobSlideInProps = {
	job: PatstoreEntry;
	group?: PatstoreGroup;
	contact?: PatstorePerson;
	open: boolean;
	onClose: () => void;
};

const numberOrNull = (value: unknown) => {
	if (value == null || value === "") return null;
	const number = Number(value);
	return Number.isFinite(number) ? number : null;
};

const groupTeam = (group: PatstoreGroup) => {
	const team = group.team;
	if (!team?.image && !team?.description && !team?.name) return undefined;
	return team;
};

const JobSlideIn: React.FC<JobSlideInProps> = ({
	job,
	group,
	contact,
	open,
	onClose
}) => {
	const { items: groups } = useCollection("Group");
	const startAge = numberOrNull(group?.data?.start_age);
	const description =
		group?.text ||
		(typeof group?.data?.description === "string"
			? group.data.description
			: "") ||
		"";
	const email =
		typeof group?.data?.contact === "string" ? group.data.contact : "";

	return (
		<SlideIn open={open} cancelButtonHandler={onClose}>
			<FlexBox
				className={styles.intro}
				direction="column"
				align="stretch"
			>
				<h1 className={styles.title}>{job.title}</h1>
			</FlexBox>
			{group ? (
				<div className={styles.section}>
					<Link
						to="/sportangebot/$slug"
						params={{ slug: groupSlug(group, groups) }}
						className={styles.groupLink}
					>
						<h3>{group.title}</h3>
						<span className={styles.groupCue}>
							<AiOutlineArrowDown aria-hidden />
							Zur Trainingsgruppe
						</span>
					</Link>
				</div>
			) : null}
			{job.description ? (
				<div>
					<div className="section-header">Info</div>
					<div className={styles.section}>
						<p>{job.description}</p>
					</div>
				</div>
			) : null}
			{job.time ? (
				<div>
					<div className="section-header">Zeit</div>
					<div className={styles.section}>
						<p>{job.time}</p>
					</div>
				</div>
			) : null}
			{job.text ? (
				<div>
					<div className="section-header">Beschreibung</div>
					<div
						className={styles.section}
						dangerouslySetInnerHTML={{ __html: job.text }}
					/>
				</div>
			) : null}
			{contact ? (
				<div>
					<div className="section-header">Kontakt</div>
					<div className={styles.section}>
						<ContactPerson person={contact} />
					</div>
				</div>
			) : null}
		</SlideIn>
	);
};

export default JobSlideIn;
