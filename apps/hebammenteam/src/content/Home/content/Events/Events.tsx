import { useCollection } from "@provider";
import EventCard from "./components/EventCard";

const Events = () => {
    const { items } = useCollection("Event");
    console.log(items);
  return (
    <section className="bg-surface">
        <div className="content">
            <h2>
                Unsere Kurse
            </h2>
            <div className="events">
                {items.map((event) => (
                    <EventCard key={event.objectId} event={event} />
                ))}
            </div>

        </div>
    </section>
  )
}

export default Events