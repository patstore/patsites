import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "usehooks-ts";
import type { ReactNode } from "react";
import { AnimateContent, AnimateText } from "@/animations";
import { useScrollScroller } from "@/scroll/useScrollScroller";

gsap.registerPlugin(ScrollTrigger);

type StepSectionProps = {
    number: string;
    headlines: string[];
    children: ReactNode;
};

const StepSection = ({ number, headlines, children }: StepSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 840px)");
    const scroller = useScrollScroller();

    useGSAP(
        () => {
            if (isMobile || !scroller) return;

            const section = sectionRef.current;
            const viewport = viewportRef.current;
            const track = trackRef.current;
            if (!section || !viewport || !track) return;

            const getScrollDistance = () =>
                Math.max(0, track.scrollWidth - viewport.clientWidth);

            const tween = gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: "none",
                scrollTrigger: {
                    scroller,
                    trigger: section,
                    pin: true,
                    pinSpacing: true,
                    start: "top 60px",
                    end: () => `+=${getScrollDistance()}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
                gsap.set(track, { x: 0 });
            };
        },
        { scope: sectionRef, dependencies: [isMobile, scroller] }
    );

    return (
        <div
            ref={sectionRef}
            className="step-section"
        >
            <div className="step-section-inner section-container line-grid">
                <div className="step-section-header section-container-element row gap-large justify-start align-start w-100">
                    <div className="chapter-number">
                        <div>{number}</div>
                    </div>
                    <div>
                        <h2>{headlines.join(" ")}</h2>
                    </div>
                </div>
                <div
                    ref={viewportRef}
                    className="step-section-viewport"
                >
                    <div
                        ref={trackRef}
                        className="step-section-track"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepSection;
