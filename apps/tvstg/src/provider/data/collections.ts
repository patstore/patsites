import {
	registerCollections,
	useCollection as useSharedCollection,
	usePatstoreCollection as useSharedPatstoreCollection
} from "@repo/provider";
import type { PatstoreClassName, PatstoreCollections } from "@types";
import {
	getLiveCollection,
	publicClassNames,
	type PublicClassName
} from "../../../data/public-content";

registerCollections({
	publicClassNames,
	getLiveCollection: (className) =>
		getLiveCollection({ data: className as PublicClassName })
});

type Row<K extends PatstoreClassName> = PatstoreCollections[K][number];

/** Rows of one PatStore class: the published snapshot, or live rows in draft mode. */
export function usePatstoreCollection<K extends PatstoreClassName>(
	className: K
): PatstoreCollections[K] {
	return useSharedPatstoreCollection<Row<K>>(
		className
	) as PatstoreCollections[K];
}

/** Rows of one PatStore class plus a lookup by `objectId`. */
export function useCollection<K extends PatstoreClassName>(className: K) {
	const { items, find } = useSharedCollection<Row<K>>(className);
	return { items: items as PatstoreCollections[K], find };
}
