import React from "react";
import { Layout } from "@components";
import { ContentContainer, FlexBox, HeadContent, Person } from "@ui";
import projects from "./constants/projects";
import Project from "./components/Project";
import Foerderung from "./components/Foerderung";
import PreviousProjects from "./components/PreviousProjects";
import settings from "@settings";
import { useGetPerson } from "@provider";

const Forschungsfoerderung: React.FC = () => {
    const { findPerson } = useGetPerson();
    const ansprechpartner = findPerson("5hGFkZk9RW");

    return (
        <Layout>
            <HeadContent
                title="Forschungsförderung"
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
                        <h3>
                            Perspektiven der Koloproktologie aufzeigen und
                            eröffnen
                        </h3>
                        <p>
                            Ein Stipendium der DGK bietet ideale Voraussetzungen
                            für wissenschaftliches Arbeiten, da es Freiräume zur
                            Verwirklichung einer wissenschaftlichen Karriere
                            ermöglicht.
                        </p>
                        <p>
                            Mit unserer Förderung zur interdisziplinären
                            Forschung von Dickdarm- und Enddarmerkrankungen
                            möchten wir Perspektiven eröffnen und aufzeigen.
                        </p>
                        <p>
                            <a href="#voraussetzung-forschungsfoerderung-title">
                                Das Stipendium richtet sich an ...
                            </a>
                        </p>
                    </div>
                    {ansprechpartner && (
                        <div css={[{ flex: "1 1 50%", order: 1 }]}>
                            <FlexBox
                                direction="column"
                                align="flex-start"
                            >
                                <Person
                                    name={ansprechpartner?.title}
                                    img={ansprechpartner?.image}
                                    info="Nachwuchsbeauftragter"
                                    email={"info@koloproktologie.org"}
                                />
                            </FlexBox>
                        </div>
                    )}
                </FlexBox>
            </ContentContainer>
            <ContentContainer noPaddingTop>
                <h2>Aktuell geförderte Forschungsprojekte</h2>
                <FlexBox
                    direction="row"
                    align="stretch"
                    gap={settings.sizes.large}
                    hasFullWidth
                    changeToColumn
                    wrap
                >
                    {projects
                        .filter((project) => !project.is_completed)
                        .map((project) => (
                            <Project
                                key={project.id}
                                id={project.id}
                                title={project.title}
                                subtitle={project.subtitle}
                                text={project.text}
                            />
                        ))}
                </FlexBox>
                <PreviousProjects />
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.primary}>
                <Foerderung />
            </ContentContainer>
        </Layout>
    );
};

export default Forschungsfoerderung;
