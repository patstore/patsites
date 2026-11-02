import React, { useMemo } from "react";
import { Layout } from "@components";
import { ContentContainer, HeadContent } from "@ui";
import { useGetEvent } from "@provider";
import { EventClass } from "@data";
import { EventProps } from "./types";
import Event from "./components/Event";
import sortEventsByDate from "./functions/sortEventsByDate";

const Veranstaltungen: React.FC = () => {
    const { events, getEventDateString } = useGetEvent();

    const renderEvents = useMemo(() => {
        const eventArray: EventProps[] = [];

        const sortedEvents = sortEventsByDate(events);

        sortedEvents.forEach((event: EventClass) => {
            if (event.dates && event.dates.length > 0) {
                const findDates = event.dates.filter(
                    (date: EventClass["dates"][number]) =>
                        new Date(date.start).getTime() > new Date().getTime()
                );

                if (findDates.length > 0) {
                    findDates.forEach((date: EventClass["dates"][number]) => {
                        const dateString = getEventDateString([date]);
                        eventArray.push({
                            id: `${event.objectId}-${date.start}`,
                            title: event.title,
                            subtitle: event.description,
                            date: dateString.date,
                            iso_date: date.start,
                            place: dateString.location,
                            text: event?.text,
                            link: event?.link,
                            documents: event?.documents || []
                        });
                    });
                }
            }
        });

        return eventArray.sort((a: EventProps, b: EventProps) => {
            return (
                new Date(a.iso_date).getTime() - new Date(b.iso_date).getTime()
            );
        });
    }, []);

    return (
        <Layout>
            <HeadContent
                title="Aktuelle Seminare, Kongresse und Veranstaltungen"
                subtitle="Hier werden Veranstaltungen unserer Mitglieder unter der Schirmherrschaft bzw. in Zusammenarbeit mit der DGK angekündigt."
                image="/veranstaltungen_header.jpg"
                isInline
            />
            <ContentContainer>
                <h2>Veranstaltungen</h2>
                {renderEvents.map((event: EventProps) => (
                    <Event
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        subtitle={event.subtitle}
                        date={event.date}
                        iso_date={event.iso_date}
                        place={event.place}
                        text={event.text}
                        link={event.link}
                        documents={event.documents}
                    />
                ))}
            </ContentContainer>
        </Layout>
    );
};

export default Veranstaltungen;
