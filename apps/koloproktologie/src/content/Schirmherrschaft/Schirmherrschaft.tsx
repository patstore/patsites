import { Layout } from "@components";
import settings from "@settings";
import {
    ContentContainer,
    Divider,
    HeadContent,
    TextContentElement
} from "@ui";
import React from "react";

const Schirmherrschaft: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Schirmherrschaft"
                subtitle="Beantragen Sie für Ihre wissenschaftlichen Veranstaltungen die Schirmherrschaft der DGK, die wir dadurch unterstützen und fördern wollen."
                // image="/schirmherrschaft_header.jpg"
                isInline
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <h2 css={{width: "100%", maxWidth: "100% !important"}}>
                        Ihre Veranstaltung unter der Schirmherrschaft der DGK
                    </h2>
                    <Divider />
                    <Divider />
                    <TextContentElement title="Schirmherrschaft und Logo der DGK">
                        <p>
                            Sie möchten die Schirmherrschaft der Deutschen
                            Gesellschaft für Koloproktologie e.V. für Ihre
                            Veranstaltung beantragen und das Logo der DGK für
                            Ihre Veranstaltungsankündigung im Internet oder
                            Ihren Veranstaltungsflyer einbinden?
                        </p>
                    </TextContentElement>
                    <TextContentElement title="Voraussetzungen">
                        <ol>
                            <li>
                                Der verantwortliche Veranstalter muss Mitglied
                                der DGK sein.
                            </li>
                            <li>
                                Die Veranstaltung muss eine klare
                                wissenschaftliche Zielsetzung haben.
                            </li>
                            <li>
                                Die Finanzierung der Veranstaltung (Einnahmen,
                                Kosten etc.) ist anzugeben.
                            </li>
                            <li>
                                Der Antrag ist an den Präsidenten oder den
                                Generalsekretär zu stellen.
                            </li>
                            <li>
                                Das fertige Programm wird zur Beurteilung
                                vorgelegt.
                            </li>
                            <li>
                                Der DGK ist eine Einflussnahme auf das Programm
                                einzuräumen.
                            </li>
                            <li>
                                Neben dem Logo ist die Kooperation mit der
                                Angabe &quot;unter Schirmherrschaft von&quot;
                                oder &quot;unterstützt von&quot; zu kennzeichen.
                            </li>
                        </ol>
                        <p>
                            Die Beurteilung und Entscheidung trifft der Vorstand
                        </p>
                    </TextContentElement>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Schirmherrschaft;
