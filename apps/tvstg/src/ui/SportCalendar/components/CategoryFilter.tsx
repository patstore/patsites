import React from "react";
import type { CategoryOptions } from "../hooks/useCategoryOptions";

type CategoryFilterProps = {
	options: CategoryOptions;
	/** `objectId` of the selected category, `null` for all. */
	value: string | null;
	onChange: (category: string | null) => void;
};

/** One-of-many dropdown over Fachbereiche and Sportarten. */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
	options,
	value,
	onChange
}) => (
	<div className="field">
		<label className="field-label" htmlFor="sport-calendar-category">
			Kategorie
		</label>
		<select
			id="sport-calendar-category"
			className="field-input"
			value={value ?? ""}
			onChange={(event) => onChange(event.target.value || null)}
		>
			<option value="">Alle Kategorien</option>
			{options.fachbereiche.length > 0 && (
				<optgroup label="Fachbereich">
					{options.fachbereiche.map((option) => (
						<option key={option.id} value={option.id}>
							{option.title}
						</option>
					))}
				</optgroup>
			)}
			{options.sportarten.length > 0 && (
				<optgroup label="Sportart">
					{options.sportarten.map((option) => (
						<option key={option.id} value={option.id}>
							{option.title}
						</option>
					))}
				</optgroup>
			)}
		</select>
	</div>
);

export default CategoryFilter;
