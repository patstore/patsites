import "./about-content.scss";
import Cooperation from "./components/Cooperation";

const AboutContent = () => {
    return (
        <>
            <div
                id="about"
                className="column-block"
            >
                <div className="section-container">
                    <Cooperation />
                </div>
            </div>
        </>
    );
};

export default AboutContent;
