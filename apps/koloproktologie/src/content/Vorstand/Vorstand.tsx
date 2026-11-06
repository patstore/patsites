import {
    HeadContent,
    TextContentElement,
    ContentElement,
    Person,
    ContentContainer,
    FlexBox,
    Divider
} from "@ui";
import React from "react";
import { Layout } from "@components";
import { Person as PersonType } from "./types";
import settings from "@settings";
import { useCollection } from "@provider";
import type { PersonClass } from "@data";
import { topline } from "@styles";

const Vorstand: React.FC = () => {
    const { items: persons } = useCollection<PersonClass>("Person");

    const getData = () => {
        const vorstand: PersonType[] = [];
        const praesidium: PersonType[] = [];
        const ehrenmitglieder: PersonType[] = [];
        persons.forEach((person) => {
            if (person.categories?.includes("W88YvuBeJ5")) {
                vorstand.push({
                    name: person.title,
                    portrait: person.image,
                    text: person.data?.info_vors,
                    order_vors: Number(person.data?.order_vors) || 10,
                    order_praes: Number(person.data?.order_praes) || 10,
                    email: person.email
                });
            }
            if (person.categories?.includes("vtQYgdV6Vx")) {
                praesidium.push({
                    name: person.title,
                    portrait: person.image,
                    text: person.data?.info_praes,
                    order_vors: Number(person.data?.order_vors) || 10,
                    order_praes: Number(person.data?.order_praes) || 10,
                    email: person.email
                });
            } else if (person.categories?.includes("FbXiRAprHn")) {
                ehrenmitglieder.push({
                    name: person.title,
                    portrait: person.image,
                    text: person.data?.text,
                    order_vors: Number(person.data?.order_vors) || 10,
                    order_praes: Number(person.data?.order_praes) || 10,
                    email: person.email
                });
            }
        });

        return {
            vorstand: vorstand.sort((a, b) => a.order_vors - b.order_vors),
            praesidium: praesidium.sort(
                (a, b) => a.order_praes - b.order_praes
            ),
            ehrenmitglieder: ehrenmitglieder
        };
    };

    return (
        <Layout>
            <HeadContent
                title="Kompetenz und gesellschaftliche Verantwortung"
                subtitle="Als wissenschaftliche Fachgesellschaft sehen wir uns in der gesellschaftlichen Verantwortung, die koloproktologische Versorgung in Deutschland zu verbessern und zu fördern.
Für Menschen mit Enddarm-Erkrankungen wollen wir Hoffnungsträger und Impulsgeber sein und mit unseren Zielen einen Beitrag zum Wohle der Allgemeinheit leisten."
                image="/vorstand_header.jpg"
            />

            <ContentContainer largeBackground={settings.colors.light}>
                <TextContentElement
                    topline="Der Vorstand"
                    title="Wir stellen uns vor"
                    text="Der Vorstand besteht aus dem Präsidenten, dem ersten Vizepräsidenten (Präsident der vorhergehenden Amtsperiode), dem zweiten Vizepräsidenten (Präsident der kommenden Amtsperiode), dem Generalsekretär und dem Schatzmeister."
                />
            </ContentContainer>
            <ContentContainer>
                <ContentElement
                    elements={getData().vorstand.map((element) => {
                        return {
                            id: element.name,
                            width: "1",
                            content: (
                                <Person
                                    key={element.name}
                                    img={element.portrait}
                                    name={element.name}
                                    info={element?.text}
                                    email={element.email}
                                />
                            )
                        };
                    })}
                />
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <TextContentElement
                    topline="Das Präsidium"
                    title="Unterstützend tätig mit interdisziplinärer Zielsetzung"
                    text="Das Präsidium der Gesellschaft unterstützt den Vorstand und bringt seine interdisziplinäre Expertise zur Weiterentwicklung der Koloproktologie ein. Es setzt sich aus Vertretern assoziierter Gesellschaften, ehemaligen Vorstandsmitgliedern sowie von der Mitgliederversammlung gewählten und vom Vorstand berufenen Mitgliedern zusammen."
                />
            </ContentContainer>
            <ContentContainer>
                <ContentElement
                    elements={getData().praesidium.map((element) => {
                        return {
                            id: element.name,
                            width: "1",
                            content: (
                                <Person
                                    key={element.name}
                                    img={element.portrait}
                                    name={element.name}
                                    info={element?.text}
                                    email={element.email}
                                />
                            )
                        };
                    })}
                />
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <FlexBox
                    direction="column"
                    justify="center"
                    align="center"
                    hasFullWidth
                >
                    <div css={topline}>Ehrenmitglied</div>
                    <h3 css={{ marginTop: 0 }}>
                        Um die Proktologie verdient gemacht hat sich
                    </h3>
                    <Divider />
                    {getData().ehrenmitglieder.map((element) => {
                        return (
                            <Person
                                key={element.name}
                                img={element.portrait}
                                name={element.name}
                                info={element?.text}
                                email={element.email}
                                spacingAfterTitle
                            />
                        );
                    })}
                </FlexBox>
            </ContentContainer>
        </Layout>
    );
};

export default Vorstand;
