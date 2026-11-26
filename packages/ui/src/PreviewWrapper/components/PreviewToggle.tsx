import styles from "../PreviewWrapper.module.css";
import { Eye, EyeClosed } from "lucide-react";

const PreviewToggle = ({
	preview,
	setPreview
}: {
	preview: boolean;
	setPreview: (preview: boolean) => void;
}) => {
	return (
		<div
			className={styles.preview_toggle}
			onClick={() => setPreview(!preview)}
		>
			{preview ? (
				<EyeClosed strokeWidth={1} size={18} />
			) : (
				<Eye strokeWidth={1} size={18} />
			)}
		</div>
	);
};

export default PreviewToggle;
