import Portrait from "./Portrait";

const AboutContentOne = () => {
    return (
        <>
            <div className="section-container-element padding-bottom-large inner">
                <div className="flex-33">
                    <div className="topline">skills</div>
                    <p>HTML</p>
                    <p>CSS</p>
                    <p>Typescript</p>
                    <p>React</p>
                    <p>Next.js</p>
                </div>
                <div className="flex-66">
                    <div className="topline">über mich</div>
                    <div className="portrait-container">
                        <Portrait />
                    </div>
                    <p className="large">
                        Ich bin Front-End-Entwickler mit über 8 Jahren Erfahrung
                        im Bereich Webdesign und -entwicklung.
                    </p>
                    <p>
                        Seit ich mir das Ziel gesetzt habe digitale Inhalte zu
                        erschaffen, war ich auf der Suche nach der Brücke
                        zwischen visueller Ästhetik und technischer
                        Funktionalität. Alle meine Projekte verfolgen daher das
                        Ziel, die Kluft zwischen Bedienbarkeit,
                        Kundenzufriedenheit und die Komplexität der modernen
                        digitalen Welt zu schließen.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutContentOne;
