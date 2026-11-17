import type { ReactNode } from "react";
import { ContentProvider, useLocalization } from "@repo/core";
import { pageEntries } from "@cms-content";
import { useResolveImage } from "@ui";

export function PageContent({
	path,
	children
}: {
	path: string;
	children: ReactNode;
}) {
	useLocalization();
	const resolveImage = useResolveImage();

	return (
		<ContentProvider
			pageData={pageEntries(path)}
			resolveImage={resolveImage}
		>
			{children}
		</ContentProvider>
	);
}
