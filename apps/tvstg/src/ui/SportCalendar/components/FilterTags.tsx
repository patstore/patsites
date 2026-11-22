import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../SportCalendar.module.css";

export type FilterTag = {
	key: string;
	label: string;
	onRemove: () => void;
};

/** One removable tag per active filter (search words, category, gender, age). */
const FilterTags: React.FC<{ tags: FilterTag[] }> = ({ tags }) => {
	if (tags.length === 0) {
		return null;
	}

	return (
		<ul className={styles.searchTags} aria-label="Aktive Filter">
			{tags.map((tag) => (
				<li key={tag.key} className={styles.searchTag}>
					<span>{tag.label}</span>
					<button
						type="button"
						className={styles.searchTagRemove}
						aria-label={`Filter „${tag.label}“ entfernen`}
						onClick={tag.onRemove}
					>
						<AiOutlineClose size={12} aria-hidden />
					</button>
				</li>
			))}
		</ul>
	);
};

export default FilterTags;
