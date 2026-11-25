import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./content_box.scss";
import { AnimateContent, AnimateLine } from "@/animations";

const ContentBox = ({
    icon,
    title,
    description,
    image,
    children,
    number,
    onClick,
    headerRow = false,
    borderLeft = false,
    borderRight = false,
    borderTop = false,
    borderBottom = false,
    flex = "0 0 30cqw",
    delay = 0.2,
    isHorizontal = false,
    bg = undefined,
    paddingRight = 0
}: {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    image?: string;
    children?: React.ReactNode;
    number?: string;
    headerRow?: boolean;
    onClick?: () => void;
    borderLeft?: boolean;
    borderRight?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;
    flex?: string;
    delay?: number;
    isHorizontal?: boolean;
    bg?: "bg-lightgrey" | "bg-white";
    paddingRight?: number;
}) => {
    return (
        <AnimateContent
            viewport={0}
            delay={delay}
        >
            <div
                className={`content_box ${bg ?? ""}`}
                data-left={borderLeft}
                data-right={borderRight}
                data-top={borderTop}
                data-bottom={borderBottom}
                style={{
                    flex: flex,
                    paddingRight: paddingRight
                }}
            >
                <div
                    className="content_container"
                    data-row={headerRow}
                >
                    <div
                        className={`header ${isHorizontal ? "horizontal" : ""}`}
                        data-row={headerRow}
                    >
                        {icon && icon}
                        {number && <span className="number">{number}</span>}
                        <h3>{title}</h3>
                    </div>
                    <AnimateLine
                        length={100}
                        unit="%"
                        direction="left-to-right"
                        delay={delay + 0.3}
                        duration={0.7}
                        viewport={0}
                        thickness={"0.6px"}
                    />
                    <div
                        className={`content ${isHorizontal ? "horizontal" : ""}`}
                        data-row={headerRow}
                    >
                        {children}
                        <p>{description}</p>
                    </div>
                </div>
                <div className="image">
                    {image && (
                        <img
                            src={image}
                            alt={title}
                        />
                    )}
                </div>
                {onClick && (
                    <button
                        onClick={onClick}
                        className="border-top"
                    >
                        <span>Mehr erfahren</span>
                        <ArrowUpRight size={12} />
                    </button>
                )}
            </div>
        </AnimateContent>
    );
};

export default ContentBox;
