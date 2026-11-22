import { useState } from "react";
import { Image } from "@repo/ui";
import placeholder from "./images/placeholder_m.png";
import { PatstorePerson } from "@types";
import ContactPersonModal from "./ContactPersonModal";
import type { ContactGroup } from "./types";
import styles from "./ContactPerson.module.css";

type ContactPersonProps = {
	person: PatstorePerson;
	/** Group of the current slide-in; used as subject and shown in the modal. */
	group?: ContactGroup;
};

const ContactPerson = ({ person, group }: ContactPersonProps) => {
	const name = person.title || "";
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setModalOpen(true)}
				className={styles.contact_person_container}
			>
				<div className={styles.portrait}>
					{person.image ? (
						<Image
							id={person.image}
							alt={name}
							className={styles.photo}
							style={{ width: 48, height: 48, borderRadius: 4 }}
						/>
					) : (
						<img
							src={placeholder}
							alt={name}
							width={60}
							height={60}
							className={styles.photo}
						/>
					)}
				</div>
				<div>
					<h4>{name}</h4>
				</div>
				<div>
					{person.email && (
						<button type="button" className="btn solid primary">
							Kontaktieren
						</button>
					)}
				</div>
			</button>
			{person.email && (
				<ContactPersonModal
					open={modalOpen}
					onClose={() => setModalOpen(false)}
					name={name}
					group={group}
				/>
			)}
		</>
	);
};

export default ContactPerson;
