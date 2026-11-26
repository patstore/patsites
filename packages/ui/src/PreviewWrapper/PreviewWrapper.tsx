import { create } from "zustand";
import PreviewToggle from "./components/PreviewToggle";

type PreviewWrapperProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	preview?: boolean;
};

const previewEnvVar = import.meta.env.VITE_PREVIEW_MODE === "true";

const usePreviewStore = create<{
	preview: boolean;
	setPreview: (preview: boolean) => void;
}>((set) => ({
	preview: previewEnvVar,
	setPreview: (preview: boolean) => set({ preview })
}));

export const Preview = ({ children }: { children: React.ReactNode }) => {
	const { preview } = usePreviewStore();
	return preview ? children : null;
};

export const Default = ({ children }: { children: React.ReactNode }) => {
	const { preview } = usePreviewStore();
	return !preview ? children : null;
};

export default function PreviewWrapper({ children }: PreviewWrapperProps) {
	const { preview, setPreview } = usePreviewStore();
	console.log(preview);
	return (
		<>
			{children}
			<PreviewToggle preview={preview} setPreview={setPreview} />
		</>
	);
}
