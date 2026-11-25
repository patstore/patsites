import { SectionOne, SectionThree, SectionTwo } from "./components";
import "./steps_content.scss";

const StudioContent = () => {
    return (
        <section className="section-container studio-process padding-top-large padding-bottom-large bg-lightgrey">
            <div className="section-container-element align-start justify-start w-100 padding-bottom-large">
                <div className="w-33">
                    <h2 className="chapter-number">02 Prozess</h2>
                </div>
                <div className="w-66">
                    <p className="large">
                        Aus der Zielsetzung wird ein Ablauf. Webseite, Relaunch
                        oder Anwendung — jedes Projekt durchläuft dieselben drei
                        Schritte. Am Ende steht etwas, das du selbst
                        weiterführen kannst.
                    </p>
                </div>
            </div>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
        </section>
    );
};

export default StudioContent;
