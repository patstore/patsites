declare module "*.css";
declare module "lenis/dist/lenis.css";

interface ImportMetaEnv {
	readonly VITE_DRAFT_MODE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
