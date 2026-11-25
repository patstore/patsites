import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useOptionalScroll } from "@repo/core";

const ScrollIndicator = () => {
    const scroll = useOptionalScroll();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!scroll) return;
        const update = () => {
            setVisible(scroll.getSnapshot().scroll <= 0);
        };
        update();
        return scroll.subscribe(update);
    }, [scroll]);

    const scrollDown = () => {
        const current = scroll?.getSnapshot().scroll ?? 0;
        if (scroll) {
            scroll.scrollTo(current + window.innerHeight);
            return;
        }
        window.scrollTo({ top: current + window.innerHeight, behavior: "smooth" });
    };

    return (
        <div
            className="scroll-indicator"
            style={{
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none"
            }}
            onClick={scrollDown}
        >
            <div className="scroll-indicator-content">
                <p>Mehr erfahren</p>
            </div>
            <ArrowDown
                size={24}
                strokeWidth={1.5}
            />
        </div>
    );
};

export default ScrollIndicator;
