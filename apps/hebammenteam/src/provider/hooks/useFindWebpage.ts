import { useMemo } from "react";
import type { PatstoreWebpage } from "@types";
import { canonicalPath } from "../functions/paths";
import { useCollection } from "./collections";

const useFindWebpage = ({ path }: { path?: string | string[] }) => {
  const { items: webpages } = useCollection("Webpage");
  const pathKey = Array.isArray(path) ? path.join("\n") : (path ?? "");

  return useMemo((): PatstoreWebpage | undefined => {
    if (!pathKey) {
      return undefined;
    }
    const wanted = new Set(pathKey.split("\n").map((item) => canonicalPath(item)));
    return webpages.find((page) => wanted.has(canonicalPath(page.path)));
  }, [pathKey, webpages]);
};

export default useFindWebpage;
