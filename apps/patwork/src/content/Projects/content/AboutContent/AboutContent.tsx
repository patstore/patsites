import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./about-content.scss";
import AboutContentOne from "./components/AboutContentOne";
import Cooperation from "./components/Cooperation";
import { AnimateText } from "@/animations";
import { useScrollScroller } from "@/scroll/useScrollScroller";

gsap.registerPlugin(ScrollTrigger);

const AboutContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const h2Ref = useRef<HTMLDivElement>(null);
    const [triggerH2, setTriggerH2] = useState(false);
    const scroller = useScrollScroller();

    useGSAP(
        () => {
            if (!scroller) return;
            const triggers: ScrollTrigger[] = [];
            const refs = [
                {
                    el: h2Ref.current,
                    onEnter: () => setTriggerH2(true),
                    onLeaveBack: () => setTriggerH2(false)
                },
                {
                    el: document.getElementById("about-line"),
                    onEnter: () => setTriggerH2(true),
                    onLeaveBack: () => setTriggerH2(false)
                }
            ];

            refs.forEach(({ el, onEnter, onLeaveBack }) => {
                if (!el) return;
                triggers.push(
                    ScrollTrigger.create({
                        scroller,
                        trigger: el,
                        start: "top 80%",
                        onEnter,
                        onLeaveBack
                    })
                );
            });
            return () => triggers.forEach((trigger) => trigger.kill());
        },
        { scope: containerRef, dependencies: [scroller] }
    );

    return (
        <>
            <div
                id="about"
                ref={containerRef}
                className="column-block"
            >
                <div className="section-container">
                    <Cooperation />
                </div>
            </div>
        </>
    );
};

export default AboutContent;
