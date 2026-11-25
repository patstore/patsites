import letter_s from "./letter_s.svg";

const ProjectsHeadContent = () => {
    return (
        <div
            className="head-container dark"
            style={{ position: "relative" }}
        >
            <div className="head-content-container justify-between">
                <div className="w-33 mobile-hidden">
                    <img
                        height={60}
                        src={letter_s}
                        alt="letter_s"
                    />
                </div>
                <div className="w-66">
                    <h1>Studio</h1>
                </div>
            </div>
        </div>
    );
};

export default ProjectsHeadContent;
