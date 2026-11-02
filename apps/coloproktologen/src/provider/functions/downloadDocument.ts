export const downloadDocument = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    // Extract filename from URL or use a default name
    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1] || "document";

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error downloading document:", error);
  }
};
