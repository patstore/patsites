import { Link } from "@tanstack/react-router";
import { AnimateText } from "@/animations";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-container-element">
                    <h3>
                        Weitere Fragen? Eine einfache Nachricht sorgt für
                        Klarheit.
                    </h3>
                </div>
                <div className="footer-container-element">
                    <div className="w-100 flex row align-center justify-start gap-medium">
                        <h4 style={{ margin: "0 !important" }}>E-Mail:</h4>
                        <div className="footer-links">
                            <a href="mailto:info@patwork.net">
                                info@patwork.net
                            </a>
                        </div>
                    </div>
                    <div className="w-100 flex row align-center justify-start gap-medium">
                        <h4 style={{ margin: "0 !important" }}>Telefon:</h4>
                        <div className="footer-links">
                            <a href="tel:+4915164716453">+49 151 64716453</a>
                        </div>
                    </div>
                </div>

                <div className="footer-container-element">
                    <h4>Links:</h4>
                    <div className="divider medium" />
                    <div className="footer-links">
                        <Link to="/">Home</Link>
                        <p>/</p>
                        <Link to="/studio">Studio</Link>
                        <p>/</p>
                        <Link to="/projekte">Projekte</Link>
                        <p>/</p>
                        <Link to="/preise">Preise</Link>
                        <p>/</p>
                        <Link to="/kontakt">Kontakt</Link>
                    </div>
                    <div className="footer-links">
                        <Link to="/impressum">Impressum</Link>
                        <p>/</p>
                        <Link to="/datenschutz">Datenschutz</Link>
                    </div>
                </div>
            </div>
            <div className="divider large" />
            <div className="footer-title">
                {" "}
                <AnimateText
                    delay={0.1}
                    duration={0.5}
                    ease="easeInOut"
                    stagger={0.1}
                    viewport={0}
                    type="chars"
                >
                    patwork
                </AnimateText>
            </div>
        </footer>
    );
};

export default Footer;
