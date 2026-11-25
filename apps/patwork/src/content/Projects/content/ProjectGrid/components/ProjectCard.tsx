import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFindData } from "@data";
import type { ImageClass } from "@data";
import type { FC } from "react";
import type { ProjectCardProps } from "../types";
import { useScrollScroller } from "@/scroll/useScrollScroller";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_SHIFT = 8;

const ProjectCard: FC<ProjectCardProps> = ({ project, parallax = false }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const scroller = useScrollScroller();
    const { findByObjectId } = useFindData();
    const image = project
        ? findByObjectId<ImageClass & { filePath?: string }>(
              project.image || ""
          )
        : null;

    useGSAP(
        () => {
            if (!parallax || !scroller) return;

            const card = cardRef.current;
            const img = card?.querySelector("img");
            if (!card || !img) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }

            const refresh = () => ScrollTrigger.refresh();
            if (img instanceof HTMLImageElement && !img.complete) {
                img.addEventListener("load", refresh);
                img.addEventListener("error", refresh);
            }

            const tween = gsap.fromTo(
                img,
                { yPercent: -PARALLAX_SHIFT, scale: 1.25 },
                {
                    yPercent: PARALLAX_SHIFT,
                    scale: 1.25,
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        scroller,
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.4
                    }
                }
            );

            return () => {
                if (img instanceof HTMLImageElement) {
                    img.removeEventListener("load", refresh);
                    img.removeEventListener("error", refresh);
                }
                tween.scrollTrigger?.kill();
                tween.kill();
                gsap.set(img, { clearProps: "transform" });
            };
        },
        { scope: cardRef, dependencies: [parallax, image?.filePath, scroller] }
    );

    if (!project) return null;

    return (
        <div
            ref={cardRef}
            className={`project-grid-card${parallax ? " project-grid-card--parallax" : ""}`}
        >
            <img
                src={`/data/files/${image?.filePath}`}
                alt={project.title as string}
                width={1000}
            />
        </div>
    );
};

export default ProjectCard;
