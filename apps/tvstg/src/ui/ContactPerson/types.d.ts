export type ContactGroupTime = {
	id: string;
	/** e.g. "Montag 18:00 - 19:30" */
	label: string;
	location?: string;
	text?: string;
};

export type ContactGroup = {
	title: string;
	times: ContactGroupTime[];
};
