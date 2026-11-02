import { Layout } from "@components";
import settings from "@settings";
import { Button, ContentContainer, Divider, FlexBox, HeadContent } from "@ui";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { useSiteContext } from "@provider";
import { topline } from "@styles";
import Services from "./components/Services";

const Mitgliedschaft: React.FC = () => {
    const navigate = useNavigate();
    const { setApplicationOpen } = useSiteContext();
    return (
        <Layout>
            <HeadContent
                title="Mitglied werden"
                subtitle="Ob Ärztin oder Arzt, assoziiertes oder förderndes Mitglied; wir haben für alle eine passende Mitgliedschaft. Sie dient der Stärkung und Entwicklung unseres Fachbereichs, der Förderung von Wissenschaft und Forschung sowie der Weiterbildung und Erstellung/Aktualisierung von Leitlinien."
                image="/mitgliedschaft_header.jpg"
                isInline
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <div css={topline}>Mitgliedschaften der DGK</div>
                    <h2>Ordentliche Mitgliedschaft</h2>
                    <p>
                        Ordentliches Mitglied kann jede approbierte Ärztin oder
                        jeder approbierte Arzt werden. Der Mitgliedsbeitrag
                        beträgt 120,00 EUR/Jahr.
                    </p>
                </div>
                <FlexBox
                    direction="row"
                    align="center"
                    justify="flex-start"
                    hasFullWidth
                    gap={settings.sizes.large}
                    changeToColumn
                >
                    <Button
                        size="large"
                        text="Zum Mitgliedsantrag"
                        onClick={() => setApplicationOpen(true)}
                        color={settings.colors.white}
                        background={settings.colors.primary}
                    />
                    <Button
                        size="large"
                        text="Beitragsordnung"
                        onClick={() => navigate({ to: "/dgk/beitragsordnung" })}
                        color={settings.colors.white}
                        background={settings.colors.primary}
                    />
                    <Button
                        size="large"
                        text="Satzung"
                        onClick={() => navigate({ to: "/dgk/satzung" })}
                        color={settings.colors.white}
                        background={settings.colors.primary}
                    />
                </FlexBox>
            </ContentContainer>
            <ContentContainer>
                <Services />
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <div css={topline}>Mitgliedschaften der DGK</div>
                    <h2>Fördermitgliedschaft</h2>
                    <div>
                        <p>
                            Mitgliedschafte für natürliche und juristische
                            Personen.
                        </p>
                        <p>
                            Sie möchten die DGK und Ihre Ziele fördern und
                            unterstützen ? Dann freuen wir uns über Ihre
                            Förder-Mitgliedschaft. Die Höhe des
                            Mitgliedsbeitrages ist frei wählbar und erfolgt auf
                            Spendenbasis.
                        </p>
                    </div>
                    <Divider />
                    <FlexBox
                        direction="row"
                        gap={settings.sizes.large}
                    >
                        <Button
                            size="large"
                            text="Zum Mitgliedsantrag"
                            color={settings.colors.white}
                            background={settings.colors.primary}
                            externalLink="/documents/Aufnahmeantrag_Foerdermitgliedschaft.pdf"
                        />
                        <Button
                            size="large"
                            text="Satzung"
                            onClick={() => navigate({ to: "/dgk/satzung" })}
                            color={settings.colors.white}
                            background={settings.colors.primary}
                        />
                    </FlexBox>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Mitgliedschaft;
