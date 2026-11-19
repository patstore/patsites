import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ContactModal, Layout } from "@components";
import type { EntryClass, PersonClass } from "@data";
import { useCollection } from "@provider";
import styles from "./Member.module.css";
import {
	displayName,
	initials,
	personSlug,
	personTransitionProps,
	phoneHref,
	portraitSrc
} from "./person";
import { ChevronRightIcon } from "lucide-react";

const plainText = (value: string | null | undefined) =>
	(value ?? "")
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, "")
		.replace(/\s+/g, " ")
		.trim();

const servicesFor = (personId: string, entries: readonly EntryClass[]) =>
	entries
		.filter((entry) => (entry.categories ?? []).includes(personId))
		.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? "", "de"));

const Member = ({
	person,
	persons
}: {
	person: PersonClass;
	persons: PersonClass[];
}) => {
	const { items: images } = useCollection("Image");
	const { items: entries } = useCollection("Entry");
	const name = displayName(person);
	const portrait = useMemo(() => {
		const image = images.find((item) => item.objectId === person.image);
		return portraitSrc(image);
	}, [images, person.image]);
	const services = useMemo(
		() => servicesFor(person.objectId, entries),
		[entries, person.objectId]
	);
	const index = persons.findIndex(
		(item) => item.objectId === person.objectId
	);
	const next =
		persons.length > 1 && index >= 0
			? persons[(index + 1) % persons.length]
			: null;
	const email = person.email?.trim() || null;
	const phone = person.data?.telefon?.trim() || null;
	const address = person.data?.adresse?.trim() || null;
	const phoneLink = phone ? phoneHref(phone) : null;
	const nextName = next ? displayName(next) : null;
	const [contactOpen, setContactOpen] = useState(false);

	return (
		<Layout>
			<article className={styles.page}>
				<aside className={styles.portraitCol}>
					<div className={styles.identity}>
						<p className={styles.asideName}>{name}</p>
						{portrait ? (
							<img
								{...personTransitionProps(person.objectId)}
								className={styles.portrait}
								src={portrait}
								alt=""
							/>
						) : (
							<div
								{...personTransitionProps(person.objectId)}
								className={styles.placeholder}
								aria-hidden="true"
							>
								{initials(name) || "H"}
							</div>
						)}
					</div>
					<button
						type="button"
						className={styles.contactButton}
						aria-haspopup="dialog"
						aria-expanded={contactOpen}
						onClick={() => setContactOpen(true)}
					>
						Kontakt
					</button>
					{email || phone || address ? (
						<div className={styles.contact}>
							<p className={styles.contactLabel}>Kontakt</p>
							{email ? (
								<a href={`mailto:${email}`}>{email}</a>
							) : null}
							{phone && phoneLink ? (
								<a href={phoneLink}>{phone}</a>
							) : null}
							{address ? (
								<p className={styles.address}>{address}</p>
							) : null}
						</div>
					) : null}
				</aside>
				<div className={styles.copy}>
					<h1>{name}</h1>
					{person.text ? (
						<div
							className={styles.bio}
							dangerouslySetInnerHTML={{ __html: person.text }}
						/>
					) : null}
					{services.length > 0 ? (
						<section
							className={styles.services}
							aria-labelledby="leistungen"
						>
							<h2 id="leistungen">Leistungen</h2>
							<ul className={styles.serviceList}>
								{services.map((service) => {
									const summary =
										plainText(service.description) ||
										plainText(service.text);
									return (
										<li key={service.objectId}>
											<Link
												to="/leistungen"
												hash={service.slug || undefined}
												className={styles.service}
											>
												<h3>
													{service.title ||
														"Leistung"}
												</h3>
												{summary ? (
													<p>{summary}</p>
												) : null}
											</Link>
										</li>
									);
								})}
							</ul>
						</section>
					) : null}
					{next && nextName ? (
						<div className={styles.nextRow}>
							<Link
								to="/team/$slug"
								params={{ slug: personSlug(next) }}
								aria-label={`Nächste Hebamme: ${nextName}`}
							>
								<button className="with-icon">
									{nextName}
									<span className="icon">
										<ChevronRightIcon />
									</span>
								</button>
							</Link>
						</div>
					) : null}
				</div>
			</article>
			<ContactModal
				open={contactOpen}
				onClose={() => setContactOpen(false)}
				personId={person.objectId}
				categories={person.categories}
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

export default Member;
