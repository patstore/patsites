import settings from "@settings";
import React from "react";
import { openAccessTextContainer } from "../styles";

const OpenAccess: React.FC = () => {
    return (
        <div
            css={{
                width: "100%",
                height: "400px",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <div
                css={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 1
                }}
            />
            <img
                src={"/open_access.png"}
                alt="Open Access"
                height={"100%"}
                style={{
                    objectPosition: "50% 50%",
                    objectFit: "cover",
                    width: "100%",
                    minHeight: "400px"
                }}
            />

            <div css={openAccessTextContainer}>
                <h2 css={{ color: `${settings.colors.white} !important` }}>
                    Open Access
                </h2>
                <h2 css={{ color: `${settings.colors.secondary} !important` }}>
                    Freier Download
                </h2>
            </div>
        </div>
    );
};

export default OpenAccess;
