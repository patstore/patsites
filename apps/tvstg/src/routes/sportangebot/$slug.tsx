import {
	createFileRoute,
	notFound,
	stripSearchParams
} from "@tanstack/react-router";
import { loadStaticRecords } from "@repo/server";
import { getSportCategory } from "@functions/sport.functions";
import { excerpt, seo } from "@components";
import {
	findGroupBySlug,
	groupPath,
	SPORT_CALENDAR_DEFAULTS,
	sportCalendarSearchSchema
} from "@ui";
import { locationLabel } from "@provider";
import type { PatstoreGroup, PatstoreLocation } from "@types";
import Fachabteilung from "../../content/Fachabteilung/Fachabteilung";
import Gruppe from "../../content/Gruppe/Gruppe";

const SCHEMA_WEEKDAYS = {
	monday: "Monday",
	tuesday: "Tuesday",
	wednesday: "Wednesday",
	thursday: "Thursday",
	friday: "Friday",
	saturday: "Saturday",
	sunday: "Sunday"
} as const;

const loadGroups = () =>
	loadStaticRecords("Group", { states: ["published"] }) as PatstoreGroup[];

const findGroup = (slug: string) => findGroupBySlug(loadGroups(), slug);

/** schema.org Event with a weekly schedule: a recurring training has no single start date. */
function groupJsonLd(group: PatstoreGroup, description: string) {
	const locations = loadStaticRecords("Location", {
		states: ["published"]
	}) as PatstoreLocation[];
	const find = (id: string | null | undefined) =>
		locations.find((location) => location.objectId === id);

	return {
		"@context": "https://schema.org",
		"@type": "Event",
		name: group.title,
		description,
		eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
		organizer: {
			"@type": "SportsOrganization",
			name: "TV Freiburg St. Georgen"
		},
		eventSchedule: group.times.map((time) => ({
			"@type": "Schedule",
			byDay: `https://schema.org/${SCHEMA_WEEKDAYS[time.weekday]}`,
			startTime: time.start,
			endTime: time.end,
			repeatFrequency: "P1W",
			scheduleTimezone: "Europe/Berlin"
		})),
		location: {
			"@type": "Place",
			name: group.times
				.map((time) => locationLabel(time.place, find))
				.find(Boolean)
		}
	};
}

/**
 * `/sportangebot/<slug>` is either a Fachbereich (calendar of that department)
 * or a single training group. Fachbereiche win if a group shares their slug.
 */
export const Route = createFileRoute("/sportangebot/$slug")({
	validateSearch: sportCalendarSearchSchema,
	search: { middlewares: [stripSearchParams(SPORT_CALENDAR_DEFAULTS)] },
	loader: async ({ params }) => {
		const category = await getSportCategory({
			data: { fachbereich: params.slug }
		});
		if (category) {
			return { fachbereich: category.fachbereich };
		}
		if (!findGroup(params.slug)) {
			throw notFound();
		}
		return { fachbereich: null };
	},
	head: ({ loaderData, params }) => {
		if (loaderData?.fachbereich) {
			return {
				meta: seo({
					title: loaderData.fachbereich.title,
					description: loaderData.fachbereich.description
				})
			};
		}

		const groups = loadGroups();
		const group = findGroupBySlug(groups, params.slug);
		if (!group) {
			return {};
		}
		const description =
			excerpt(
				group.description || group.text || group.data?.description
			) ||
			`Trainingszeiten und Informationen zu ${group.title} beim TV Freiburg St. Georgen.`;
		return {
			meta: seo({ title: group.title, description }),
			links: [{ rel: "canonical", href: groupPath(group, groups) }],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(groupJsonLd(group, description))
				}
			]
		};
	},
	component: SportangebotSlugPage
});

function SportangebotSlugPage() {
	const { fachbereich } = Route.useLoaderData();
	const { slug } = Route.useParams();
	const filters = Route.useSearch();
	const navigate = Route.useNavigate();

	if (fachbereich) {
		return (
			<Fachabteilung
				fachabteilung={fachbereich}
				filters={filters}
				onFiltersChange={(next) =>
					navigate({
						search: (prev) => ({ ...prev, ...next }),
						replace: true,
						resetScroll: false
					})
				}
			/>
		);
	}

	const group = findGroup(slug);
	if (!group) {
		throw notFound();
	}
	return <Gruppe group={group} />;
}
