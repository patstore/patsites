import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	type ReactNode
} from "react";
import { Link } from "@tanstack/react-router";
import type { ImageClass, PersonClass } from "@data";
import { useCollection } from "@provider";
import { useOptionalScroll } from "@repo/core";
import { motion, useMotionValue, type MotionValue } from "motion/react";
import styles from "./Team.module.css";
import { imgParallax, imgStyling } from "./constants/img";

const portraitSrc = (image: ImageClass | undefined) => {
	if (!image) {
		return null;
	}
	const path = image.filePath || image.thumbnailPath;
	if (path) {
		const encoded = path
			.split("/")
			.filter(Boolean)
			.map((part) => encodeURIComponent(part))
			.join("/");
		return `/data/files/${encoded}`;
	}
	const remote = image.file?.url;
	return remote && /^https?:\/\//i.test(remote) ? remote : null;
};

const initials = (name: string) =>
	name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");

const displayName = (person: PersonClass) =>
	person.label || person.title || "Hebamme";

const valueForIndex = <T,>(
	values: Record<string, T>,
	index: number,
	fallback: T
) => {
	const keys = Object.keys(values);
	const key = keys[index % keys.length];
	return key === undefined ? fallback : (values[key] ?? fallback);
};

type MemberRegistration = {
	element: HTMLElement;
	y: MotionValue<number>;
	parallax: number;
};

const Member = ({
	rotate,
	parallax,
	register,
	children
}: {
	rotate: number;
	parallax: number;
	register: (member: MemberRegistration) => () => void;
	children: ReactNode;
}) => {
	const ref = useRef<HTMLLIElement>(null);
	const y = useMotionValue(0);

	useLayoutEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}
		return register({ element, y, parallax });
	}, [parallax, register, y]);

	return (
		<motion.li ref={ref} className={styles.item} style={{ rotate, y }}>
			{children}
		</motion.li>
	);
};

const Team = () => {
	const scroll = useOptionalScroll();
	const members = useRef(new Set<MemberRegistration>());
	const register = useRef((member: MemberRegistration) => {
		members.current.add(member);
		return () => {
			members.current.delete(member);
		};
	}).current;
	const { items } = useCollection("Person");
	const { items: images } = useCollection("Image");
	const portraitFor = useMemo(() => {
		const byId = new Map(images.map((image) => [image.objectId, image]));
		return (id: string | null | undefined) =>
			portraitSrc(id ? byId.get(id) : undefined);
	}, [images]);
	const persons = useMemo(
		() =>
			[...items].sort((a, b) =>
				displayName(a).localeCompare(displayName(b), "de")
			),
		[items]
	);

	const updateParallax = useCallback(() => {
		const height = window.innerHeight || 1;
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		members.current.forEach((member) => {
			if (reduceMotion) {
				member.y.set(0);
				return;
			}
			const applied = member.y.get();
			const rect = member.element.getBoundingClientRect();
			const naturalCenter = rect.top - applied + rect.height / 2;
			member.y.set((naturalCenter / height - 0.5) * member.parallax);
		});
	}, []);

	useLayoutEffect(() => {
		updateParallax();
	}, [updateParallax, persons, images]);

	useEffect(() => {
		if (!scroll) {
			window.addEventListener("scroll", updateParallax, {
				passive: true
			});
			window.addEventListener("resize", updateParallax);
			return () => {
				window.removeEventListener("scroll", updateParallax);
				window.removeEventListener("resize", updateParallax);
			};
		}

		window.addEventListener("resize", updateParallax);
		const unsubscribe = scroll.subscribe(updateParallax);
		return () => {
			unsubscribe();
			window.removeEventListener("resize", updateParallax);
		};
	}, [scroll, updateParallax]);

	return (
		<section aria-label="Team">
			<div className="content">
				<h2>Team</h2>
				<div>
					<p className="lead">
						Ob große Fragen oder kleine Sorgen, wunderschöne erste
						Momente oder herausfordernde Tage – wir sind für euch
						da.
					</p>
				</div>
				<ul className={styles.list}>
					{persons.map((person, index) => {
						const name = displayName(person);
						const portrait = portraitFor(person.image);
						return (
							<Member
								key={person.objectId}
								rotate={
									valueForIndex(imgStyling, index, {
										rotate: 0
									}).rotate
								}
								parallax={valueForIndex(imgParallax, index, 0)}
								register={register}
							>
								<Link
									to="/team"
									hash={person.slug || undefined}
									className={styles.person}
								>
									{portrait ? (
										<img
											className={styles.portrait}
											src={portrait}
											alt=""
										/>
									) : (
										<span
											className={styles.placeholder}
											aria-hidden="true"
										>
											{initials(name) || "H"}
										</span>
									)}
									<span className={styles.name}>{name}</span>
								</Link>
							</Member>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default Team;
