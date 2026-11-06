import React from "react";
import { Layout } from "@components";
import { ContentContainer, Divider, FlexBox, HeadContent, Person } from "@ui";
import guidelines_dgk from "./constants/guidelines_dgk";
import guidelines_cooperations from "./constants/guidelines_cooperations";
import { useCollection } from "@provider";
import type { PersonClass } from "@data";
import settings from "@settings";
import { highlightContent } from "@styles";

const Leitlinien: React.FC = () => {
    const { find: findPerson } = useCollection<PersonClass>("Person");
    const beauftrager = findPerson("L0s8iziyOp");

    return (
        <Layout>
            <HeadContent
                title="Leitlinien"
                isInline
            />
            <ContentContainer noPaddingTop>
                <h2>Ansprechpartner</h2>
                <FlexBox
                    align="flex-start"
                    gap={settings.sizes.medium}
                    changeToColumn
                    hasFullWidth
                >
                    <div css={{ flex: "1 1 50%", order: 2 }}>
                        <h3>Fachperspektiven der Koloproktologie</h3>
                        <p>
                            Leitlinien sind systematisch entwickelte
                            Handlungsempfehlungen, die Ärztinnen und Ärzten eine
                            solide Grundlage für diagnostische und
                            therapeutische Entscheidungen bieten und Patienten
                            bei der Wahl ihrer Behandlung unterstützen.
                        </p>
                        <p>
                            Bei der Erstellung und Aktualisierung von Leitlinien
                            bringen wir die koloproktologische Expertise ein, um
                            praxisnahe Empfehlungen zu entwickeln und die
                            Qualität der Versorgung unseres Fachgebiets zu
                            stärken.
                        </p>
                    </div>
                    {beauftrager && (
                        <div css={[{ flex: "1 1 50%", order: 1 }]}>
                            <FlexBox
                                direction="column"
                                align="flex-start"
                            >
                                <Person
                                    name={beauftrager?.title}
                                    img={beauftrager?.image}
                                    info="Leitlinienbeauftragter"
                                    email={"info@koloproktologie.org"}
                                />
                            </FlexBox>
                        </div>
                    )}
                </FlexBox>
            </ContentContainer>

            <ContentContainer noPaddingTop>
                <div css={{ width: "100%" }}>
                    <h2>Leitlinien unter Federführung der DGK</h2>
                    <FlexBox
                        direction="column"
                        gap={settings.sizes.medium}
                        align="stretch"
                        hasFullWidth
                    >
                        {guidelines_dgk.map((guideline) => (
                            <div
                                key={guideline.id}
                                css={highlightContent({
                                    background: settings.colors.light
                                })}
                            >
                                <a
                                    href={guideline.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {guideline.title}
                                </a>
                                <p>{guideline.text}</p>
                            </div>
                        ))}
                    </FlexBox>
                </div>
                <Divider />
                <h2>Wundpflege</h2>
                <video
                    controls
                    src="/videos/Bcd_Wundpflege_Video.mp4"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%"
                    }}
                />
                <Divider />
                <Divider />
                <div css={{ width: "100%" }}>
                    <h2>Empfehlungen zur Hygiene</h2>
                    <div
                        css={highlightContent({
                            background: settings.colors.light
                        })}
                    >
                        <p>
                            <a
                                href="/Hygieneleitfaden_BCD-DGK_2024.pdf"
                                target="_blank"
                            >
                                Leitfaden und Empfehlungen für die Hygiene in
                                der Koloproktologie 2024
                            </a>
                        </p>
                        <p>
                            Herausgegeben vom Berufsverband Coloproktologie
                            Deutschland e.V. (BCD) und der Deutschen
                            Gesellschaft für Koloproktologie (DGK)
                        </p>
                        <p>Quelle: coloproctology, 8. April 2024</p>
                    </div>
                </div>
                <Divider />

                <h2>
                    Leitlinien in Zusammenarbeit mit anderen Fachgesellschaften
                </h2>
                <ul>
                    {guidelines_cooperations.map((guideline) => (
                        <li key={guideline.id}>
                            <a
                                href={guideline.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {guideline.title}
                            </a>
                            <p>{guideline.text}</p>
                        </li>
                    ))}
                </ul>
            </ContentContainer>
        </Layout>
    );
};

export default Leitlinien;
