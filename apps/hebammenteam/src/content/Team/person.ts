import type { ImageClass, PersonClass } from "@data";

export const portraitSrc = (image: ImageClass | undefined) => {
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

export const initials = (name: string | null | undefined) =>
	(name ?? "")
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");

export const displayName = (person: PersonClass) =>
	(person.label || person.title || "Hebamme").trim() || "Hebamme";

export const personSlug = (person: PersonClass) =>
	person.slug?.trim() || person.objectId;

export const personTransitionId = (objectId: string) => `person-${objectId}`;

export const personTransitionProps = (objectId: string) => ({
	"data-transition-id": personTransitionId(objectId)
});

export const sortPersons = (items: readonly PersonClass[]) =>
	[...items].sort((a, b) =>
		displayName(a).localeCompare(displayName(b), "de")
	);

export const phoneHref = (value: string) => {
	const compact = value.replace(/[^\d+]/g, "");
	return compact ? `tel:${compact}` : null;
};
