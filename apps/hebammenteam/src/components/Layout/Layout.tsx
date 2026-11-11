import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { legalNav } from "../Header/constants/navigation";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.shell}>
    <main className={styles.main} id="inhalt">
      <div className={styles.content}>{children}</div>
    </main>
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
  </div>
);

export default Layout;
