import { EventClass } from "@data";
import styles from "../Event.module.css";
import { ChevronRightIcon } from "lucide-react";

const EventCard = ({ event }: { event: EventClass }) => {
	return (
		<div className={styles.event_card}>
			<div className={styles.event_cell}>
				<h3>{event.title}</h3>
			</div>
			<div className={styles.event_cell}>
				<p>{event.description}</p>
			</div>
			<div className={styles.cell}>
				<a href={`/kurse/${event.slug}`}>
					<button className="inverted with-icon">
						Zur Veranstaltung
						<span className="icon">
							<ChevronRightIcon />
						</span>
					</button>
				</a>
			</div>
		</div>
	);
};

export default EventCard;
