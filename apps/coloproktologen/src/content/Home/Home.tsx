import React from "react";
import { Layout } from "@components";
import {
    Button,
    ContentContainer,
    Divider,
    FlexBox,
    HeadContent,
    SpecialistSearch,
    TextContentElement
} from "@ui";
import settings from "@settings";
import { buttonsContainer, contentBox } from "@styles";
import NewsContent from "./components/NewsContent";
import BcdContent from "./components/Bcd_Content";
import Grundkurs from "./components/Grundkurs";
import CongressReview from "./components/CongressReview";

const Home: React.FC = () => {
    return (
        <Layout showKongress>
            <HeadContent
                title="Berufsverband"
                subtitle="Coloproktologie Deutschland e.V."
                description="Vereinigung der End- und Dickdarm­spezialisten Deutschlands"
                image={"/images/roman_lacheev_alamy_2BE8869_xxl.jpg"}
                content={
                    <div >

                        <p>
                            Der BCD ist die Stimme der interdisziplinären End- und Dickdarmspezialisten in Deutschland. 
                            Die Fachbereiche umfassen Chirurgie, Gastroenterologie, Dermatologie, Allgemeinmedizin, Gynäkologie und Urologie.
                            Die Rahmenbedingungen und Perspektiven unserer Mitglieder zu stärken und zu sichern, ist unser Auftrag.
                        </p>
                        <FlexBox direction="column" gap={settings.sizes.small}>
                            <Button
                                text="Mitglied werden"
                                background={settings.colors.primary}
                                color={settings.colors.white}
                                size="medium"
                                internalLink="/mitgliedschaft"
                            />
                            <Button
                                text="Spezialistensuche"
                                background={settings.colors.secondary}
                                color={settings.colors.white}
                                size="medium"
                                internalLink="/spezialistensuche"
                            />
                        </FlexBox>
                    </div>
                }
                isInline
            />
            {/* <MediBanner isFixed={true} /> */}
            <ContentContainer largeBackground={settings.colors.white}>
                <BcdContent />
                <Divider />
                <FlexBox direction="row" gap={settings.sizes.large} changeToColumn>
                    <div css={[contentBox(), {backgroundColor: settings.colors.light}]}>
                        <h3>Lernen Sie uns kennen</h3>
                        <p css={{ maxWidth: "480px !important" }}>
                            Erfahren Sie mehr über den Vorstant, Beirat und die Tätigkeiten des BCD und unsere Mitglieder.
                        </p>
                        <div css={buttonsContainer}>
                        <Button
                            text="Lernen Sie uns kennen"
                            background={settings.colors.primary}
                            color={settings.colors.white}
                            size="medium"
                            internalLink="/bcd"
                        />
                        </div>
                    </div>
                    <div css={[contentBox(), {backgroundColor: settings.colors.light}]}>
                        <h3>Mitglied werden beim BCD</h3>
                        <p css={{ maxWidth: "480px !important" }}>
                            Erfahren Sie mehr über die Vorteile einer Mitgliedschaft beim BCD.
                        </p>
                        <div css={buttonsContainer}>
                            <Button
                                text="Mitglied werden"
                                background={settings.colors.secondary}
                                color={settings.colors.white}
                                size="medium"
                                internalLink="/mitgliedschaft"
                            />
                        </div>
                    </div>
                </FlexBox>
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <CongressReview />

            </ContentContainer>
            <SpecialistSearch />
            {/* <OpenAccess /> */}
            <ContentContainer largeBackground={settings.colors.light}>
                <TextContentElement
                    title="Die Proktologie entdecken"
                    topline="Medizinische Kompetenz"
                >
                    <div>
                        <p>
                            Als interdisziplinäres Fachgebiet vereint die Proktologie die
                            Expertise aus verschiedenen Disziplinen wie der{" "}
                            <strong>Chirurgie</strong>, <strong>Dermatologie</strong> und{" "}
                            <strong>Gastroenterologie</strong>. Diese enge Zusammenarbeit
                            schafft innovative Ansätze für Diagnostik und Therapie, die den
                            individuellen Bedürfnissen der Patienten gerecht werden.
                        </p>
                        <p>
                            Wachsende Anforderungen im Zuge von Innovation und Wandel prägen
                            ihre Bedeutung als zukunftorienteres Systemfach.
                        </p>
                        <Divider />
                        <div css={buttonsContainer}>
                            <Button
                                text="Für Ärzte"
                                background={settings.colors.primary}
                                color={settings.colors.white}
                                size="large"
                                internalLink="/aerzte"
                            />
                        </div>
                    </div>
                </TextContentElement>
            </ContentContainer>
            <Grundkurs />

            {/* <BSD /> */}
            {/* <Education /> */}
            <NewsContent />
        </Layout>
    );
};

export default Home;
