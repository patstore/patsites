import { useCollection } from "@provider";
import EventCard from "./components/EventCard";

const Events = () => {
	const { items } = useCollection("Event");
	return (
		<section>
			<div className="content">
				<div className="eyebrow">Kurse & Workshops</div>
				<h2>Erfahre mehr über unsere Kurse & Workshops</h2>
				<div className="events">
					{items.map((event) => (
						<EventCard key={event.objectId} event={event} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Events;
