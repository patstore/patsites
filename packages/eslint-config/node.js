import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * ESLint configuration for Node packages.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	...baseConfig,
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	}
];
