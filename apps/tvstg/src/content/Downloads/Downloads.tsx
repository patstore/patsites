import React, { useMemo } from "react";
import { Layout } from "@components";
import { HeadContent } from "@ui";
import { PatstoreCategory, PatstoreDownload } from "@types";
import { useCollection } from "@provider";
import styles from "./Downloads.module.css";

const EXCLUDED_CATEGORY_ID = "3voTJpShwb";
const COLUMNS = 12;

const spanClass: Record<number, string | undefined> = {
	3: styles.span3,
	4: styles.span4,
	5: styles.span5,
	6: styles.span6,
	7: styles.span7,
	8: styles.span8,
	9: styles.span9,
	10: styles.span10,
	11: styles.span11,
	12: styles.span12,
};

type DownloadGroup = {
	category: PatstoreCategory;
	files: PatstoreDownload[];
};

const Downloads: React.FC = () => {
	const { items: downloads } = useCollection("Download");
	const { items: categorys } = useCollection("Category");

	const groups = useMemo(() => {
		const downloadGroups: DownloadGroup[] = categorys
			.filter(
				(category: PatstoreCategory) =>
					category.type === "downloads" &&
					category.objectId !== EXCLUDED_CATEGORY_ID
			)
			.map((category) => ({
				category,
				files: downloads.filter((download: PatstoreDownload) =>
					download?.categories?.includes(category.objectId as string)
				),
			}));

		return packMosaic(downloadGroups);
	}, [categorys, downloads]);

	return (
		<Layout>
			<HeadContent
				site="Downloads"
				titel="Alle Downloads und Dokumente"
			/>
			<div className="wrapper">
				<div className="site-container">
					<div className={styles.mosaic}>
						{groups.map(({ category, files, span }) => (
							<section
								className={[
									styles.group,
									spanClass[span],
									files.length >= 7 ? styles.large : "",
								]
									.filter(Boolean)
									.join(" ")}
								key={category.objectId}
							>
								<h3>{category.title}</h3>
								{files.map((download) => (
									<a
										className={styles.link}
										key={download.objectId}
										target="_blank"
										rel="noopener noreferrer"
										href={download.file?.url || ""}
									>
										{download.title}
									</a>
								))}
							</section>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

function baseSpan(count: number): number {
	if (count >= 7) {
		return 6;
	}
	if (count >= 4) {
		return 4;
	}
	return 3;
}

function packMosaic(groups: DownloadGroup[]) {
	const sorted = [...groups].sort((a, b) => b.files.length - a.files.length);
	const placed: Array<DownloadGroup & { span: number }> = [];
	let row: Array<DownloadGroup & { span: number }> = [];
	let used = 0;

	const closeRow = () => {
		let extra = COLUMNS - used;
		const bySize = [...row].sort((a, b) => b.files.length - a.files.length);
		let index = 0;
		while (extra > 0 && bySize.length > 0) {
			bySize[index % bySize.length].span += 1;
			extra -= 1;
			index += 1;
		}
		placed.push(...row);
		row = [];
		used = 0;
	};

	for (const group of sorted) {
		const span = baseSpan(group.files.length);
		if (row.length > 0 && used + span > COLUMNS) {
			closeRow();
		}
		row.push({ ...group, span });
		used += span;
	}

	if (row.length > 0) {
		closeRow();
	}

	return placed;
}

export default Downloads;
