import { getCurrentEvents, useGetEvent } from "@provider";
import React from "react";
import { headBannerContainer, headBannerContent } from "./styles";
import settings from "@settings";
import { topline } from "@styles";
import { Button, Divider } from "@ui";

const HeadBanner: React.FC = () => {
    const { events, getEventDateString } = useGetEvent();
    const currentEvents = getCurrentEvents(events || []);

    if (!currentEvents?.upcoming) {
        return null;
    }

    const event = currentEvents.upcoming;

    const dateString = getEventDateString(event.dates);

    const date = dateString.date;
    const place = dateString.location;

    return (
        <div css={headBannerContainer}>
            <div css={headBannerContent}>
                <div css={{ flex: "50%" }}>
                    <h2>Save the Date!</h2>
                </div>
                <div css={{ flex: "50%" }}>
                    {date && place && (
                        <div
                            css={[
                                topline,
                                { color: `${settings.colors.white} !important` }
                            ]}
                        >
                            <p>
                                {date} - {place}
                            </p>
                        </div>
                    )}
                    <h3 css={{ fontSize: `24px !important` }}>
                        {currentEvents?.upcoming?.title}
                    </h3>
                    <Divider />
                    {(currentEvents.upcoming?.data?.link || currentEvents.upcoming?.link) && (
                        <Button
                            externalLink={currentEvents.upcoming.data?.link || currentEvents.upcoming.link}
                            text="DGK 2026"
                            background={settings.colors.secondary}
                            color={settings.colors.white}
                            size="large"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeadBanner;
