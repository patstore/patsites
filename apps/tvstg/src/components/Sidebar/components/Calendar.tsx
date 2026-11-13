import React, { useMemo } from "react";
import { Button, DateTile } from "@ui";
import { CalendarProps } from "../types";
import { useNavigate } from "@tanstack/react-router";
import { locationLabel, useCollection } from "@provider";

const Calendar: React.FC<CalendarProps> = ({ category, getAllEvents }) => {
  const navigate = useNavigate();
  const { items: appointments } = useCollection("Appointment");
  const { find: findLocation } = useCollection("Location");

  const events = useMemo(() => {
    if (getAllEvents) {
      const filteredCalendar = [...appointments].filter(
        (event) => new Date(event.date?.start) > new Date(),
      );
      filteredCalendar.sort(
        (a, b) =>
          new Date(a.date?.start).getTime() - new Date(b.date?.start).getTime(),
      );
      return filteredCalendar.slice(0, 5);
    }
    if (category) {
      const filteredCalendar = [...appointments].filter(
        (event) =>
          new Date(event.date?.start) > new Date() &&
          event?.categories?.includes(category),
      );
      filteredCalendar.sort(
        (a, b) =>
          new Date(a.date?.start).getTime() - new Date(b.date?.start).getTime(),
      );
      return filteredCalendar.slice(0, 5);
    }
    return [];
  }, [appointments]);

  return (
    <div>
      <div className="section-header flush">Termine</div>
      {events.length > 0 ? (
        events.map((termin) => (
          <DateTile
            size="small"
            key={termin.objectId}
            title={termin.title || ""}
            date={termin.date?.start || ""}
            description={termin.description || ""}
            location={locationLabel(termin.date?.place, findLocation)}
            categories={termin.categories}
          />
        ))
      ) : (
        <p>Im Moment sind keine Termine hinterlegt</p>
      )}
      <Button text="Zu allen Terminen" onClick={() => navigate({ to: "/termine" })} />
    </div>
  );
};

export default Calendar;
