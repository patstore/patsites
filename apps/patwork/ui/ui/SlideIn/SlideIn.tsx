import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./slide_in.scss";
import type { SlideInProps } from "./types";

const SCROLL_KEYS = new Set([
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    " "
]);

const SCROLL_LOCK_CLASS = "slide-in-scroll-lock";

const SlideIn = ({ isOpen, setIsOpen, children, title }: SlideInProps) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const html = document.documentElement;
        const { body } = document;
        const scrollbarWidth = window.innerWidth - html.clientWidth;
        const previousBodyPaddingRight = body.style.paddingRight;

        html.classList.add(SCROLL_LOCK_CLASS);
        if (scrollbarWidth > 0) {
            body.style.paddingRight = `${scrollbarWidth}px`;
        }

        // Intercept in the capture phase on window — fires before Lenis's bubble-phase
        // listener. stopImmediatePropagation() prevents Lenis from ever seeing the event.
        // For events inside the panel we only stop propagation (no preventDefault) so
        // the panel's own overflow scroll still works natively.
        const isInsidePanel = (target: EventTarget | null) =>
            panelRef.current?.contains(target as Node) ?? false;

        const onWheel = (e: WheelEvent) => {
            if (isInsidePanel(e.target)) {
                e.stopImmediatePropagation();
            } else {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };

        const onTouch = (e: TouchEvent) => {
            if (isInsidePanel(e.target)) {
                e.stopImmediatePropagation();
            } else {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                return;
            }
            if (!isInsidePanel(e.target) && SCROLL_KEYS.has(e.key)) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };

        window.addEventListener("wheel", onWheel, {
            passive: false,
            capture: true
        });
        window.addEventListener("touchmove", onTouch, {
            passive: false,
            capture: true
        });
        window.addEventListener("keydown", onKey, { capture: true });

        return () => {
            html.classList.remove(SCROLL_LOCK_CLASS);
            body.style.paddingRight = previousBodyPaddingRight;

            window.removeEventListener("wheel", onWheel, { capture: true });
            window.removeEventListener("touchmove", onTouch, { capture: true });
            window.removeEventListener("keydown", onKey, { capture: true });
        };
    }, [isOpen, setIsOpen]);

    return createPortal(
        <>
            <div
                className={`slide-in-overlay${isOpen ? " is-open" : ""}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />
            <aside
                ref={panelRef}
                className={`slide-in${isOpen ? " is-open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                data-lenis-prevent
            >
                <div className="slide-in__header">
                    <h2 className="slide-in__title">{title}</h2>
                </div>
                <div
                    className="slide-in__body"
                    ref={bodyRef}
                >
                    {children}
                </div>
            </aside>
        </>,
        document.body
    );
};

export default SlideIn;
