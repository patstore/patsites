import React from "react";
import { Layout } from "@components";
import { useFindNews, useGetPerson } from "@provider";
import {
    Button,
    ContentContainer,
    Divider,
    FlexBox,
    HeadContent,
    Person
} from "@ui";
import settings from "@settings";
import Report from "./components/Report";
import { topline } from "../../styles/styles";
import { ArticleClass } from "@data";

const Hospitationen: React.FC = () => {
    const { news: hospitationsArticles } = useFindNews({
        category: "vfgLWYtZGW"
    });
    const { news: praeKongressArticles } = useFindNews({
        category: "aP7gPudhLJ"
    });
    const { news: drittlaenderArticles } = useFindNews({
        category: "fTlpOvAcjG"
    });
    const { news: espcArticles } = useFindNews({
        category: "7YhCZBw7MY"
    });
    const { news: travelArticles } = useFindNews({ category: "gVS25Yggzf" });
    const { findPerson } = useGetPerson();
    const ansprechpartner = findPerson("5hGFkZk9RW");

    const sortArticlesByDate = (articles: ArticleClass[]) => {
        return articles.sort((a: ArticleClass, b: ArticleClass) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate.getTime() - aDate.getTime();
        });
    };

    return (
        <Layout>
            <HeadContent
                title="Hospitationen"
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
                        <h3>Hospitationsperspektiven der Koloproktologie</h3>
                        <p>
                            Hospitation soll anregen, Einblicke geben, Ihren
                            Blick schärfen, Kompetenzen verbessern und neue
                            Ideen für Ihre eigene Entwicklung liefern. Sie soll
                            anregen zu reflektieren und bietet - bspw. nach
                            einer Elternzeit - eine gute Voraussetzung für einen
                            Wiedereinstieg.
                        </p>
                        <p>
                            Die DGK bietet eine Reihe an Fort- und
                            Weiterbildungsmöglichkeiten an, insbesondere
                        </p>
                        <ul>
                            <li>Den Koloproktologischen Grundkurs</li>
                            <li>
                                Den EBSQ Kurs als Vorbereitung auf die
                                Europäische Facharztprüfung.
                            </li>
                        </ul>
                        <p>
                            Beide Kurse sind zur Vorbereitung auf die
                            Zusatzbezeichnung Proktologie hilfreich und werden
                            u.a. über das Prä-Kongress-Stipendium vergeben.
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
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <h2 id="hospitationsstipendium-title">
                        Hospitationsstipendium
                    </h2>
                    <p>
                        Das Stipendium sieht vor, dass sich approbierte
                        Ärzt*innen mit Interesse an der Koloproktologie
                    </p>
                    <ul>
                        <li>in Weiterbildung oder</li>
                        <li>
                            mit abgeschlossener Facharztausbildung für
                            Allgemeine Chirurgie, Kinderchirurgie,
                            Viszeralchirurgie, Haut- und Geschlechtskrankheiten,
                            Frauenheilkunde und Geburtshilfe, Allgemeinmedizin,
                            Innere Medizin, Gastroenterologie oder Urologie und
                            Interesse an der Koloproktologie
                        </li>
                    </ul>
                    <p>
                        in einem Kompetenz- oder Referenzzentrum für
                        Chirurgische Koloproktologie oder in Zentren
                        gleichwertiger Qualifikation in Österreich und der
                        Schweiz entsprechend deren Angebot in klinischer
                        Untersuchung, diagnostischer Abklärung, nicht operativer
                        aber vor allem operativer Therapie bei
                        koloproktologischen Erkrankungen fort- und weiterbildet
                    </p>
                    <p>
                        Für die Dauer von 2-4 Wochen werden bis zu 3.000 EUR für
                        Reisekosten, Unterkunft und Verpflegung zur Verfügung
                    </p>
                    <Divider />
                    <FlexBox
                        direction="row"
                        gap={settings.sizes.large}
                    >
                        <Button
                            size="large"
                            text="Kriterien"
                            externalLink="/documents/Vergaberichtlinien_Hospitationsstipendium_DGK.pdf"
                        />
                        <Button
                            size="large"
                            text="Zentren"
                            externalLink="/documents/Zentren_Hospitations-Stipendium_DGK.pdf"
                        />
                    </FlexBox>
                </div>
                <Divider />

                {sortArticlesByDate(hospitationsArticles).map((hospitation) => (
                    <Report
                        key={hospitation.objectId}
                        id={hospitation.objectId}
                        title={hospitation.title}
                        subtitle={hospitation.description}
                        text={hospitation.text}
                        background={settings.colors.white}
                        image={hospitation.image}
                    />
                ))}
            </ContentContainer>
            <ContentContainer>
                <div id="prae-kongress-stipendium-2027">
                    <h2>Prä-Kongress-Stipendium 2027</h2>
                    <div>
                        <p>
                            Im Vorfeld unserer Jahrestagung bieten wir Ärztinnen
                            und Ärzten in Weiterbildung oder mit abgeschlossener
                            Facharztausbildung für Allgemeine Chirurgie,
                            Kinderchirurgie, Viszeralchirurgie, Haut- und
                            Geschlechtskrankheiten, Frauenheilkunde und
                            Geburtshilfe, Allgemeinmedizin, Innere Medizin,
                            Gastroenterologie oder Urologie und Interesse an der
                            Koloproktologie ein Stipendium an, welches eine
                            dreitägige Hospitation beinhaltet.
                        </p>
                        <p>
                            Im Anschluss daran beinhaltet das Stipendium auch
                            den Besuch des Koloproktologenkongresses inklusive
                            Seminar (z.B. Koloproktologischer Grundkurs, Seminar
                            Junge Koloproktologie) in Höhe von insgesamt 1.500
                            EUR.
                        </p>
                        <p>
                            Mit diesem Betrag werden Reisekosten, Unterkunft,
                            Kurs- und Kongressbeiträge sowie Verpflegung
                            finanziert.
                            <br />
                            Bewerbungsfrist: 31.12.2026
                        </p>
                    </div>
                    <Divider />
                    <FlexBox
                        align="center"
                        justify="flex-start"
                        gap={settings.sizes.large}
                    >
                        <Button
                            size="large"
                            text="Kriterien"
                            externalLink="/documents/Vergaberichtlinien_Prae-Kongressstipendium_DGK.pdf"
                        />
                        <Button
                            size="large"
                            text="Zentren"
                            externalLink="/documents/Zentren_Prae-Kongress-Stipendium_DGK.pdf"
                        />
                    </FlexBox>
                    <Divider />
                    <div>
                        <h3>Hospitationsberichte</h3>
                        <FlexBox
                            direction="column"
                            gap={settings.sizes.large}
                        >
                            {sortArticlesByDate(praeKongressArticles).map(
                                (stipendium) => (
                                    <Report
                                        key={stipendium.objectId}
                                        id={stipendium.objectId}
                                        title={stipendium.title}
                                        subtitle={stipendium.description}
                                        text={stipendium.text}
                                        background={settings.colors.light}
                                    />
                                )
                            )}
                        </FlexBox>
                    </div>
                </div>
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <h2>Stipendium für Kollegen aus Drittländern</h2>
                    <p>
                        Chirurginnen und Chirurgen mit Interesse an der
                        Vertiefung in der Koloproktologie bieten wir ein
                        Hospitationsstipendium in Deutschland, Österreich und
                        der Schweiz an. Diese Aus- und Fortbildungsmöglichkeit
                        soll vor allem auch den Ansprüchen eines
                        koloproktologischen Curriculums im Rahmen der Ausbildung
                        zum Europäischen Facharzt für Koloproktologie gerecht
                        werden. Bewerbungen aus ökonomisch schwachen Ländern
                        sind besonders willkommen.
                    </p>
                    <p>
                        Das Stipendium sieht vor, dass ein(e) Chirurg(in) in
                        Ausbildung oder mit abgeschlossener allgemein- bzw.
                        viszeralchirurgischer Facharztausbildung und Interesse
                        an der Koloproktologie in einem Kompetenz- oder
                        Referenzzentrum für Chirurgische Koloproktologie oder in
                        Zentren gleichwertiger Qualifikation in Österreich und
                        der Schweiz entsprechend deren Angebot in klinischer
                        Untersuchung, diagnostischer Abklärung, nicht operativer
                        aber vor allem operativer Therapie bei
                        koloproktologischen Erkrankungen sich intensiv fort- und
                        weiterbildet.
                    </p>
                    <p>
                        Die DGK stellt dafür Hospitationsstipendien für die
                        Dauer von 2 - 6 Wochen in Höhe von bis zu 3.000 EUR zur
                        Verfügung. Mit diesen Beiträgen werden ausschließlich
                        Reisekosten, Unterkunft und Verpflegung der Kandidaten
                        finanziert.
                    </p>
                    <Divider />
                    <FlexBox
                        align="center"
                        justify="flex-start"
                        gap={settings.sizes.large}
                    >
                        <Button
                            size="medium"
                            text="Kriterien"
                            externalLink="/documents/Vergaberichtlinien_Hospitationsstipendium_Drittlaender_DGK.pdf"
                        />
                        <Button
                            size="medium"
                            text="Zentren"
                            externalLink="/documents/DGK-Hospitation_Drittlaender.pdf"
                        />
                    </FlexBox>
                </div>
                <Divider />
                <div>
                    <h3>Hospitationsberichte</h3>
                    <FlexBox
                        direction="column"
                        gap={settings.sizes.large}
                    >
                        {sortArticlesByDate(drittlaenderArticles).map((dl) => (
                            <Report
                                key={dl.objectId}
                                id={dl.objectId}
                                title={dl.title}
                                subtitle={dl.description}
                                text={dl.text}
                                background={settings.colors.white}
                            />
                        ))}
                    </FlexBox>
                </div>
            </ContentContainer>
            <ContentContainer>
                <div>
                    <div css={topline}>Reisestipendium</div>
                    <h2>ESCP-Tagung 2027 - Palexpo - Schweiz</h2>
                    <p>
                        Wie bereits in den letzten Jahren möchte die DGK den
                        proktologischen Nachwuchs durch Unterstützung von
                        Forschungsreisen fördern. Für die Tagung der ESCP vom
                        22. – 24.09.2027, bieten wir für fünf
                        Assistentinnen/Assistenten einen Reisekostenzuschuss von
                        jeweils 1.000 EUR an. Voraussetzung ist die Ausbildung
                        mit dem Ziel Koloproktologie und das Verfassen eines
                        abschließenden Berichtes zur Veröffentlichung im
                        Verbandsorgan coloproctology.
                    </p>
                    <p>Bitte richten Sie Ihre Kurzbewerbung mit:</p>
                    <ul>
                        <li>
                            einem Anschreiben (Motivation: Warum bewerben Sie
                            sich? Ihre Qualifikation: Bisheriger Werdegang),
                        </li>
                        <li>einem tabellarischen Lebenslauf und</li>
                        <li>einem Bewerbungsfoto</li>
                    </ul>
                    <p>
                        an unser Sekretariat. Die Reise ist selbst zu
                        organisieren.
                    </p>
                    <p>
                        Weitere Informationen finden Sie auf der Internetseite
                        <a
                            href="https://www.escp.eu.com/conference-and-events/event-calendar/2263-escp-22nd-scientific-annual-meeting"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            www.escp.eu.com
                        </a>
                        .
                    </p>
                    <Divider />
                    <div>
                        <h3>Berichte</h3>
                        <FlexBox
                            direction="column"
                            gap={settings.sizes.large}
                        >
                            {sortArticlesByDate(espcArticles).map((tr) => (
                                <Report
                                    key={tr.objectId}
                                    id={tr.objectId}
                                    title={tr.title}
                                    subtitle={tr.description}
                                    text={tr.text}
                                    background={settings.colors.light}
                                    label={tr.label}
                                />
                            ))}
                        </FlexBox>
                    </div>
                </div>
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <h2>Reisestipendium der DGK und DGAV</h2>
                    <p>
                        Wie bereits in den letzten Jahren möchte die DGK den
                        proktologischen Nachwuchs durch Unterstützung mit
                        Reisestipendien fördern. Hier bieten wir jährlich –
                        gemeinsam mit der Deutschen Gesellschaft für Allgemein-
                        und Viszeralchirurgie DGAV – für zwei
                        Assistentinnen/Assistenten einen Reisekostenzuschuss von
                        jeweils 1.000 EUR an. Voraussetzung ist die Ausbildung
                        mit dem Ziel Koloproktologie und das Verfassen eines
                        abschließenden Berichtes zur Veröffentlichung im
                        Verbandsorgan coloproctology.
                    </p>
                    <p>Bitte richten Sie Ihre Kurzbewerbung mit:</p>
                    <ul>
                        <li>
                            einem Anschreiben (Motivation: Warum bewerben Sie
                            sich? Ihre Qualifikation: Bisheriger Werdegang),
                        </li>
                        <li>einem tabellarischen Lebenslauf und</li>
                        <li>einem Bewerbungsfoto</li>
                    </ul>
                    <p>
                        an unser <a href="/kontakt/">Sekretariat</a>
                        oder an das
                        <a
                            href="https://www.dgav.de/start/kontakt.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sekretariat der DGAV
                        </a>
                        . Die Reise ist selbst zu organisieren.
                    </p>
                    <Button
                        text="Kriterien"
                        externalLink="/documents/Vergaberichtlinien_für_ein_Reisestipendium_der_DGK_und_DGAV.pdf"
                        size="medium"
                    ></Button>
                    <Divider />
                    <div>
                        <h3>Berichte</h3>
                        <FlexBox
                            direction="column"
                            gap={settings.sizes.large}
                        >
                            {sortArticlesByDate(travelArticles).map((tr) => (
                                <Report
                                    key={tr.objectId}
                                    id={tr.objectId}
                                    title={tr.title}
                                    subtitle={tr.description}
                                    text={tr.text}
                                    background={settings.colors.white}
                                    label={tr.label}
                                />
                            ))}
                        </FlexBox>
                    </div>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Hospitationen;
