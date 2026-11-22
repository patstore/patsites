import React, { useMemo } from "react";
import { InformationProps } from "../types";
import { ContactPerson, Divider, FlexBox, type ContactGroup } from "@ui";
import { getWeekday, locationLabel, useCollection } from "@provider";
import { PatstorePerson } from "@types";
import TrainingTimesSlideIn from "./TrainingTimesSlideIn";
import styles from "./Information.module.css";

export const Information: React.FC<InformationProps> = ({
	titel,
	trainingszeiten,
	beschreibung,
	startalter,
	endalter,
	email,
	info,
	trainer
}) => {
	const { items: persons } = useCollection("Person");
	const { find: findLocation } = useCollection("Location");

	const groupData = useMemo(() => {
		let alterText = "";
		if (startalter >= 18) {
			alterText = "Erwachsene";
		} else if (startalter > 1 && endalter === null)
			alterText = `Ab ${startalter} Jahren`;
		else {
			alterText = `Von ${startalter} bis ${endalter} Jahre`;
		}
		const trainerArray: PatstorePerson[] = trainer
			? persons.filter((person) =>
					trainer.some((ul) => ul === person.objectId)
				)
			: [];

		return {
			trainers: trainerArray || [],
			alter: alterText
		};
	}, []);

	const contactGroup: ContactGroup = {
		title: titel,
		times: trainingszeiten.map((value) => ({
			id: value.id,
			label: `${getWeekday(value.weekday)}${
				value.start && value.end ? ` ${value.start} - ${value.end}` : ""
			}`,
			location: locationLabel(value.place, findLocation) || "",
			text: value.text || ""
		}))
	};

	return (
		<div className={styles.information}>
			<div>
				<h2>{titel}</h2>
				<Divider showLine />
				<FlexBox direction="column" align="stretch">
					{email && (
						<div className={styles.full}>
							<h3>Kontakt</h3>
							<div className={styles.inset}>
								<div className="sidebar-panel">
									<h3>Kontakt E-Mail</h3>
									<div className={styles.inset}>
										<a href={`mailto:${email}`}>{email}</a>
									</div>
								</div>
							</div>
						</div>
					)}
					<h3>Übungsleiter*innen</h3>
					<div className={styles.inset}>
						{groupData.trainers.map((person: PatstorePerson) => (
							<ContactPerson
								person={person}
								group={contactGroup}
								key={person.objectId}
							/>
						))}
					</div>
				</FlexBox>
			</div>
			<div className={styles.clipAuto}>
				<h3>Trainingszeiten</h3>
				<div className={styles.inset}>
					{trainingszeiten.map((value) => (
						<TrainingTimesSlideIn
							key={value.id}
							weekday={getWeekday(value.weekday)}
							start={value.start}
							end={value.end}
							location={
								locationLabel(value.place, findLocation) || ""
							}
							text={value.text || ""}
						/>
					))}
				</div>
			</div>
			{startalter && (
				<div className={styles.clip}>
					<h3>Alter</h3>
					<div className={styles.inset}>
						<p>{groupData.alter}</p>
					</div>
				</div>
			)}
			{info && (
				<div className={styles.clip}>
					<h3>Info</h3>
					<div className={styles.inset}>
						<p>{info}</p>
					</div>
				</div>
			)}
			{beschreibung && (
				<div>
					<h3>Beschreibung</h3>
					<div
						className={styles.inset}
						dangerouslySetInnerHTML={{ __html: beschreibung }}
					/>
				</div>
			)}

			{/* <div>
				{type === "mobile" && team && team.name && (
					<div>
						<h3>Die Mannschaft</h3>
						<FlexBox
							direction="column"
							style={{ marginTop: "3em" }}
						>
							{team.image && (
								<Image
									alt={titel}
									id={team.image}
									style={{
										objectFit: "cover",
										height: "100%",
										width: "100%",
										maxHeight: "30em"
									}}
								/>
							)}

							<FlexBox
								direction="column"
								align="flex-start"
								justify="flex-end"
								style={{
									height: "100%",
									padding: "0.5em 2em"
								}}
							>
								<div>
									{team.description && (
										<div
											dangerouslySetInnerHTML={{
												__html: team.description
											}}
										/>
									)}
								</div>
							</FlexBox>
						</FlexBox>
					</div>
				)} */}
			{/* </div> */}
		</div>
	);
};

export default Information;
