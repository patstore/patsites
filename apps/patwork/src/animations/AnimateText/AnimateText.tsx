import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import {
    resolveTrigger,
    useViewportTrigger
} from "../hooks/useViewportTrigger";
import type { ElementType, ReactNode } from "react";

type AnimateTextType = "row" | "chars";

interface AnimateTextProps {
    children: ReactNode;
    /** Animation style: slide up as full row(s) or stagger individual chars */
    type?: AnimateTextType;
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
    as?: ElementType;
    delay?: number;
    duration?: number;
    ease?: string;
    stagger?: number;
    className?: string;
    style?: React.CSSProperties;
}

const AnimateText = ({
    children,
    type = "row",
    trigger,
    viewport,
    as: Tag = "div",
    delay = 0,
    duration = 0.8,
    ease = "power3.out",
    stagger = 0.03,
    className,
    style
}: AnimateTextProps) => {
    const ref = useRef<HTMLElement>(null);
    const splitRef = useRef<SplitType | null>(null);
    const hasAnimated = useRef(false);
    const viewportReached = useViewportTrigger(ref, viewport);
    const resolvedTrigger = resolveTrigger(trigger, viewport, viewportReached);

    // Split text and set initial hidden state on mount / type change
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        splitRef.current?.revert();

        if (type === "chars") {
            const split = new SplitType(el, { types: "chars" });
            splitRef.current = split;
            gsap.set(split.chars, { y: 30, opacity: 0 });
        } else {
            const split = new SplitType(el, { types: "lines" });
            splitRef.current = split;

            split.lines?.forEach((line) => {
                const mask = document.createElement("span");
                mask.style.cssText = "display:block;overflow:hidden;";
                line.parentNode?.insertBefore(mask, line);
                mask.appendChild(line);
            });

            gsap.set(split.lines, { y: "100%", opacity: 0 });
        }

        return () => {
            splitRef.current?.revert();
        };
    }, [type]);

    // Play animation — fires on mount when no trigger is given, or whenever trigger flips to true/false
    useEffect(() => {
        const split = splitRef.current;
        if (!split) return;

        if (resolvedTrigger !== undefined && !resolvedTrigger) {
            if (hasAnimated.current) {
                if (type === "chars") {
                    gsap.to(split.chars, {
                        y: 30,
                        opacity: 0,
                        duration,
                        ease,
                        stagger,
                        delay
                    });
                } else {
                    gsap.to(split.lines, {
                        y: "100%",
                        opacity: 0,
                        duration,
                        ease,
                        stagger,
                        delay
                    });
                }
                hasAnimated.current = false;
            }
            return;
        }

        if (type === "chars") {
            gsap.to(split.chars, {
                y: 0,
                opacity: 1,
                duration,
                ease,
                stagger,
                delay
            });
        } else {
            gsap.to(split.lines, {
                y: "0%",
                opacity: 1,
                duration,
                ease,
                stagger,
                delay
            });
        }
        hasAnimated.current = true;
    }, [resolvedTrigger, type, delay, duration, ease, stagger]);

    return (
        <Tag
            ref={ref}
            className={className}
            style={style}
        >
            {children}
        </Tag>
    );
};

export default AnimateText;
