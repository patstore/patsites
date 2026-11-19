import { useCollection } from "@repo/provider";
import { Footer } from "@components";
import type {
	EntryRecord,
	EventRecord,
	ImageRecord,
	PersonRecord
} from "@types";
import { HomeAthletes, HomeGallery, HomeHero, HomeNews } from "./content";

export function Home() {
	const { items: events } = useCollection<EventRecord>("Event");
	const { items: news } = useCollection<EntryRecord>("Entry");
	const { items: gallery } = useCollection<ImageRecord>("Image");
	const { items: athletes } = useCollection<PersonRecord>("Person");

	return (
		<>
			<HomeHero events={events.slice(0, 6)} />
			<HomeNews news={news.slice(0, 6)} />
			<HomeGallery gallery={gallery} />
			<HomeAthletes athletes={athletes.slice(0, 20)} />
			<Footer />
		</>
	);
}
