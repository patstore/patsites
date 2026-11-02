import { getStaticFileUrl } from "./getStaticFileUrl";

type FileCarrier = {
    filePath?: string | null;
    file?: { url?: string | null } | null;
    localFile?: { publicURL?: string | null; url?: string | null } | null;
} | null | undefined;

/** Resolves a CMS file to a URL from the static snapshot, falling back to a remote URL. */
export const getRecordFileUrl = (record?: object | null) => {
    const file = record as FileCarrier;
    if (!file) return "";
    if (file.filePath) return getStaticFileUrl(file.filePath);
    if (file.file?.url) return file.file.url;
    if (file.localFile?.publicURL) return file.localFile.publicURL;
    if (file.localFile?.url) return file.localFile.url;
    return "";
};
