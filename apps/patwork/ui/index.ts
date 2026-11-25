/**
 * @patwork/ui — shared UI library.
 *
 * Note: apps typically consume this package through the path aliases
 * `@/ui`, `@/settings` and `@/styles` (wired in each app's vite + tsconfig),
 * which map directly to the folders below. This barrel is provided for
 * completeness when importing from the package name directly.
 *
 * Global styles live at `@patwork/ui/styles/global.scss`.
 */
export * from "./ui";
export * from "./settings";
