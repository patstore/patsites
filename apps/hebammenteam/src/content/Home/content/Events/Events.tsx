import { useCollection } from "@provider";

const Events = () => {
    const { items } = useCollection("Event");
    console.log(items);
  return (
    <div>Events</div>
  )
}

export default Events