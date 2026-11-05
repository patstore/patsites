export type Page = {
  content: any;
};

export type ColoproktologenUser = {
  objectId: string;
  type: "dgk" | "bcd" | "dgk/bcd";
  label: string;
	username: string;
	first_name: string;
	last_name: string;
	email: string | null;
	title: string;
	pre_title?: string;
	post_title?: string;
	address: string;
	password?: string;
	location?: string;
  description: string;
  /** Role objectIds from `_Role.users`, attached by the session endpoint. */
  roles?: string[];
  is_superuser: boolean;
  expires_at: {
	__type: "Date";
	iso: string;
  };
	data: {
		dgk: {
			address: string;
			title: string;
			name: string;
			postal_code: string;
			city: string;
			country: string;
		};
		bcd: {
			fachrichtung: string;
			klinikposition: string;
			belegklinik: string;
			tel: string;
			fax: string;
			email: string;
			country?: string
		};
	};
	settings: {
		bcd: {
			publish_specialist: boolean;
		};
		dgk: {
			accept_search: boolean;
		};
		newsletter: boolean;
		newsletter_email?: "existing" | "other";
		newsletter_email_address?: string;
		newsletter_optin_date: string;
		newsletter_optout_date: string | null;
	};
	emails: {
        email: string;
        lists: string[];
        settings: {
            [key: string]: {
                optIn: string | null;
                optOut: string | null;
            };
		};
	}[];
};

export type KoloproktologieUser = ColoproktologenUser;

export type Maybe<T> = T | null | undefined;

export type EventDate = {
    start?: string;
    end?: string;
    full_day?: boolean;
    place?: {
        type?: string;
        address?: string;
        location?: string;
    };
};

export type EventClass = {
    objectId?: string;
    title?: string | null;
    description?: string | null;
    text?: string | null;
    image?: string | null;
    link?: string | null;
    categories?: string[] | null;
    dates?: EventDate[] | null;
    documents?: string[] | null;
    gallery?: string[] | null;
    file?: { url?: string | null; name?: string | null } | null;
    filePath?: string | null;
    localFile?: { publicURL?: string | null; url?: string | null } | null;
};

export type LocationClass = {
    objectId: string;
    title?: string | null;
    description?: string | null;
    label?: string | null;
    text?: string | null;
    categories?: string[] | null;
    data?: unknown;
    coordinates?: { latitude?: number; longitude?: number } | null;
};

export type PatstoreEntry = {
    objectId: string;
    title?: string | null;
    description?: string | null;
    text?: string | null;
    date?: string | null;
    label?: string | null;
    link?: string | null;
    image?: string | null;
    categories?: string[] | null;
    documents?: string[] | null;
    file?: { url?: string | null; name?: string | null } | null;
    filePath?: string | null;
    localFile?: { publicURL?: string | null; url?: string | null } | null;
};

export type PatstoreEvent = EventClass;
export type PatstorePerson = {
    objectId: string;
    title?: string | null;
    image?: string | null;
    email?: string | null;
    description?: string | null;
    text?: string | null;
    data?: { position?: string | null; order?: number | null } | null;
};
export type PatstoreDownload = {
    objectId: string;
    title?: string | null;
    file?: { url?: string | null; name?: string | null } | null;
    filePath?: string | null;
    localFile?: { publicURL?: string | null; url?: string | null } | null;
};

export type WebpageContentText = { id: string; type: "text"; active?: boolean; text: string };
export type WebpageContentImage = {
    id: string;
    type: "image";
    active?: boolean;
    name: string;
    image: string;
};
export type WebpageContentVideo = { id: string; type: "video"; active?: boolean; video: string };
export type WebpageContentDivider = {
    id: string;
    type: "divider";
    active?: boolean;
    divider: { size: "small" | "medium" | "large"; showLine?: boolean };
};
export type WebpageContentTable = {
    id: string;
    type: "table";
    active?: boolean;
    table: {
        columns: { id: string; name: string; textAlign?: "left" | "center" | "right" }[];
        rows: { id: string; data: string[] }[];
        settings: {
            title?: string;
            showHeader?: boolean;
            description?: string;
            footer?: string;
        };
    };
};
export type WebpageClass = {
    objectId?: string;
    path?: string;
    title?: string | null;
    content?: Array<
        | WebpageContentText
        | WebpageContentImage
        | WebpageContentVideo
        | WebpageContentDivider
        | WebpageContentTable
    >;
};

export type FormClass = {
    objectId: string;
    fields: Array<{
        name: string;
        label: string;
        type: string;
        placeholder?: string;
        required?: boolean;
        select_options?: { label: string; value: string }[];
    }>;
};
