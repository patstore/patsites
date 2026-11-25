import { Link } from "@tanstack/react-router";
import { AnimateContent, AnimateText } from "@/animations";
import "./contact_content.css";

const ContactContent = () => {
    return (
        <div
            id="contact"
            className="section-container padding-top-medium align-start padding-bottom-medium"
        >
            <div className=" w-100 section-container-element flex gap-medium column padding-top-medium align-start">
                <div className="w-66">
                    <h2>
                        <AnimateText
                            viewport={0.0}
                            delay={0.1}
                        >
                            Bereit für ein Projekt?
                        </AnimateText>
                    </h2>
                </div>
                <AnimateContent
                    viewport={0.1}
                    delay={0.3}
                    className="w-100 padding-bottom-small"
                >
                    <Link
                        to="/kontakt"
                        className="contact-content-link-container"
                    >
                        <span className="contact-content-link-text">
                            Zum <br /> Kontakt
                        </span>
                        <img
                            src="/images/arrow.webp"
                            alt="Arrow Down Right"
                            height={120}
                            className="contact-content-link-image"
                        />
                    </Link>
                    <div className="divider large" />
                </AnimateContent>
            </div>
        </div>
    );
};

export default ContactContent;
