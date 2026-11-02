import { ContentContainer, FlexBox, MultiContentDisplay } from "@ui";
import React from "react";
import history_content from "../constants/history_content";

const History: React.FC = () => {
    return (
        <ContentContainer id="geschichte">
            <FlexBox
                direction="column"
                align="center"
                justify="center"
                styles={{ textAlign: "center", width: "100%" }}
            >
                <h2 css={{ textAlign: "center" }}>
                    Eine Erfolgs-Geschichte <br />
                    mit Zukunft
                </h2>
                <p>
                    Durch die Initiative einzelner proktologisch tätiger Ärzte wurden 1979
                    in Kronberg die &quot;Proktologietagungen&quot; etabliert, bei denen
                    neben der Fortbildung der gemeinsame Erfahrungsaustausch eine zentrale
                    Rolle spielte.
                </p>
            </FlexBox>
            <MultiContentDisplay content={history_content} />
        </ContentContainer>
    );
};

export default History;
