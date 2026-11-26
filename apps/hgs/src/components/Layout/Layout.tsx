import type { ReactNode } from "react";
import Footer from "../Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => (
	<div className={styles.page}>
		<main id="inhalt">{children}</main>
		<Footer />
	</div>
);

export default Layout;
