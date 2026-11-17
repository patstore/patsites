import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * Shared ESLint configuration.
 *
 * Prettier options live in the repo root `.prettierrc.json` (tabs, width 4,
 * double quotes, semicolons, no trailing commas, LF).
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = tseslint.config(
	{
		ignores: [
			"**/dist/**",
			"**/.output/**",
			"**/.vercel/**",
			"**/.turbo/**",
			"**/.cache/**",
			"**/coverage/**",
			"**/*.gen.ts",
			"**/data/index.ts",
			"**/data/schema.ts",
			"**/data/types.ts",
			"**/data/useFindData.ts",
			"**/data/public-content.ts",
			"**/data/cms-content-data.ts"
		]
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	eslintConfigPrettier,
	{
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
		plugins: {
			turbo: turboPlugin,
			prettier
		},
		rules: {
			"prettier/prettier": "error",
			"react-hooks/exhaustive-deps": "off",
			// Runtime secrets are not Turbo build inputs.
			"turbo/no-undeclared-env-vars": "off",
			// Legacy site code still uses `any`. Formatting and hook rules are enforced.
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"no-useless-assignment": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					ignoreRestSiblings: true
				}
			]
		}
	}
);
