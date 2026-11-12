import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useOptionalScroll } from "@repo/core";
import { mainNav } from "./constants/navigation";
import styles from "./Header.module.css";

const SCROLL_THRESHOLD = 100;

const Header = () => {
  const scroll = useOptionalScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!scroll) {
      return;
    }

    const handleScroll = () => {
      setHasScrolled(scroll.getSnapshot().scroll > SCROLL_THRESHOLD);
    };

    handleScroll();
    return scroll.subscribe(handleScroll);
  }, [scroll]);

  console.log(hasScrolled);

  return (
    <header className={styles.bar} data-scrolled={hasScrolled || undefined}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
        <img
          className={styles.logo}
          src="/logo_coming_home.webp"
          alt="Coming Home"
          width={40}
          height={40}
        />
          <span className={styles.name}>Coming Home</span>
        </Link>
        <nav aria-label="Hauptnavigation">
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
      </div>
    </header>
  );
};

export default Header;
