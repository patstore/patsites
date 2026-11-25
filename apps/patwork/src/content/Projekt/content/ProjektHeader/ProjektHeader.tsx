import letter_p from "./letter_p.svg";
import type { FC } from "react";
import type { ProjektHeaderProps } from "../../types";
import "./projekt_header.scss";

const ProjektHeader: FC<ProjektHeaderProps> = ({ title }) => {
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
                    <h1 className="projekt-title">{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default ProjektHeader;
