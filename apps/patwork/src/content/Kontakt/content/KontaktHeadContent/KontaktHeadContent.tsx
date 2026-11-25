import letter_k from "./letter_k.svg";

const KontaktHeadContent = () => {
    return (
        <div
            className="head-container"
            style={{ position: "relative" }}
        >
            <div className="head-content-container align-end justify-between">
                <div className="w-33 mobile-hidden">
                    <img
                        height={60}
                        src={letter_k}
                        alt="letter_k"
                    />
                </div>
                <div className="w-66">
                    <h1>Kontakt</h1>
                </div>
            </div>
        </div>
    );
};

export default KontaktHeadContent;
