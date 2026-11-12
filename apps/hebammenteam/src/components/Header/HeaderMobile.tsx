import { useEffect, useId, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useOptionalScroll } from "@repo/core";
import { legalNav, mainNav } from "./constants/navigation";
import styles from "./HeaderMobile.module.css";

const HeaderMobile = () => {
  const menuId = useId();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const scroll = useOptionalScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const viewport = scroll?.getViewport() ?? null;
    if (viewport) {
      viewport.dataset.scrollLocked = "true";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      if (viewport) {
        delete viewport.dataset.scrollLocked;
      }
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, scroll]);

  return (
    <div className={styles.bar}>
      <Link to="/" className={styles.brandBar}>
        <span className={styles.eyebrow}>Praxis</span>
        <span className={styles.brandName}>Hebammen-Team</span>
      </Link>
      <img
        className={styles.logo}
        src="/logo_coming_home.webp"
        alt="Coming Home"
        width={40}
        height={40}
      />
      <button
        type="button"
        className={menuOpen ? `${styles.burger} ${styles.open}` : styles.burger}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      {menuOpen ? (
        <div
          className={styles.panel}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          data-lenis-prevent
        >
          <Link to="/" className={styles.brand}>
            <span className={styles.eyebrow}>Praxis</span>
            <span className={styles.brandName}>Hebammen-Team</span>
          </Link>
          <nav aria-label="Mobil">
            <ul className={styles.menu}>
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={styles.link}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: `${styles.link} ${styles.active}` }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.legal}>
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderMobile;
