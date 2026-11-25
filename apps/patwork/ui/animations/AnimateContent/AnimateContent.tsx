import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
    resolveTrigger,
    useViewportTrigger
} from "../hooks/useViewportTrigger";
import type { ElementType, ReactNode } from "react";

interface AnimateContentProps {
    children: ReactNode;
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
    className?: string;
    style?: React.CSSProperties;
}

const AnimateContent = ({
    children,
    trigger,
    viewport,
    as: Tag = "div",
    delay = 0,
    duration = 0.6,
    ease = "power3.inOut",
    className,
    style
}: AnimateContentProps) => {
    const ref = useRef<HTMLElement>(null);
    const hasAnimated = useRef(false);
    const viewportReached = useViewportTrigger(ref, viewport);
    const resolvedTrigger = resolveTrigger(trigger, viewport, viewportReached);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.set(el, { opacity: 0 });

        return () => {
            gsap.killTweensOf(el);
            gsap.set(el, { clearProps: "opacity" });
        };
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (resolvedTrigger !== undefined && !resolvedTrigger) {
            if (hasAnimated.current) {
                gsap.to(el, {
                    opacity: 0,
                    duration,
                    ease,
                    delay
                });
                hasAnimated.current = false;
            }
            return;
        }

        gsap.to(el, {
            opacity: 1,
            duration,
            ease,
            delay
        });
        hasAnimated.current = true;
    }, [resolvedTrigger, delay, duration, ease]);

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

export default AnimateContent;
