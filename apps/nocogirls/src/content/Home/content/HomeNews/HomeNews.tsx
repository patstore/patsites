import { useEffect, useRef, useState } from "react";
import { Field, Section } from "@repo/core";
import type { EntryRecord } from "@types";
import { NewsElement } from "./components/NewsElement";
import { NewsButtons } from "./components/NewsButtons";
import styles from "./HomeNews.module.scss";

export function HomeNews({ news }: { news: EntryRecord[] }) {
	const [counter, setCounter] = useState(0);
	const [maxCounterValue, setMaxCounterValue] = useState(0);
	const newsElementsTrackRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const viewPortWidth = window.innerWidth;
		const trackWidth = newsElementsTrackRef.current?.scrollWidth ?? 0;
		const currentWidth = viewPortWidth > 1280 ? 1280 : viewPortWidth;
		const nextMax = Math.floor((currentWidth - trackWidth) / 312);
		if (newsElementsTrackRef.current) {
			setMaxCounterValue(-nextMax);
		}
	}, [news.length]);

	return (
		<Section id="home-news">
			<section className={styles.home_news}>
				<div className="flex row align-end justify-between w-100">
					<div>
						<div className="eyebrow">
							<Field id="eyebrow">Lies hier die aktuelle</Field>
						</div>
						<h2>
							<span className="border">
								<Field id="title">NEWS</Field>
							</span>
						</h2>
					</div>
					<NewsButtons
						counter={counter}
						setCounter={setCounter}
						maxCounterValue={maxCounterValue}
					/>
				</div>
				<div className={styles.news_elements_container}>
					<div
						ref={newsElementsTrackRef}
						style={{ transform: `translateX(-${counter * 312}px)` }}
						className={styles.news_elements_track}
					>
						{news.length === 0 ? (
							<p>
								<Field id="no-news-found">
									Keine Nachrichten gefunden
								</Field>
							</p>
						) : (
							news.map((newsItem) => (
								<NewsElement
									key={newsItem.objectId}
									news={newsItem}
								/>
							))
						)}
					</div>
				</div>
			</section>
		</Section>
	);
}
