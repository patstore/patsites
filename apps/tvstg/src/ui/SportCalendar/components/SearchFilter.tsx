import React from "react";
import { parseSearchTerms } from "../filters";

type SearchFilterProps = {
	/** Committed search elements; they are shown as tags by `FilterTags`. */
	terms: string[];
	onTermsChange: (terms: string[]) => void;
	/** Text still being typed; it filters live but is not a tag yet. */
	draft: string;
	onDraftChange: (draft: string) => void;
};

/**
 * Search field where every element of the query becomes a tag.
 * Space, comma or Enter (and leaving the field) turn the typed text into tags;
 * Backspace in the empty field removes the last search tag.
 */
const SearchFilter: React.FC<SearchFilterProps> = ({
	terms,
	onTermsChange,
	draft,
	onDraftChange
}) => {
	const commit = () => {
		const added = parseSearchTerms(draft);
		if (added.length > 0) {
			onTermsChange(parseSearchTerms([...terms, ...added].join(" ")));
		}
		onDraftChange("");
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			(event.key === "Enter" || event.key === " " || event.key === ",") &&
			draft.trim()
		) {
			event.preventDefault();
			commit();
		} else if (event.key === "Backspace" && !draft && terms.length > 0) {
			onTermsChange(terms.slice(0, -1));
		}
	};

	return (
		<div className="field">
			<label className="field-label" htmlFor="sport-calendar-search">
				Suche
			</label>
			<input
				id="sport-calendar-search"
				type="search"
				value={draft}
				onChange={(event) => onDraftChange(event.target.value)}
				onKeyDown={handleKeyDown}
				onBlur={commit}
				placeholder="Suche ..."
				className="field-input"
			/>
		</div>
	);
};

export default SearchFilter;
