import { Layout } from "@components";
import { useCollection } from "@provider";
import type { PersonClass } from "@data";
import settings from "@settings";
import {
    ContentContainer,
    FlexBox,
    HeadContent,
    Person,
    TextContentElement
} from "@ui";
import React from "react";

const Zertifizierung: React.FC = () => {
    const { find: findPerson } = useCollection<PersonClass>("Person");
    const ansprechpartner = findPerson("hVhSGIfHH3");

    return (
        <Layout>
            <HeadContent
                title="Zertifizierung"
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
                        <h3>Zertifizierung von Kompetenz-Zentren</h3>
                        <p>
                            Ein Kompetenz- bzw. Referenz- und Exzellenz-Zentrum
                            erkennt und behandelt alle benignen und malignen
                            Erkrankungen des Kolons, Rektums und Anus inkl.
                            Fehlbildungen, Funktionsstörungen und Folgezustände
                            aus vorausgegangenen Verletzungen oder Operationen.
                            Die Therapie beinhaltet den konservativen und
                            operativen Bereich.
                        </p>
                    </div>
                    {ansprechpartner && (
                        <div css={[{ flex: "1 1 50%", order: 1 }]}>
                            <FlexBox
                                direction="column"
                                align="flex-start"
                            >
                                <Person
                                    name={ansprechpartner?.title ?? ""}
                                    img={ansprechpartner?.image ?? undefined}
                                    info="Zertifizierungsbeauftragter"
                                    email={"info@koloproktologie.org"}
                                />
                            </FlexBox>
                        </div>
                    )}
                </FlexBox>
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <TextContentElement title="Zertifizierung für chirurgische Koloproktologie">
                    <p>
                        Die Zertifizierungen zu Kompetenz- bzw. Referenz- und
                        Exzellenz-Zentren für chirurgische Koloproktologie
                        werden durch die Deutsche Gesellschaft für
                        Koloproktologie (DGK) in Zusammenarbeit mit der
                        <a
                            href="https://www.dgav.de/arbeitsgemeinschaften/cacp/"
                            target="_blank"
                            rel="noreferrer noopener"
                            title="Zur Internetseite der CACP"
                        >
                            Chirurgischen Arbeitsgemeinschaft für
                            Coloproktologie (CACP)
                        </a>
                        und der
                        <a
                            href="https://www.dgav.de/"
                            target="_blank"
                            rel="noreferrer noopener"
                            title="Zur Internetseite der DGAV"
                        >
                            Deutschen Gesellschaft für Allgemein- und
                            Viszeralchirurgie (DGAV)
                        </a>
                        durchgeführt.
                    </p>
                    <p>
                        <a
                            href="https://backend.dgav.de/wp-content/uploads/2025/09/DGAV_ZertO_6.1.pdf"
                            target="_blank"
                            rel="noreferrer noopener"
                            title="Weitere Informationen über die Zertifizierung der DGAV"
                            className="no-padding-left"
                        >
                            Nähere Informationen über die Zertifizierung der
                            DGAV
                        </a>
                        finden Sie auf der Internetseite der DGAV.
                    </p>
                </TextContentElement>
            </ContentContainer>
            <ContentContainer>
                <TextContentElement title="Zertifizierung für interdisziplinäre Kontinenz- und Beckenboden-Zentren">
                    <p>
                        Gemeinsam mit der
                        <a
                            href="https://www.dgav.de/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="no-padding-right"
                        >
                            Deutschen Gesellschaft für Allgemein- und
                            Viszeralchirurgie (DGAV)
                        </a>
                        , der
                        <a
                            href="https://www.dggg.de/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="no-padding-right"
                        >
                            Deutschen Gesellschaft für Gynäkologie (DGGG)
                        </a>
                        , der
                        <a
                            href="https://www.urologenportal.de/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Deutschen Gesellschaft für Urologie (DGU)
                        </a>
                        und der
                        <a
                            href="https://www.kontinenz-gesellschaft.de/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Deutschen Kontinenz Gesellschaft
                        </a>
                        vergibt die DGK ein Zertifikat für Interdisziplinäre
                        Kontinenz- und Beckenboden-Zentren.
                    </p>
                </TextContentElement>
            </ContentContainer>
        </Layout>
    );
};

export default Zertifizierung;
