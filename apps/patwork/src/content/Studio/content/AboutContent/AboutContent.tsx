import imageUrl from "./images/redde_bw.jpg";
import "./about.scss";

const AboutContent = () => {
    return (
        <section className="section-container studio-process padding-top-large padding-bottom-large">
            <div className="section-container-element align-start justify-start w-100 padding-bottom-large">
                <div className="w-33">
                    <h2 className="chapter-number">03 Über mich</h2>
                </div>
                <div className="section-container-element column align-start gap-large w-66">
                    <p className="large">
                        Ich bin Front-End-Entwickler mit über 8 Jahren Erfahrung
                        im Bereich Webdesign und -entwicklung.
                    </p>
                    <div className="section-container-element row align-start gap-large">
                        <p>
                            Seit ich mir das Ziel gesetzt habe digitale Inhalte
                            zu erschaffen, war ich auf der Suche nach der Brücke
                            zwischen visueller Ästhetik und technischer
                            Funktionalität. Alle meine Projekte verfolgen daher
                            das Ziel, die Kluft zwischen Bedienbarkeit,
                            Kundenzufriedenheit und die Komplexität der modernen
                            digitalen Welt zu schließen.
                        </p>

                        <div className="portrait-container w-50">
                            <div className="portrait-image-container">
                                <img
                                    src={imageUrl}
                                    alt="Portrait"
                                    css={{
                                        display: "block",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        maxWidth: "420px"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutContent;
