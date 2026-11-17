import type { EventRecord } from "@types";
import { HeroEvent } from "./components/HeroEvent";
import styles from "./HomeHero.module.scss";

export function HomeHero({ events }: { events: EventRecord[] }) {
	return (
		<section className={`${styles.home_hero} header-section`}>
			{events.length === 0 ? (
				<div>
					<h2>No events found</h2>
				</div>
			) : (
				events.map((event) => (
					<HeroEvent key={event.objectId} event={event} />
				))
			)}
		</section>
	);
}
