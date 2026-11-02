import React from "react";
import { divider } from "./styles";
import settings from "@settings";

const Divider: React.FC<{ showLine?: boolean, size?: "small" | "medium" | "large" }> = ({ showLine = false, size = "medium" }) => {
    return (
        <div
            css={[
                divider[size],
                {
                    backgroundColor: showLine ? settings.colors.grey : "transparent"
                }
            ]}
        />
    );
};

export default Divider;
