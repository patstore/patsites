import { useRef, useState } from "react";
import NavigationContent from "./components/NavigationContent";
import "./navigation.scss";

const Navigation = () => {
    const [visible] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const hasBeenVisible = useRef(false);

    const stateClass = visible
        ? "navigation--visible"
        : hasBeenVisible.current
          ? "navigation--hidden"
          : "navigation--initial";

    const burgerClass = `head-navigation-burger${mobileOpen ? " head-navigation-burger--open" : ""}`;

    return (
        <>
            <nav className={`navigation ${stateClass}`}>
                <NavigationContent
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />
            </nav>
            <div
                className={`navigation navigation--blend ${stateClass}`}
                aria-hidden="true"
            >
                <div className="head-navigation-content">
                    <div className="head-navigation-content-patwork">
                        <span className="head-navigation-content-patwork-spacer" />
                        <span>patwork</span>
                    </div>
                    <div className="head-navigation-content-links">
                        <span className="head-navigation-link">Studio</span>
                        <span className="head-navigation-link">Projekte</span>
                        <span className="head-navigation-link">Preise</span>
                        <span className="head-navigation-link">Kontakt</span>
                    </div>
                    <div className="head-navigation-content-right">
                        <div className={burgerClass}>
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
