import settings from "@settings";
import { ContentContainer, Divider, FlexBox, SmallContentElement } from "@ui";
import React from "react";
import { headlineContainer } from "@styles";
import { getRecordFileUrl, useGetEntry } from "@provider";

const Guidelines: React.FC = () => {
    const {entrys} = useGetEntry();
    const awmfGuidelines = entrys.filter((guideline) => guideline.categories?.includes("YadbzlPvy9"));
    const dgvsGuidelines = entrys.filter((guideline) => guideline.categories?.includes("FMI5NIZkkl"));
    
    return (
        <ContentContainer id="leitlinien-zur-proktologie">
            <div>
                <div css={headlineContainer}>
                    <h2>Leitlinien zur Proktologie</h2>
                </div>
                <Divider />
                <FlexBox
                    direction="column"
                    align="stretch"
                    justify="space-between"
                    gap={settings.sizes.large}
                    hasFullWidth
                >
                    <div>
                        <h3>AWMF</h3>
                        <p>
                            Folgende <b>Leitlinien zur Proktologie</b>
                            stehen auf den Seiten der AWMF (Arbeitsgemeinschaft der
                            Wissenschaftlichen Medizinischen Fachgesellschaften e.V.) zum
                            Download bereit:
                        </p>
                        <FlexBox
                            direction="row"
                            align="stretch"
                            justify="space-between"
                            gap={settings.sizes.medium}
                            hasFullWidth
                            changeToColumn
                            wrap
                        >
                            {awmfGuidelines.sort((a, b) => a?.title?.localeCompare(b?.title || "") || 0).map((guideline) => (
                                <SmallContentElement
                                    key={guideline.objectId}
                                    flex={["1 1 100%", "1 1 100%", "1 1 30%"]}
                                    title={guideline.title || ""}
                                    text={guideline.description || ""}
                                    link={guideline.link || getRecordFileUrl(guideline) || ""}
                                />
                            ))}
                        </FlexBox>
                    </div>
                    <Divider />
                    <div>
                        <h3>DGVS</h3>
                        <p>
                            Folgende Leitlinien stehen auf den Seiten der
                            <a
                                href="https://www.dgvs.de/wissen/leitlinien/leitlinien-dgvs/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                DGVS
                            </a>
                            (Deutsche Gesellschaft für Gastro­en­te­ro­lo­gie, Verdauungs- und
                            Stoffwechselerkrankungen) zum Download bereit:
                        </p>
                        <FlexBox
                            direction="row"
                            align="stretch"
                            justify="space-between"
                            gap={settings.sizes.medium}
                            hasFullWidth
                            changeToColumn
                            wrap
                        >
                            {dgvsGuidelines.sort((a, b) => a?.title?.localeCompare(b?.title || "") || 0).map((guideline) => (
                                <SmallContentElement
                                    key={guideline.objectId}
                                    flex={["1 1 100%", "1 1 100%", "1 1 30%"]}
                                    title={guideline.title || ""}
                                    text={guideline.description || ""}
                                    link={guideline.link || getRecordFileUrl(guideline) || ""}
                                />
                            ))}
                        </FlexBox>
                    </div>
                </FlexBox>
            </div>
        </ContentContainer>
    );
};

export default Guidelines;
