import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import "@data";
import type { EntryClass, ImageClass, PersonClass } from "@data";
import { useOptionalScroll } from "@repo/core";
import { isDraftMode, loadStaticRecords } from "@repo/server";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";
import ServiceCard from "./components/ServiceCard";

const recordStates = isDraftMode() ? null : (["published"] as const);

const personsForService = (service: EntryClass, persons: PersonClass[]) => {
	const ids = service.categories ?? [];
	if (ids.length === 0) {
		return [];
	}
	const idSet = new Set(ids);
	return persons.filter((person) => idSet.has(person.objectId));
};

const Services = () => {
	const navigate = useNavigate();
	const sectionRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const scroll = useOptionalScroll();
	const services = loadStaticRecords<EntryClass>("Entry", {
		states: recordStates
	});
	const persons = loadStaticRecords<PersonClass>("Person", {
		states: recordStates
	});
	const images = loadStaticRecords<ImageClass>("Image", { states: null });

	useGSAP(
		() => {
			const section = sectionRef.current;
			const track = trackRef.current;
			const scroller = scroll?.getViewport();
			if (!section || !track || !scroller) {
				return;
			}

			gsap.registerPlugin(ScrollTrigger);

			const travel = () =>
				Math.max(0, track.scrollWidth - track.clientWidth);

			const motion = gsap.matchMedia();
			motion.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.to(track, {
					x: () => -travel(),
					ease: "none",
					scrollTrigger: {
						scroller,
						trigger: section,
						start: "center center",
						end: () => `+=${travel()}`,
						pin: true,
						scrub: true,
						anticipatePin: 1,
						invalidateOnRefresh: true
					}
				});
			});

			return () => motion.revert();
		},
		{
			scope: sectionRef,
			dependencies: [services.length],
			revertOnUpdate: true
		}
	);

	return (
		<section
			className={styles.section}
			aria-label="Leistungen"
			ref={sectionRef}
		>
			<div className="content">
				<h2 className={styles.heading}>Leistungen</h2>
				<div className={styles.frame}>
					<div className={styles.track} ref={trackRef}>
						{services.map((service) => (
							<ServiceCard
								key={service.objectId}
								service={service}
								persons={personsForService(service, persons)}
								images={images}
							/>
						))}
					</div>
				</div>
				<div className={styles.footer}>
					<button
						type="button"
						onClick={() => navigate({ to: "/leistungen" })}
					>
						Alle Leistungen
					</button>
				</div>
			</div>
		</section>
	);
};

export default Services;
