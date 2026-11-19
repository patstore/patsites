import { legalNav } from "../../Header/constants/navigation";
import { Link } from "@tanstack/react-router";
import styles from "../Layout.module.css";

const Footer = () => {
	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.footer_bottom}>
					<div className={styles.footer_bottom_main}>Coming Home</div>
					<ul className={styles.footerLinks}>
						{legalNav.map((item) => (
							<li key={item.to}>
								<Link to={item.to}>{item.label}</Link>
							</li>
						))}
					</ul>
				</div>
			</footer>
		</>
	);
};

export default Footer;
