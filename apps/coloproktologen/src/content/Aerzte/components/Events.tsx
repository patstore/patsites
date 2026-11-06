import { getDateString, useCollection } from "@provider";
import { buttonsContainer, contentBox } from "@styles";
import { Button, ContentContainer, FlexBox, Label } from "@ui";
import React, { useMemo } from "react";
import { EventClass, EventDate, LocationClass, PatstoreDownload, PatstoreEvent } from "@types";
import { getRecordFileUrl } from "@provider";
import settings from "@settings";
import { downloadDocument, sortEventsByDate } from "@provider";
import { eventTextContainer } from "../styles";
export type EventProps = {
    title: string;
    description: string;
    date: string;
    iso_date: string;
    place: string;
    text: string;
    link: string;
    documents: string[];
    id: string;
};

const getEventDateString = (dates: PatstoreEvent["dates"], locations: LocationClass[]) => {
    const date = {
        date: "",
        location: ""
    };

    if (dates && dates?.length > 0) {
        if (dates.length === 1) {
            if (dates[0].full_day) {
                const startDate = getDateString(dates[0].start);
                const endDate = getDateString(dates[0].end);
                if (startDate.date === endDate.date) {
                    date.date = `${startDate.date}`;
                } else if (!!startDate.date && !!endDate.date) {
                    date.date = `${startDate.date} - ${endDate.date}`;
                } else {
                    date.date = `${startDate.date}`;
                }
                date.location = getEventLocationString(dates[0].place, locations);
            } else {
                date.date = `${getDateString(dates[0].start).date} / ${getDateString(dates[0].start).time} - ${
                    getDateString(dates[0].end).time
                }`;
                date.location = getEventLocationString(dates[0].place, locations);
            }
        }
    }

    if (dates && dates?.length > 1) {
        const lastIndex = dates.length - 1;
        date.date = `${getDateString(dates[0].start).date} - ${getDateString(dates[lastIndex].end).date}`;
        date.location = getEventLocationString(dates[0].place, locations);
    }

    return date;
};


const EventElement: React.FC<{ event: EventProps }> = ({ event }) => {
    const { find: findDownload } = useCollection<PatstoreDownload>("Download");
    
    console.log(event);

    return (
        <div css={contentBox()}>
            <FlexBox
                direction="row"
                align="center"
                justify="space-between"
                changeToColumn
                hasFullWidth
            >
                <div css={eventTextContainer}>
                    <Label text={event.date  || ""} />
                    <h3>{event.title}</h3>
                    {event?.description && <p>{event.description}</p>}
                </div>
                <div css={buttonsContainer}>
                    {event?.documents?.length > 0 && (
                        <Button
                            background={settings.colors.primary}
                            text="Download"
                            onClick={() => downloadDocument(getRecordFileUrl(findDownload(event.documents[0])))}
                        />
                    )}

                    {event?.link && (
                        <Button
                            background={settings.colors.primary}
                            text="Link"
                            externalLink={event.link}
                        />
                    )}
                </div>
            </FlexBox>
        </div>
    );
};

const Events: React.FC = () => {
    const { items: events } = useCollection<EventClass>("Event");
    const { items: locations } = useCollection<LocationClass>("Location");

    const filteredEvents = useMemo(() => {
        const eventArray: EventProps[] = [];

        const sortedEvents = sortEventsByDate(events);

        sortedEvents.forEach((event: EventClass) => {
            if (event.dates && event.dates.length > 0) {
                const findDates = event.dates.filter(
                    (date: EventDate) =>
                        new Date(date.start || "").getTime() > new Date().getTime()
                );

                if (findDates.length > 0) {
                    findDates.forEach((date: EventDate) => {
                        const dateString = getEventDateString([date], locations);

                        console.log(dateString);
                        eventArray.push({
                            id: `${event.objectId}-${date.start}`,
                            title: event.title || "",
                            description: event.description || "",
                            date: `${dateString.date} ${dateString.location ? `- ${dateString.location}` : ""}`,
                            iso_date: date.start || "",
                            place: dateString.location || "",
                            text: event?.text || "",
                            link: event?.link || "",
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
    }, [events]);


    return (
        <ContentContainer id="veranstaltungen">
            <h2>Veranstaltungen, Fortbildungen & Kongresse zur Proktologie</h2>
            <FlexBox direction="column"
                align="stretch"
                gap={settings.sizes.medium}
                hasFullWidth>
                {filteredEvents.map((event) => (
                    <EventElement key={event.id} event={event} />
                ))}
            </FlexBox>
        </ContentContainer>
    );
};

const getEventLocationString = (
    location: EventDate["place"],
    allLocations: LocationClass[]
) => {
    if (!location) {
        return "";
    }
    if (location.type === "address") {
        if (location.address) {
            return location.address;
        } else return "";
    }

    if (location.type === "location") {
        if (location.location) {
            const locationObject = allLocations.find(
                (loc) => loc.objectId === location.location
            );
            if (locationObject && locationObject.title) {
                return locationObject.title;
            } else return "";
        } else return "";
    }

    if (location.type === "online") {
        return "online";
    }

    if (location.type === "map") {
        return "Map";
    }
    return "";
};

export default Events;
