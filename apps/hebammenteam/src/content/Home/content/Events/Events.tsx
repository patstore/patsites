import { EventClass } from '@data';
import { useCollection } from '@provider';

const Events = () => {
    const {items} = useCollection<EventClass>("Event");
    console.log(items);
  return (
    <div>Events</div>
  )
}

export default Events