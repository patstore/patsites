import { ChevronRightIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import styles from "./ContactElement.module.css";

const ContactElement = () => {
	return (
		<section>
			<div className="content">
				<div className="eyebrow" style={{ gridColumn: " 2 /span 1" }}>
					Kontakt
				</div>
				<h2 className="title" style={{ gridColumn: "span 3" }}>
					Habt ihr noch Fragen?
				</h2>
				<p className="lead center" style={{ gridColumn: "2 /span 1" }}>
					Finde deine Ansprechpartnerin auf der Kontaktseite.
				</p>
				<div
					className="separator medium"
					style={{ gridColumn: "2 /span 1" }}
				/>
				<div className={styles.button_container}>
					<Link to="/kontakt">
						<button className="inverted with-icon">
							Kontakt
							<span className="icon">
								<ChevronRightIcon />
							</span>
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ContactElement;
