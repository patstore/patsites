import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { CmsBody, Layout, PageHeader, excerpt } from "@components";
import { courseSlug, useCollection } from "@provider";
import styles from "./Courses.module.css";
import { ChevronRightIcon } from "lucide-react";

const Courses = () => {
	const { items } = useCollection("Event");
	const courses = useMemo(
		() =>
			items.sort((a, b) =>
				(a.title ?? "").localeCompare(b.title ?? "", "de")
			),
		[items]
	);

	return (
		<Layout>
			<PageHeader
				eyebrow="Angebot"
				title="Kurse"
				lead="Geburtsvorbereitung, Rückbildung und weitere Angebote."
			>
				<div>
					{courses.length === 0 ? (
						<p className={styles.empty}>
							Kurse erscheinen hier, sobald sie veröffentlicht
							sind.
						</p>
					) : (
						<ul className={styles.list}>
							{courses.map((course) => {
								const slug =
									courseSlug(course.slug) ?? course.objectId;
								const summary = excerpt(course.text, 180);
								return (
									<li key={course.objectId}>
										<Link
											to="/kurse/$kurs_id"
											params={{ kurs_id: slug }}
											className={styles.card}
										>
											<h2>{course.title || "Kurs"}</h2>
											{summary ? <p>{summary}</p> : null}
											<button className="inverted with-icon">
												Zur Veranstaltung
												<span className="icon">
													<ChevronRightIcon />
												</span>
											</button>
										</Link>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</PageHeader>
		</Layout>
	);
};

export default Courses;
