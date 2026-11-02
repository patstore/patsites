import { Button, SlideIn } from "@ui";
import React from "react";
import { EventClass } from "@data";
import ArchiveEvent from "./ArchiveEvent";
import sortEventsByDate from "../../Veranstaltungen/functions/sortEventsByDate";

const KongressArchive: React.FC<{ events: EventClass[] }> = ({
    events = []
}) => {
    const [open, setOpen] = React.useState(false);

    const [openEvent, setOpenEvent] = React.useState<
        EventClass["objectId"] | null
    >(null);

    return (
        <>
            <Button
                size="large"
                text="Zum Archiv"
                onClick={() => setOpen(true)}
            />
            <SlideIn
                open={open}
                cancelButtonHandler={() => setOpen(false)}
                width="medium"
            >
                <div>
                    {sortEventsByDate(events).map((event) => {
                        return (
                            <ArchiveEvent
                                key={event.objectId}
                                event={event}
                                open={openEvent === event.objectId}
                                setOpenEvent={setOpenEvent}
                            />
                        );
                    })}
                </div>
            </SlideIn>
        </>
    );
};

export default KongressArchive;
