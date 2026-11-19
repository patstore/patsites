import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Layout } from "@components";
import { useCollection } from "@provider";
import styles from "./Team.module.css";
import { personSlug, sortPersons } from "./person";
import TeamRoster from "./roster/TeamRoster";

const Team = () => {
	const { items } = useCollection("Person");
	const hash = useLocation({ select: (location) => location.hash });
	const navigate = useNavigate();

	useEffect(() => {
		const id = hash.replace(/^#/, "");
		if (!id) {
			return;
		}
		const person = sortPersons(items).find(
			(item) => personSlug(item) === id || item.objectId === id
		);
		if (!person) {
			return;
		}
		void navigate({
			to: "/team/$slug",
			params: { slug: personSlug(person) },
			replace: true
		});
	}, [hash, items, navigate]);

	return (
		<Layout>
			<header className={styles.hero}>
				<div className={styles.intro}>
					<h1 className={styles.title} style={{ textAlign: "left" }}>
						Das sind wir.
						<img
							className={styles.flower}
							src="/logo_coming_home.webp"
							alt=""
							width={36}
							height={36}
						/>
					</h1>
					<p className="lead left">
						Die Hebammen, die Sie begleiten.
					</p>
				</div>
				<div className={styles.roster}>
					<TeamRoster empty />
				</div>
			</header>
		</Layout>
	);
};

export default Team;
