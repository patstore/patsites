import manifest from "../constants/content_cards";
import Webdesign from "./Webdesign";
import { AnimateContent, AnimateText } from "@/animations";

const Slides = () => {
    return (
        <div className="manifest-slides">
            {manifest.map((item, index) => (
                <div
                    key={item.number}
                    className="manifest-container"
                    style={{
                        zIndex: index + 1,
                        ["--manifest-stack" as string]: index
                    }}
                >
                    <div className="manifest-header">
                        <div className="w-33">
                            <div className="manifest-number">{item.number}</div>
                        </div>
                        <div className="w-66">
                            <p className="bold">
                                <AnimateText
                                    viewport={0.1}
                                    delay={0.1}
                                >
                                    {item.headline}
                                </AnimateText>
                            </p>
                        </div>
                    </div>
                    <div className="manifest-content">
                        <div className="w-66 manifest-container-element">
                            {item.number === "01" && <Webdesign />}
                        </div>
                    </div>
                </div>
            ))}
            <div
                className="manifest-slides-end"
                aria-hidden="true"
            />
        </div>
    );
};

export default Slides;
