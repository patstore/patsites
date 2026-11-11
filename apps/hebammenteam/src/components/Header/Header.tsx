import { Link } from "@tanstack/react-router";
import { mainNav } from "./constants/navigation";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.bar}>
    <div className={styles.inner}>
      <Link to="/" className={styles.brand}>
        <span className={styles.eyebrow}>Praxis</span>
        <span className={styles.name}>Hebammen-Team</span>
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

export default Header;
