import { useLocalization } from "@repo/core";
import type { EntryRecord } from "@types";
import { useResolveImage } from "@ui";
import styles from "../HomeNews.module.scss";

function formatNewsDate(value: string | null | undefined, language: string) {
	if (!value) {
		return null;
	}
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return null;
	}
	return new Intl.DateTimeFormat(language, { dateStyle: "long" }).format(
		date
	);
}

export function NewsElement({ news }: { news: EntryRecord }) {
	const resolveImage = useResolveImage();
	const { language } = useLocalization();
	const src = news.image ? resolveImage(news.image) : undefined;
	const formattedDate = formatNewsDate(news.date, language);

	return (
		<div className={styles.news_element}>
			{src ? (
				<div className={styles.news_element_image}>
					<img src={src} alt={news.title ?? ""} />
				</div>
			) : null}
			<div className={styles.news_element_content}>
				{formattedDate ? (
					<div className={styles.news_element_date}>
						{formattedDate}
					</div>
				) : null}
				<h3>{news.title}</h3>
				<div className={styles.news_element_divider} />
				<div dangerouslySetInnerHTML={{ __html: news.text ?? "" }} />
			</div>
		</div>
	);
}
