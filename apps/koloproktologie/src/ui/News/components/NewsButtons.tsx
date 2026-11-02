import { FlexBox } from "@ui";
import React, { useCallback, useMemo } from "react";
import { NewsButtonsProps } from "../types";
import { newsButton } from "../styles";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import settings from "@settings";

const NewsButtons: React.FC<NewsButtonsProps> = ({ counter, setCounter }) => {
    const clickHandler = useCallback(
        (type: "left" | "right") => {
            if (type === "left") {
                setCounter(counter - 1);
            }
            if (type === "right") {
                setCounter(counter + 1);
            }
        },
        [counter, setCounter]
    );

    const buttonState = useMemo(() => {
        let disabled = [false, false];
        if (counter === 0) {
            disabled = [true, false];
        }
        if (counter === 4) {
            disabled = [false, true];
        }
        return disabled;
    }, [counter]);

    return (
        <FlexBox
            direction="row"
            align="center"
            justify="flex-end"
            gap={settings.sizes.medium}
        >
            <button
                onClick={() => clickHandler("left")}
                disabled={buttonState[0]}
                css={newsButton}
            >
                <LucideArrowLeft size={15} />
            </button>
            <button
                onClick={() => clickHandler("right")}
                disabled={buttonState[1]}
                css={newsButton}
            >
                <LucideArrowRight size={15} />
            </button>
        </FlexBox>
    );
};

export default NewsButtons;
