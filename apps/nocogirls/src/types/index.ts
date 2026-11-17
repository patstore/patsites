export type CategoryRecord = {
	objectId: string;
	title?: string | null;
	image?: string | null;
};

export type EntryRecord = {
	objectId: string;
	title?: string | null;
	text?: string | null;
	image?: string | null;
	state?: string | null;
	date?: string | null;
	lang?: string | null;
};

export type EventRecord = {
	objectId: string;
	title?: string | null;
	location?: string | null;
	image?: string | null;
	state?: string | null;
	dates?: unknown[] | null;
};

export type ImageRecord = {
	objectId: string;
	title?: string | null;
	description?: string | null;
	active?: boolean | null;
	file?: { url?: string; name?: string } | null;
	filePath?: string;
	file_local?: string | string[] | null;
	url?: string;
	categories?: string[] | null;
};

export type PersonRecord = {
	objectId: string;
	title?: string | null;
	description?: string | null;
	text?: string | null;
	image?: string | null;
	state?: string | null;
	date?: string | null;
	slug?: string | null;
	categories?: string[] | null;
};

export type SiteCollections = {
	Category: CategoryRecord[];
	Entry: EntryRecord[];
	Event: EventRecord[];
	Image: ImageRecord[];
	Person: PersonRecord[];
};
