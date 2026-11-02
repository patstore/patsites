export type ContentPreviewProps = {
	title: string;
	date: string;
	content: ContentBlock[];
	attachments?: string[];
}


export interface ContentBlock {
	id: string;
	name: string;
	type: "text" | "button" | "divider" | "image" | "layout";
	position: number;
	value: string | any;
	active: boolean;
	children?: ContentBlock[][]; // For layout blocks: array of columns, each containing blocks
	config?: {
		columns?: string;
		alignment?: string;
		buttonText?: string;
		buttonUrl?: string;
		imageUrl?: string;
		imageAlt?: string;
		width?: string;
		height?: string;
		textType?: "heading" | "paragraph";
		headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	};
}