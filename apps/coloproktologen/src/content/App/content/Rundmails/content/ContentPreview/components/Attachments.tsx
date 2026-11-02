import React, { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { generateQuery, sanitizeGraphQlNode } from "@provider";
import { File, FileImage, FileSpreadsheet, FileText } from "lucide-react";

type AttachmentsProps = {
	attachments: string[];
};

type Document = {
	objectId: string;
	title?: string | null;
	file?: { name?: string; url?: string } | null;
};

const getFileExtension = (doc: Document): string => {
	const name = doc.file?.name || doc.title || "";
	const match = name.match(/\.([a-z0-9]+)$/i);
	return match ? match[1].toLowerCase() : "";
};

const getFileIcon = (doc: Document) => {
	const ext = getFileExtension(doc);
	const imageExts = ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp"];
	const spreadsheetExts = ["xls", "xlsx", "csv", "ods"];
	if (imageExts.includes(ext)) return FileImage;
	if (spreadsheetExts.includes(ext)) return FileSpreadsheet;
	if (["pdf", "doc", "docx", "txt", "rtf"].includes(ext)) return FileText;
	return File;
};

const Attachments: React.FC<AttachmentsProps> = ({ attachments }) => {
	const { data } = useQuery(
		generateQuery({
			type: "find",
			objectName: "Document",
			queryName: "documents",
			fields: ["objectId", "title", "file {name url}"],
		}),
		{
			variables: {
				params: {
					objectId: { in: attachments },
				},
			},
			skip: !attachments?.length,
		}
	);

	const documents = useMemo(() => {
		const edges = data?.documents?.edges;
		return edges?.map((edge: any) => sanitizeGraphQlNode(edge.node) as Document) || [];
	}, [data]);

	if (documents.length === 0) return null;

	return (
		<div className="content-preview-header">
			<h4>Anhänge</h4>
			<div className="attachments-list">
				{documents.map((doc: Document) => {
					const Icon = getFileIcon(doc);
					const link = doc?.file?.url || "";
					const title = doc.title || doc.file?.name || "Download";
					if (!link) return null;
					return (
						<a
							key={doc.objectId}
							href={link}
							target="_blank"
							rel="noreferrer"
							className="attachment-button"
						>
							<Icon size={18} />
							<span>{title}</span>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default Attachments;
