import ScrollIndicator from "./components/ScrollIndicator";
import Title from "./components/Title";
import TitleCard from "./components/TitleCard";
import { Marquee } from "@/ui";

const HeadContent = () => {
    return (
        <div className="head-container large">
            {/* <div className="head-content-container large"> */}
            <div className="inner">
                <div className=" section-container-element w-100 column align-start justify-start">
                    <Title />
                    <TitleCard />
                </div>
            </div>
            <ScrollIndicator />
            <Marquee
                items={[
                    "Frontend Development",
                    "Backend Development",
                    "Webdesign",
                    "Content Management",
                    "SEO Optimization",
                    "UI / UX Design"
                ]}
            />
        </div>
    );
};

export default HeadContent;
