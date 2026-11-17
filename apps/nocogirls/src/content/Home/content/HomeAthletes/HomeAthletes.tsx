import { useEffect, useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Field, Section, useLocalization, useOptionalScroll } from "@repo/core";
import { useNavigate } from "@tanstack/react-router";
import { toLocalizedHref } from "@provider";
import type { PersonRecord } from "@types";
import { AthleteCard } from "./components/AthleteCard";
import styles from "./HomeAthletes.module.scss";

export type HomeAthletesProps = {
	athletes: PersonRecord[];
};

const TRAVEL_RATIO = 0.06;

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function sectionProgress(el: HTMLElement): number {
	const rect = el.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const distance = viewportHeight + rect.height;
	if (distance === 0) {
		return 0;
	}
	return clamp((viewportHeight - rect.top) / distance, 0, 1);
}

function laneTranslate(lane: HTMLElement, progress: number): string {
	const overflow = Math.max(0, lane.scrollWidth - window.innerWidth);
	const start = -overflow * 0.35;
	const travel = overflow * TRAVEL_RATIO;
	return `translate3d(${start - progress * travel}px, 0, 0)`;
}

function sampleSize<T>(items: T[], count: number): T[] {
	const copy = [...items];
	for (let index = copy.length - 1; index > 0; index -= 1) {
		const swap = Math.floor(Math.random() * (index + 1));
		const current = copy[index];
		copy[index] = copy[swap] as T;
		copy[swap] = current as T;
	}
	return copy.slice(0, count);
}

export function HomeAthletes({ athletes }: HomeAthletesProps) {
	const navigate = useNavigate();
	const { language } = useLocalization();
	const scroll = useOptionalScroll();
	const athletesPath = toLocalizedHref("/athletes", language);
	const selectionKey = athletes.map((item) => item.objectId).join("|");
	const athleteArray = useMemo(() => sampleSize(athletes, 4), [selectionKey]);
	const sectionRef = useRef<HTMLElement | null>(null);
	const wrapRef = useRef<HTMLDivElement | null>(null);
	const laneRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const wrap = wrapRef.current;
		const lane = laneRef.current;
		if (!section || !wrap || !lane || athleteArray.length === 0) {
			return;
		}

		const motionQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		);

		const apply = () => {
			wrap.style.height = `${lane.offsetHeight}px`;
			const progress = motionQuery.matches
				? 0.5
				: sectionProgress(section);
			lane.style.transform = laneTranslate(lane, progress);
		};

		apply();
		const unsubscribe = scroll
			? scroll.subscribe(apply)
			: () => window.removeEventListener("scroll", apply);
		if (!scroll) {
			window.addEventListener("scroll", apply, { passive: true });
		}
		window.addEventListener("resize", apply);
		const observer = new ResizeObserver(apply);
		observer.observe(lane);
		motionQuery.addEventListener("change", apply);

		return () => {
			unsubscribe();
			window.removeEventListener("resize", apply);
			observer.disconnect();
			motionQuery.removeEventListener("change", apply);
		};
	}, [athleteArray, scroll]);

	return (
		<Section id="home-athletes">
			<section ref={sectionRef}>
				<div className={styles.home_athletes}>
					<div className={styles.athletes_title}>
						<div>
							<div className="eyebrow transform">
								<Field id="eyebrow">Unsere</Field>
							</div>
							<h2>
								<span className="border">
									<Field id="title">Athleten</Field>
								</span>
							</h2>
						</div>
						<div className="separator xl" />
						<a
							href={athletesPath}
							className="no_underline"
							onClick={(event) => {
								event.preventDefault();
								void navigate({ href: athletesPath });
							}}
						>
							<button className="button" type="button">
								<Field id="button">Alle Athleten</Field>
								<ArrowRight size={12} />
							</button>
						</a>
					</div>
					<div className={styles.athletes_lane_wrap} ref={wrapRef}>
						<div className={styles.athletes_list} ref={laneRef}>
							{athleteArray.length === 0 ? (
								<p>
									<Field id="no-athletes-found">
										No athletes found
									</Field>
								</p>
							) : (
								athleteArray.map((item) => (
									<AthleteCard
										key={item.objectId}
										athlete={item}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</section>
		</Section>
	);
}
