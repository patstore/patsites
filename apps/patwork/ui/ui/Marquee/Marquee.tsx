import type { FC } from "react";
import "./marquee.scss";

interface MarqueeProps {
    items: string[];
}

const Marquee: FC<MarqueeProps> = ({ items }) => {
    const doubled = [...items, ...items];

    return (
        <div className="marquee">
            <div className="marquee__track">
                {doubled.map((item, index) => (
                    <span
                        key={index}
                        className="marquee__item"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
