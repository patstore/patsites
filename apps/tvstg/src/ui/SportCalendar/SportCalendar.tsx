import React, { useMemo, useState } from "react";
import {
	AiOutlineAppstore,
	AiOutlineDown,
	AiOutlineUnorderedList
} from "react-icons/ai";
import type { EventTime } from "@types";
import { FlexBox } from "../FlexBox";
import { ContentBlock } from "../ContentBlock";
import styles from "./SportCalendar.module.css";
import WeekDays from "./content/WeekDay";
import { CalendarView } from "./content/WeekDay/types";
import useGetTrainingTimes from "./hooks/useGetTrainingTimes";
import useCategoryOptions from "./hooks/useCategoryOptions";
import { useDebounceValue } from "usehooks-ts";
import { Divider } from "../Divider";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
import CategoryFilter from "./components/CategoryFilter";
import SearchFilter from "./components/SearchFilter";
import FilterTags, { type FilterTag } from "./components/FilterTags";
import genders from "./constants/genders";
import { parseSearchTerms, SportCalendarFilters } from "./filters";
import WeekdayButtons from "./content/WeekDay/components/WeekdayButtons";
import {
	berlinWeekday,
	countGroupsByWeekday,
	WEEKDAY_ORDER
} from "./content/WeekDay/weekDaysUtils";

const VIEWS = [
	{
		value: "list",
		label: "Listenansicht",
		icon: <AiOutlineUnorderedList size={18} />
	},
	{
		value: "grid",
		label: "Kachelansicht",
		icon: <AiOutlineAppstore size={18} />
	}
] satisfies { value: CalendarView; label: string; icon: React.ReactNode }[];

type SportKalenderProps = {
	categories: string[];
	filters: SportCalendarFilters;
	onFiltersChange: (filters: Partial<SportCalendarFilters>) => void;
};

