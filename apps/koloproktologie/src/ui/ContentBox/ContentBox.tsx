import React, { useState } from "react";
import { contentBoxContainer, iconContainer } from "./styles";
import { Link, useNavigate } from "@tanstack/react-router";
import { ContentBoxProps } from "./types";
import Button from "../Button/Button";
import { motion } from "motion/react";
import { getUrlFromBytescale, useGetImages } from "@provider";
import settings from "@settings";
import { ArrowRight } from "lucide-react";
import { FlexBox } from "../FlexBox";
import { Label } from "../Label";
import { AppImage } from "../AppImage";

const ContentBox: React.FC<ContentBoxProps> = ({
    title,
    text,
    link,
    image,
    video,
    children,
    label = "",
    date = "",
    background = settings.colors.light,
    color = settings.colors.dark,
    buttonBackground = settings.colors.secondary,
    buttonText = "Download",
    onClick,
    icon,
    alignCenter = false,
    labelBackground = settings.colors.light
}) => {
    const [hover, setHover] = useState(false);
    const { findImageUrl } = useGetImages();
    const navigate = useNavigate();

    return (
        <motion.div
            css={[
                contentBoxContainer({ background }),
                { cursor: link || onClick ? "pointer" : "default" },
                { paddingTop: image ? "230px" : "24px", paddingBottom: "24px" }
            ]}
            animate={hover ? { scale: 1.03 } : { scale: 1 }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            transition={{ duration: 0.3 }}
            onClick={() => (link ? navigate({ to: link }) : onClick && onClick())}
        >
            {icon && <div css={iconContainer}>{icon}</div>}
            {image && (
                <AppImage
                    css={{
                        width: "100%",
                        height: "210px",
                        marginBottom: "30px",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0
                    }}
                    src={findImageUrl(image)}
                    alt={title}
                />
            )}
            {video && (
                <video
                    src={getUrlFromBytescale({ filePath: video })}
                    controls
                    width="100%"
                    height="100%"
                    css={{
                        paddingBottom: "24px"
                    }}
                />
            )}
            {(label || date) && (
                <FlexBox
                    direction="row"
                    justify="space-between"
                    align="center"
                    hasFullWidth
                >
                    <Label
                        text={label}
                        background={labelBackground}
                    ></Label>
                    <h5 css={{ color }}>{date}</h5>
                </FlexBox>
            )}
            <h4 css={{ color, textAlign: alignCenter ? "center" : "left" }}>
                {title}
            </h4>
            <p css={{ color, textAlign: alignCenter ? "center" : "left" }}>
                {text}
            </p>
            {children && children}
            <div css={{ marginTop: "12px" }}></div>
            <FlexBox
                direction="row"
                justify={alignCenter ? "center" : "flex-start"}
                align="center"
            >
                {link && (
                    <Link
                        to={link}
                        css={{ textDecoration: "none !important" }}
                    >
                        <Button
                            background={buttonBackground}
                            text={buttonText}
                        >
                            {<ArrowRight size={12} />}
                        </Button>
                    </Link>
                )}
                {onClick && (
                    <Button
                        background={buttonBackground}
                        text={buttonText}
                        onClick={onClick}
                    >
                        {<ArrowRight size={12} />}
                    </Button>
                )}
            </FlexBox>
        </motion.div>
    );
};

export default ContentBox;
