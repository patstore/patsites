interface ImportMetaEnv {
	readonly DEV: boolean;
	readonly VITE_DRAFT_MODE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
