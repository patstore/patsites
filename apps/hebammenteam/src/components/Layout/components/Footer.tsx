import { legalNav } from "../../Header/constants/navigation";
import { Link } from "@tanstack/react-router";
import styles from "../Layout.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerName}>Hebammen-Team</p>
        <ul className={styles.footerLinks}>
          {legalNav.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer