import { WebpageContentDivider } from "@types";
import React from "react";

export type DividerProps = {
    content: WebpageContentDivider;
};

const sizeMap: Record<WebpageContentDivider["divider"]["size"], number> = {
    small: 6,
    medium: 12,
    large: 18
};

const RenderDivider: React.FC<DividerProps> = ({ content }) => {
    return (
        <div
            style={{
                margin: `${sizeMap[content.divider.size]}px 0`,
                width: "100%"
            }}
        >
            {content.divider.showLine && (
                <hr
                    style={{
                        border: 0,
                        borderTop: "1px solid #333",
                        margin: 0,
                        backgroundColor: "transparent"
                    }}
                />
            )}
        </div>
    );
};

export default RenderDivider;
