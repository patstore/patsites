interface DownloadLinkProps {
    filename: string;
    label: string;
}

const DownloadLink = ({ filename, label }: DownloadLinkProps) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const downloadUrl = `${baseUrl}/members/${filename}`;

    return (
        <a 
            css={{ cursor: "pointer" }} 
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            {label}
        </a>
    );
};

export default DownloadLink;


    