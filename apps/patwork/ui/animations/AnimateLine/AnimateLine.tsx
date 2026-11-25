import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "@/styles/scss/animations.scss";
import {
    resolveTrigger,
    useViewportTrigger
} from "../hooks/useViewportTrigger";

type AnimateLineDirection = "top-to-bottom" | "left-to-right" | "right-to-left";

interface AnimateLineProps {
    /** Pixel length of the line (height for vertical, width for horizontal) */
    length: number;
    thickness?: number | string;
    direction?: AnimateLineDirection;
    /**
     * Controls when the animation plays.
     * - Omit entirely → plays immediately on mount.
     * - Pass `false` → element starts hidden and waits.
     * - Pass `true`  → plays the animation (set to true to trigger).
     */
    trigger?: boolean;
    /**
     * Lenis-driven viewport progress at which the animation plays.
     * `0` = element just enters the viewport, `1` = element just leaves.
     * Omit to play on mount (or via `trigger`).
     */
    viewport?: number;
    delay?: number;
    duration?: number;
    ease?: string;
    className?: string;
    unit?: "px" | "%";
    id?: string;
}

const AnimateLine = ({
    length,
    thickness = 0.9,
    direction = "top-to-bottom",
    trigger,
    viewport,
    delay = 0,
    duration = 0.8,
    ease = "power3.out",
    className,
    unit = "px",
    id
}: AnimateLineProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);
    const viewportReached = useViewportTrigger(ref, viewport);
    const resolvedTrigger = resolveTrigger(trigger, viewport, viewportReached);
    const isVertical = direction === "top-to-bottom";

    const sizeStyle: React.CSSProperties = isVertical
        ? { height: `${length}${unit}`, width: `${thickness}` }
        : { width: `${length}${unit}`, height: `${thickness}` };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (isVertical) {
            gsap.set(el, { scaleY: 0, transformOrigin: "top center" });
        } else if (direction === "left-to-right") {
            gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
        } else {
            gsap.set(el, { scaleX: 0, transformOrigin: "right center" });
        }
    }, [direction, isVertical]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (resolvedTrigger !== undefined && !resolvedTrigger) {
            if (hasAnimated.current) {
                if (isVertical) {
                    gsap.to(el, {
                        scaleY: 0,
                        transformOrigin: "top center",
                        duration,
                        ease,
                        delay
                    });
                } else if (direction === "left-to-right") {
                    gsap.to(el, {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration,
                        ease,
                        delay
                    });
                } else {
                    gsap.to(el, {
                        scaleX: 0,
                        transformOrigin: "right center",
                        duration,
                        ease,
                        delay
                    });
                }
                hasAnimated.current = false;
            }
            return;
        }

        if (isVertical) {
            gsap.to(el, { scaleY: 1, duration, ease, delay });
        } else {
            gsap.to(el, { scaleX: 1, duration, ease, delay });
        }
        hasAnimated.current = true;
    }, [resolvedTrigger, direction, isVertical, delay, duration, ease]);

    return (
        <div
            id={id}
            ref={ref}
            className={`animate-line${className ? ` ${className}` : ""}`}
            style={sizeStyle}
        />
    );
};

export default AnimateLine;
