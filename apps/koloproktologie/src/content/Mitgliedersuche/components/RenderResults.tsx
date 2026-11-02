import React from "react";
import { RenderResultsProps } from "../types";
import { highlightContent } from "@styles";
import { ContentContainer, FlexBox } from "@ui";
import settings from "@settings";

const RenderResults: React.FC<RenderResultsProps> = ({ results }) => {
    if (!results) {
        return null;
    }
    return (
        <ContentContainer>
            {results.length > 0 ? (
                results.map((result) => {
                    return (
                        <div
                            key={result.id}
                            css={[
                                highlightContent({
                                    background: settings.colors.light
                                }),
                                { width: "100%" }
                            ]}
                        >
                            <FlexBox
                                direction="row"
                                align="center"
                                justify="space-between"
                                hasFullWidth
                            >
                                <p>
                                    {result.title} {result.name}
                                </p>
                                <p>{`${result.zip.toString()} ${result.city}`}</p>
                            </FlexBox>
                        </div>
                    );
                })
            ) : (
                <div>
                    <p>Keine Ergebnisse</p>
                </div>
            )}
        </ContentContainer>
    );
};

export default RenderResults;
