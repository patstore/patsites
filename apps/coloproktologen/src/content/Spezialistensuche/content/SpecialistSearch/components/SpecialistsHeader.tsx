import React from "react";
import { specialistsHeaderContainer } from "../styles";
import { Button } from "@ui";
import { SpecialistsHeaderProps } from "../types";
import settings from "@settings";

const SpecialistsHeader: React.FC<SpecialistsHeaderProps> = ({
    highlightedLocation,
    setHighlightedLocation,
    locations
}) => {
    return (
        <div css={specialistsHeaderContainer}>
            <div>
                <div css={{ visibility: highlightedLocation ? "visible" : "hidden" }}>
                    {
                        <Button
                            text="<< Zu allen Ergebnissen"
                            onClick={() => setHighlightedLocation(undefined)}
                            disabled={!highlightedLocation}
                            background={"transparent"}
                            color={settings.colors.dark}
                        />
                    }
                </div>
            </div>
            <div>
                <p css={{ margin: "0 !important" }}>
                    <span css={{ fontWeight: "bold" }}>Ergebnis:</span> {locations.length}{" "}
                    Kliniken /{" "}
                    {locations.reduce((acc, location) => acc + location.users.length, 0)}{" "}
                    Ärzte
                </p>
            </div>
        </div>
    );
};

export default SpecialistsHeader;
