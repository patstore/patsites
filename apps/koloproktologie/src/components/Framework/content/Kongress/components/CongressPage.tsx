import { Button, FlexBox } from "@ui";
import React from "react";

const CongressPage: React.FC<{ title: string }> = ({ title }) => {
    return (
        <FlexBox
            direction="column"
            align="center"
            justify="space-between"
            gap={"24px"}
            styles={{ height: "100%" }}
        >
            <h4 css={{ textAlign: "center" }}>{title}</h4>
            <p css={{ textAlign: "center" }}>
                Alle Vorträge des Hauptprogramms stehen online - jetzt für 3
                Monate verfügbar.
            </p>

            <Button
                size="medium"
                text="Vorträge On Demand 2026"
                internalLink={"/aktivitaeten/kongress/videos"}
            />
        </FlexBox>
    );
};

export default CongressPage;
