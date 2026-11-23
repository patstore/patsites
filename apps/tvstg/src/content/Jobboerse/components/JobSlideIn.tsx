import React from "react";
import { Link } from "@tanstack/react-router";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { ContactPerson, Divider, FlexBox, SlideIn, groupSlug } from "@ui";
import { useCollection } from "@provider";
import type { PatstoreEntry, PatstoreGroup, PatstorePerson } from "@types";
import styles from "./JobSlideIn.module.css";

type JobSlideInProps = {
	job: PatstoreEntry;
	group?: PatstoreGroup;
	contact?: PatstorePerson;
	open: boolean;
	onClose: () => void;
};

const JobSlideIn: React.FC<JobSlideInProps> = ({
	job,
	group,
	contact,
	open,
	onClose
}) => {
	const { items: groups } = useCollection("Group");

	return (
		<SlideIn open={open} cancelButtonHandler={onClose}>
			<div className={styles.content}>
				<h2>{job.title}</h2>
				<Divider showLine />
				<FlexBox direction="column" align="stretch">
					{job.description && (
						<div>
							<h3>Info</h3>
							<div className={styles.inset}>
								<p>{job.description}</p>
							</div>
						</div>
					)}
					{job.text && (
						<div>
							<h3>Beschreibung</h3>
							<div
								className={styles.inset}
								dangerouslySetInnerHTML={{ __html: job.text }}
							/>
						</div>
					)}
				</FlexBox>
				{group ? (
					<div>
						<h3>Trainingsgruppe</h3>
						<div className={styles.inset}>
							<Link
								to="/sportangebot/$slug"
								params={{ slug: groupSlug(group, groups) }}
								className={styles.groupLink}
							>
								<div className={styles.groupCopy}>
									<h4>{group.title}</h4>
								</div>
								<span className={styles.arrow} aria-hidden>
									<AiOutlineArrowRight size={16} />
								</span>
							</Link>
						</div>
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
			</div>
		</SlideIn>
	);
};

export default JobSlideIn;
