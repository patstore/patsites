/** URL for files downloaded at build time into data/files/ */

export const getStaticFileUrl = (filePath: string) => {

    if (!filePath) {

        return "";

    }

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {

        return filePath;

    }

    return `/data/files/${filePath}`;

};