const SportKalender: React.FC<SportKalenderProps> = ({
	categories = [],
	filters,
	onFiltersChange
}) => {
	const categoryOptions = useCategoryOptions(categories);
	const category = useMemo(() => {
		const known = [
			...categoryOptions.fachbereiche,
			...categoryOptions.sportarten
		];
		return known.some((option) => option.id === filters.kategorie)
			? (filters.kategorie ?? null)
			: null;
	}, [categoryOptions, filters.kategorie]);

	// Committed search elements live in the URL; the text still being typed
	// filters live (debounced) until it becomes a tag.
	const searchTags = useMemo(
		() => parseSearchTerms(filters.suche),
		[filters.suche]
	);
	const [searchDraft, setSearchDraft] = useState("");
	const [debouncedDraft] = useDebounceValue(searchDraft, 300);
	const searchTerms = useMemo(
		() => parseSearchTerms([...searchTags, debouncedDraft].join(" ")),
		[searchTags, debouncedDraft]
	);

	const { trainingszeiten, ages } = useGetTrainingTimes({
		categories,
		searchTerms,
		category,
		age: filters.alter ?? null,
		gender: filters.geschlecht
	});

	const groupCounts = useMemo(
		() => countGroupsByWeekday(trainingszeiten),
		[trainingszeiten]
	);
	const [requestedWeekday, setRequestedWeekday] = useState<
		EventTime["weekday"]
	>(() => berlinWeekday());
	// A day without results is not shown: jump to the first day that has some.
	// The chosen day is kept, so it comes back once it has results again.
	const selectedWeekday = useMemo(
		() =>
			groupCounts[requestedWeekday] > 0
				? requestedWeekday
				: (WEEKDAY_ORDER.find((day) => groupCounts[day] > 0) ??
					requestedWeekday),
		[groupCounts, requestedWeekday]
	);
	const [view, setView] = useState<CalendarView>("list");
	// Below the desktop breakpoint the filter column sits above the calendar,
	// so it starts closed and opens from the toggle. Desktop ignores this.
	const [filtersOpen, setFiltersOpen] = useState(false);

	// One tag per active filter, in the order of the filter fields below.
	const filterTags = useMemo<FilterTag[]>(() => {
		const tags: FilterTag[] = searchTags.map((term) => ({
			key: `suche-${term.toLowerCase()}`,
			label: term,
			onRemove: () =>
				onFiltersChange({
					suche: searchTags.filter((item) => item !== term).join(" ")
				})
		}));

		const fachbereich = categoryOptions.fachbereiche.find(
			(option) => option.id === category
		);
		const sportart = categoryOptions.sportarten.find(
			(option) => option.id === category
		);
		if (fachbereich || sportart) {
			tags.push({
				key: "kategorie",
				label: fachbereich
					? `Fachbereich: ${fachbereich.title}`
					: `Sportart: ${sportart?.title}`,
				onRemove: () => onFiltersChange({ kategorie: undefined })
			});
		}

		const gender = genders.find(
			(option) => option.value === filters.geschlecht
		);
		if (gender && gender.value !== "all") {
			tags.push({
				key: "geschlecht",
				label: `Geschlecht: ${gender.label}`,
				onRemove: () => onFiltersChange({ geschlecht: "all" })
			});
		}

		if (filters.alter != null) {
			tags.push({
				key: "alter",
				label: `Alter: ${filters.alter === 19 ? "19+" : filters.alter}`,
				onRemove: () => onFiltersChange({ alter: undefined })
			});
		}

		return tags;
	}, [
		searchTags,
		categoryOptions,
		category,
		filters.geschlecht,
		filters.alter,
		onFiltersChange
	]);

	return (
		<div className={styles.layout}>
			<WeekdayButtons
				counts={groupCounts}
				selected={selectedWeekday}
				onSelect={setRequestedWeekday}
			/>

			<ContentBlock className={styles.main}>
				<FlexBox
					direction="column"
					align="stretch"
					justify="space-between"
					gap="12px"
					wrap
					hasFullWidth
				>
					{trainingszeiten.length === 0 ? (
						<p className={styles.empty}>
							Keine Gruppen gefunden. Passe die Suche oder die
							Filter an.
						</p>
					) : (
						<WeekDays
							trainingszeiten={trainingszeiten}
							view={view}
							selectedWeekday={selectedWeekday}
						/>
					)}
				</FlexBox>
			</ContentBlock>

			<aside
				className={styles.sidebar}
				data-expanded={filtersOpen}
				aria-label="Trainingszeiten filtern"
			>
				<div className={`${styles.sidebarSticky} content-block padded`}>
					<button
						type="button"
						className={styles.filterToggle}
						aria-expanded={filtersOpen}
						aria-controls="sport-calendar-filters"
						onClick={() => setFiltersOpen((open) => !open)}
					>
						<span>
							Filter
							{filterTags.length > 0
								? ` (${filterTags.length})`
								: ""}
						</span>
						<AiOutlineDown
							className={styles.filterToggleIcon}
							aria-hidden
						/>
					</button>
					<div
						id="sport-calendar-filters"
						className={styles.filterPanel}
					>
						<div className="content-stack">
							<div
								className={styles.viewSwitch}
								role="group"
								aria-label="Ansicht"
							>
								{VIEWS.map((option) => (
									<button
										key={option.value}
										type="button"
										className="btn-choice square"
										aria-label={option.label}
										aria-pressed={view === option.value}
										onClick={() => setView(option.value)}
									>
										{option.icon}
									</button>
								))}
							</div>
							<Divider />
							<FilterTags tags={filterTags} />
							<SearchFilter
								terms={searchTags}
								onTermsChange={(terms) =>
									onFiltersChange({ suche: terms.join(" ") })
								}
								draft={searchDraft}
								onDraftChange={setSearchDraft}
							/>
							<CategoryFilter
								options={categoryOptions}
								value={category}
								onChange={(kategorie) =>
									onFiltersChange({
										kategorie: kategorie ?? undefined
									})
								}
							/>
							<GenderFilter
								gender={filters.geschlecht}
								setGender={(geschlecht) =>
									onFiltersChange({ geschlecht })
								}
							/>
							<AgeFilter
								ages={ages}
								age={filters.alter ?? null}
								setAge={(alter) =>
									onFiltersChange({
										alter: alter ?? undefined
									})
								}
							/>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default SportKalender;
