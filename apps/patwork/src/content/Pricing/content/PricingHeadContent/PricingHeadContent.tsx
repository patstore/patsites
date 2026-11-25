import letter_p from "./letter_p.svg";

const PricingHeadContent = () => {
    return (
        <div
            className="head-container dark"
            style={{ position: "relative" }}
        >
            <div className="head-content-container justify-between">
                <div className="w-33 mobile-hidden">
                    <img
                        height={60}
                        src={letter_p}
                        alt="P"
                    />
                </div>
                <div className="w-66">
                    <h1>Preise</h1>
                </div>
            </div>
        </div>
    );
};

export default PricingHeadContent;
