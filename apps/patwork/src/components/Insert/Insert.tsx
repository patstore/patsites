import { useEffect, useRef, useState } from "react";
import { useOptionalScroll } from "@repo/core";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import "./insert.scss";

const SCROLL_THRESHOLD_TOP = 200;
const SCROLL_THRESHOLD_BOTTOM = 600;
const HIDDEN_PATHS = ["/kontakt", "/impressum", "/datenschutz"];

type InsertProps = {
    children?: ReactNode;
};

const Insert = ({ children }: InsertProps) => {
    const [scrollVisible, setScrollVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const hasBeenVisible = useRef(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const hiddenOnPage = HIDDEN_PATHS.includes(pathname);
    const scroll = useOptionalScroll();

    useEffect(() => {
        if (!scroll) return;
        const update = () => {
            const snapshot = scroll.getSnapshot();
            const shouldShow =
                snapshot.scroll >= SCROLL_THRESHOLD_TOP &&
                snapshot.progress <= 0.9;
            if (shouldShow) hasBeenVisible.current = true;
            setScrollVisible(shouldShow);
        };
        update();
        return scroll.subscribe(update);
    }, [scroll]);

    const visible = scrollVisible && !dismissed && !hiddenOnPage;

    const stateClass = visible
        ? "insert--visible"
        : hasBeenVisible.current
          ? "insert--hidden"
          : "insert--initial";

    return (
        <aside
            className={`insert ${stateClass}`}
            aria-hidden={!visible}
        >
            <div className="insert__content">
                <button
                    onClick={() => {
                        navigate({ to: "/kontakt" });
                    }}
                >
                    Starte Dein Projekt
                </button>
            </div>
        </aside>
    );
};

export default Insert;
