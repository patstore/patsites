import "./offer_content.scss";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import SkillCards from "./content/SkillCards/SkillCards";
import { AnimateContent, AnimateText } from "@/animations";

const OfferContent = () => {
    const navigate = useNavigate();
    return (
        <div
            id="content"
            className="column-block"
        >
            <div className="section-container padding-bottom-large padding-top-large">
                <div className="w-100 section-container-element row align-start align-self-start justify-start">
                    <div className="w-33">
                        <AnimateContent
                            viewport={0}
                            delay={0.2}
                        >
                            <h2>01 Studio</h2>
                        </AnimateContent>
                    </div>
                    <div className="section-container-element column align-start align-self-end gap-large w-66 padding-bottom-small">
                        <AnimateContent
                            viewport={0}
                            delay={0.2}
                        >
                            <p className="large bold">
                                Patwork ist ein Design- und Entwicklungsstudio
                                mit Fokus auf eine kreative, moderne und
                                kundenindividuelle Gestaltung von Webseiten und
                                Webanwendungen.
                            </p>
                        </AnimateContent>
                        <div className="w-50 padding-top-small">
                            <AnimateContent
                                viewport={0}
                                delay={0.2}
                            >
                                <p>
                                    Wir entwickeln zugeschnittene Weblösungen
                                    für kleine bis mittlere Unternehmen,
                                    Organisationen oder Verbände. Dabei
                                    verbinden wir moderne Web-Technologien mit
                                    einzigartigen Designs mit dem Ziel, eine
                                    einzigartige Web-Präsenz als auch eine
                                    kundenspezifische digitale Prozesslandschaft
                                    zu erschaffen.
                                </p>
                            </AnimateContent>
                        </div>
                    </div>
                </div>

                <div className="section-container-element column align-start align-self-end gap-medium w-66 padding-bottom-medium">
                    <AnimateContent
                        viewport={0.2}
                        delay={0.2}
                        className="section-container-element w-100 align-self-center"
                    >
                        <button onClick={() => navigate({ to: "/studio" })}>
                            <span>Zum Studio</span>
                            <ArrowUpRight size={12} />
                        </button>
                    </AnimateContent>
                </div>
            </div>

            <div className="section-container padding-top-large column">
                <div className="section-container-element w-100 align-start align-self-start">
                    <div className="section-container-element w-33 sticky">
                        <AnimateContent viewport={0.1}>
                            <h2>02 Leistungen</h2>
                        </AnimateContent>
                    </div>
                    <div className="section-container-element w-66  align-self-end padding-bottom-medium">
                        <SkillCards />
                    </div>
                </div>
            </div>
            <div className="section-container align-start justify-start padding-top-large padding-bottom-large bg-lightgrey">
                <div className="section-container-element w-33  ">
                    <AnimateText
                        viewport={0.1}
                        delay={0.1}
                        key="leistungen-text-header"
                    >
                        <h2>03 Ansatz</h2>
                    </AnimateText>
                </div>
                <div className="section-container-element w-66 column gap-large align-start  align-self-end ">
                    <AnimateText
                        viewport={0.1}
                        delay={0.1}
                        key="leistungen-text-03"
                    >
                        <p className="large bold">
                            All unsere Leistungen streben nach der Schnittmenge
                            zwischen individuelle gestalteten Webseiten und
                            einer intuitiven Inhaltverwaltung
                        </p>
                    </AnimateText>
                    <AnimateText
                        viewport={0.1}
                        delay={0.1}
                        key="leistungen-text-01"
                    >
                        <p>
                            Im Kern unserer Arbeit steht die kontinuierliche
                            Suche nach dem Zusammenspiel von ästhetischer
                            Gestaltung, technischer Leistungsfähigkeit und
                            nutzerfreundlicher Bedienung.
                        </p>
                    </AnimateText>
                    <AnimateText
                        viewport={0.1}
                        delay={0.1}
                        key="leistungen-text-02"
                    >
                        <p>
                            Deswegen sind all unsere Webseiten mit einer eigens
                            entwicklten Inhaltsverwaltung verbunden, die sich
                            intuitiv bedienen und kundenindividuell anpassen
                            lässt.
                        </p>
                    </AnimateText>
                </div>
            </div>
        </div>
    );
};

export default OfferContent;
