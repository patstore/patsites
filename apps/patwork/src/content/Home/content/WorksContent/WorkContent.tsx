import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "usehooks-ts";
import { useFindData } from "@data";
import { ArrowUpRightIcon } from "lucide-react";
import "./works_content.scss";
import WorkMobile from "./components/WorkMobile";
import Work from "./components/Work";
import { whenPageTransitionIdle } from "@/components";
import { useScrollScroller } from "@/scroll/useScrollScroller";
import { AnimateContent, AnimateText } from "@/animations";

gsap.registerPlugin(ScrollTrigger);

const WorkContent = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 840px)");
    const navigate = useNavigate();
    const scroller = useScrollScroller();

    const { findByClassName } = useFindData();
    const projects = findByClassName("articles").filter((project) =>
        project.categories?.includes("gqVk59EGuh")
    );

    useGSAP(
        () => {
            if (isMobile || !scroller) return;

            const section = sectionRef.current;
            const viewport = viewportRef.current;
            const track = trackRef.current;
            if (!section || !viewport || !track) return;

            let tween: gsap.core.Tween | null = null;
            let cancelled = false;
            const images = Array.from(track.querySelectorAll("img"));
            const page = section.closest(".page-transition");

            const refresh = () => ScrollTrigger.refresh();

            const createTween = () => {
                if (cancelled || tween) return;

                const getScrollDistance = () =>
                    Math.max(0, track.scrollWidth - viewport.clientWidth);

                const getScrollRange = () =>
                    (section.offsetHeight + window.innerHeight) * 2;

                gsap.set(track, { x: 0 });

                tween = gsap.to(track, {
                    x: () => -getScrollDistance(),
                    ease: "none",
                    scrollTrigger: {
                        scroller,
                        trigger: viewport,
                        start: "top 120%",
                        end: () => `+=${getScrollRange()}`,
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });

                ScrollTrigger.refresh();
            };

            images.forEach((img) => {
                if (!img.complete) {
                    img.addEventListener("load", refresh);
                    img.addEventListener("error", refresh);
                }
            });

            const stopWaiting = whenPageTransitionIdle(page, createTween);

            return () => {
                cancelled = true;
                stopWaiting();
                images.forEach((img) => {
                    img.removeEventListener("load", refresh);
                    img.removeEventListener("error", refresh);
                });
                tween?.scrollTrigger?.kill();
                tween?.kill();
                gsap.set(track, { x: 0 });
            };
        },
        { scope: sectionRef, dependencies: [isMobile, projects.length, scroller] }
    );

    if (projects.length === 0) return null;

    return (
        <div
            id="work"
            ref={sectionRef}
            className="works-section"
        >
            <div className="works-section-inner section-container padding-bottom-large">
                <div className="section-container-element padding-bottom-medium flex row align-start justify-between w-100">
                    <div className="w-33">
                        <AnimateContent viewport={0}>
                            <h2>04 Projekte</h2>
                        </AnimateContent>
                    </div>
                    <div className="w-33 flex align-end">
                        <button onClick={() => navigate({ to: "/projekte" })}>
                            <span>Zu allen Projekten</span>
                            <ArrowUpRightIcon size={12} />
                        </button>
                    </div>
                </div>

                {isMobile ? (
                    <div className="works-mobile-layout">
                        {projects.map((work, index) => (
                            <WorkMobile
                                key={work.objectId}
                                work={work}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        ref={viewportRef}
                        className="works-marquee-viewport"
                    >
                        <div
                            ref={trackRef}
                            className="works-marquee-track"
                        >
                            {projects.map((project, index) => (
                                <Work
                                    key={project.objectId}
                                    work={project}
                                    index={index}
                                    number={(index + 1)
                                        .toString()
                                        .padStart(2, "0")}
                                    length={projects.length
                                        .toString()
                                        .padStart(2, "0")}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="works-section-cta section-container-element align-self-end w-33"></div>
            </div>
        </div>
    );
};

export default WorkContent;
