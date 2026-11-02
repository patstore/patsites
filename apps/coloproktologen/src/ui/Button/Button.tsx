import { Link } from "@router";
import React, { useState } from "react";
import { buttonContainer } from "./styles";
import { ButtonProps } from "./types";
import settings from "@settings";
import { motion } from "motion/react";
import { shadeColor } from "@provider";
const Button: React.FC<ButtonProps> = ({
    text,
    color = settings.colors.white,
    background = settings.colors.primary,
    size = "medium",
    internalLink,
    externalLink,
    onClick,
    children,
    disabled = false,
    type = "button"
}) => {
    const [hover, setHover] = useState(false);
    if (internalLink) {
        return (
            <Link to={internalLink} 
            
                style={{ textDecoration: "none" }}
                css={{margin: "0 !important", marginBlockEnd: "0 !important" }}>
                <motion.button
                    css={buttonContainer({ color, background, size })}
                    animate={
                        hover
                            ? { backgroundColor: shadeColor(background, -5) }
                            : { backgroundColor: background }
                    }
                    disabled={disabled}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {text}
                    {children && children}
                </motion.button>
            </Link>
        );
    }

    if (externalLink) {
        return (
            <a
                href={externalLink}
                target="_blank"
                css={{
                    textDecoration: "none !important",
                    margin: "0 !important"
                }}
                rel="noreferrer"
            >
                <motion.button
                    css={buttonContainer({ color, background, size })}
                    animate={
                        hover
                            ? {
                                backgroundColor: shadeColor(background, -5)
                            }
                            : {
                                backgroundColor: background
                            }
                    }
                    disabled={disabled}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    type={type}
                >
                    {text}
                    {children && children}
                </motion.button>
            </a>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            css={buttonContainer({ color, background, size })}
            animate={
                hover
                    ? {
                        backgroundColor: shadeColor(background, -5)
                    }
                    : {
                        backgroundColor: background
                    }
            }
            disabled={disabled}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            type={type}
        >
            {text}
            {children && children}
        </motion.button>
    );
};

export default Button;
