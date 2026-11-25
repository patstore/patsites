import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Phone } from "lucide-react";
import ContactForm from "./components/ContactForm";
import imageUrl from "./images/redde.jpg";
import { useScrollScroller } from "@/scroll/useScrollScroller";

const KontaktContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scroller = useScrollScroller();
    const [lineTrigger, setLineTrigger] = useState(false);

    useGSAP(
        () => {
            const head = document.getElementById("contact-head-container");
            if (!head || !scroller) return;
            const trigger = ScrollTrigger.create({
                scroller,
                trigger: head,
                start: "bottom 100%",
                end: "bottom 10%",
                onEnter: () => setLineTrigger(true),
                onLeaveBack: () => setLineTrigger(false)
            });
            return () => trigger.kill();
        },
        { scope: containerRef, dependencies: [scroller] }
    );

    return (
        <div
            id="contact"
            ref={containerRef}
            className="section-container padding-top-medium padding-bottom-medium"
        >
            <div
                id="contact-head-container"
                className="section-container-element row align-start"
            >
                <div className="w-33 padding-right-large">
                    <p className="large">
                        Schreibe deine Fragen, Ideen oder Vorstellungen.
                    </p>
                    <div className="divider large"></div>
                    <img
                        src={imageUrl}
                        alt="Portrait"
                        style={{
                            display: "block",
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            maxWidth: "420px"
                        }}
                    />
                    <p className="bold">Patrick Hanke</p>
                    <p>Inhaber & Entwickler</p>
                    <div className="divider large"></div>
                    <p>
                        <a href="tel:015164716453">
                            <Phone
                                size={12}
                                color="var(--color-dark)"
                                style={{ marginRight: "6px" }}
                            />
                            0151 64716453
                        </a>
                    </p>
                    <div className="divider medium"></div>
                    <p>
                        <a href="mailto:info@patwork.net">
                            <Mail
                                size={12}
                                color="var(--color-dark)"
                                style={{ marginRight: "6px" }}
                            />
                            info@patwork.net
                        </a>
                    </p>
                </div>
                <div className="w-66">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default KontaktContent;
