import { ReactNode } from "react";
import styles from "./Layout.module.css";
import Footer from "./components/Footer";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.shell}>
    <main className={styles.main} id="inhalt">
      <div className={styles.content}>{children}</div>
    </main>
    <Footer />
  </div>
);

export default Layout;
