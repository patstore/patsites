// Placeholder until the first PatStore snapshot. The Vite data plugin overwrites this file.
import buildTimeData from "./build-time-data.json";
import { registerStaticSnapshot } from "@repo/server";

registerStaticSnapshot(buildTimeData);

export { default as buildTimeData } from "./build-time-data.json";
