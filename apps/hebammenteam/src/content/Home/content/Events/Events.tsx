import { useCollection } from "@provider";
import EventCard from "./components/EventCard";

const Events = () => {
	const { items } = useCollection("Event");
	return (
		<section>
			<div className="content">
				<div className="eyebrow" style={{ gridColumn: "span 3" }}>
					Kurse & Workshops
				</div>
				<div style={{ gridColumn: "span 3" }}>
					<h2>Erfahre mehr über unsere Kurse & Workshops</h2>
				</div>
				<div className="events" style={{ gridColumn: "span 3" }}>
					{items.map((event) => (
						<EventCard key={event.objectId} event={event} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Events;
