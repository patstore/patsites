import { useMemo, useState } from "react";
import { CmsBody, ContactModal, Layout } from "@components";
import type { PersonClass } from "@data";
import { useCollection } from "@provider";
import teamStyles from "../Team/Team.module.css";
import { displayName, initials, phoneHref, portraitSrc } from "../Team/person";
import TeamRoster from "../Team/roster/TeamRoster";

const Contact = () => {
	const { items: images } = useCollection("Image");
	const [person, setPerson] = useState<PersonClass | null>(null);
	const name = person ? displayName(person) : "";
	const portrait = useMemo(() => {
		if (!person) {
			return null;
		}
		const image = images.find((item) => item.objectId === person.image);
		return portraitSrc(image);
	}, [images, person]);
	const email = person?.email?.trim() || null;
	const phone = person?.data?.telefon?.trim() || null;
	const address = person?.data?.adresse?.trim() || null;
	const phoneLink = phone ? phoneHref(phone) : null;

	return (
		<Layout>
			<header className={teamStyles.hero}>
				<div className={teamStyles.intro}>
					<h1 className={teamStyles.title}>
						Kontakt
						<img
							className={teamStyles.flower}
							src="/logo_coming_home.webp"
							alt=""
							width={36}
							height={36}
						/>
					</h1>
					<p className="lead" style={{ textAlign: "left" }}>
						Schreiben Sie einer Hebamme. Wir melden uns, sobald wir
						die Nachricht gelesen haben.
					</p>
				</div>
				<div className={teamStyles.roster}>
					<TeamRoster empty onSelect={setPerson} isContact />
				</div>
			</header>

			<ContactModal
				open={person !== null}
				onClose={() => setPerson(null)}
				personId={person?.objectId ?? ""}
				categories={person?.categories}
				name={name}
				portrait={portrait}
				fallback={initials(name) || "H"}
				email={email}
				phone={phone}
				phoneLink={phoneLink}
				address={address}
			/>
		</Layout>
	);
};

export default Contact;
