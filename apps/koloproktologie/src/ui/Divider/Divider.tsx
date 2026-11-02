import React from "react";
import { divider } from "./styles";
import settings from "@settings";

const Divider: React.FC<{ showLine?: boolean }> = ({ showLine = false }) => {
    return (
        <div
            css={[
                divider,
                {
                    backgroundColor: showLine
                        ? settings.colors.grey
                        : "transparent"
                }
            ]}
        />
    );
};

export default Divider;
