import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";
import "../navigation.scss";

type NavigationContentProps = {
    inline?: boolean;
    mobileOpen?: boolean;
    setMobileOpen?: Dispatch<SetStateAction<boolean>>;
};

const NavigationContent = ({
    inline = false,
    mobileOpen: mobileOpenProp,
    setMobileOpen: setMobileOpenProp
}: NavigationContentProps) => {
    const [mobileOpenInternal, setMobileOpenInternal] = useState(false);
    const mobileOpen = mobileOpenProp ?? mobileOpenInternal;
    const setMobileOpen = setMobileOpenProp ?? setMobileOpenInternal;
    const navigate = useNavigate();

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            <div className={"head-navigation-content"}>
                <div
                    onClick={() => navigate({ to: "/" })}
                    className="head-navigation-content-patwork"
                >
                    <img
                        src="/images/logo_patwork.webp"
                        alt="patwork"
                        width={24}
                        height={24}
                    />
                    <span>patwork</span>
                </div>

                <div className="head-navigation-content-links">
                    <Link
                        className="head-navigation-link"
                        to="/studio"
                    >
                        Studio
                    </Link>
                    <Link
                        className="head-navigation-link"
                        to="/projekte"
                    >
                        Projekte
                    </Link>
                    <div
                        className="head-navigation-content-separator"
                        data-inline={inline}
                    ></div>
                    <div
                        className="head-navigation-content-separator"
                        data-inline={inline}
                    ></div>
                    <Link
                        className="head-navigation-link"
                        to="/preise"
                    >
                        Preise
                    </Link>
                    <div
                        className="head-navigation-content-separator"
                        data-inline={inline}
                    ></div>
                    <Link
                        className="head-navigation-link"
                        to="/kontakt"
                    >
                        Kontakt
                    </Link>
                    <div
                        className="head-navigation-content-separator"
                        data-inline={inline}
                    ></div>
                </div>

                <div className="head-navigation-content-right">
                    <button
                        className={`head-navigation-burger${mobileOpen ? " head-navigation-burger--open" : ""}`}
                        aria-label="Menü öffnen"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`head-navigation-mobile${mobileOpen ? " head-navigation-mobile--open" : ""}`}
                aria-hidden={!mobileOpen}
            >
                <nav className="head-navigation-mobile-links">
                    <Link
                        className="head-navigation-link-mobile"
                        to="/"
                        activeProps={{
                            className: "head-navigation-link-mobile--active"
                        }}
                        onClick={closeMobile}
                    >
                        Start
                    </Link>
                    <Link
                        className="head-navigation-link-mobile"
                        to="/studio"
                        activeProps={{
                            className: "head-navigation-link-mobile--active"
                        }}
                        onClick={closeMobile}
                    >
                        Studio
                    </Link>

                    <Link
                        className="head-navigation-link-mobile"
                        to="/projekte"
                        activeProps={{
                            className: "head-navigation-link-mobile--active"
                        }}
                        onClick={closeMobile}
                    >
                        Projekte
                    </Link>

                    <Link
                        className="head-navigation-link-mobile"
                        to="/preise"
                        activeProps={{
                            className: "head-navigation-link-mobile--active"
                        }}
                        onClick={closeMobile}
                    >
                        Preise
                    </Link>

                    <Link
                        className="head-navigation-link-mobile"
                        to="/kontakt"
                        activeProps={{
                            className: "head-navigation-link-mobile--active"
                        }}
                        onClick={closeMobile}
                    >
                        Kontakt
                    </Link>

                    <div className="head-navigation-mobile-links-bottom">
                        <a
                            href="/impressum"
                            onClick={closeMobile}
                        >
                            Impressum
                        </a>
                        <a
                            href="/datenschutz"
                            onClick={closeMobile}
                        >
                            Datenschutz
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default NavigationContent;
