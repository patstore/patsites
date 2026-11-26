import "@data";
import { registerCollections } from "@repo/provider";
import {
	getLiveCollection,
	publicClassNames,
	type PublicClassName
} from "../../data/public-content";

registerCollections({
	publicClassNames,
	getLiveCollection: (className) =>
		getLiveCollection({ data: className as PublicClassName })
});
