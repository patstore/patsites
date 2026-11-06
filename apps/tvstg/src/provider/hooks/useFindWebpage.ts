import { PatstoreWebpage } from "@types";
import { useMemo } from "react";
import { useCollection } from "./collections";

const useFindWebpage = ({ path }: { path?: string }) => {
  const { items: webpages } = useCollection("Webpage");

  return useMemo((): PatstoreWebpage | undefined => {
    if (!path) {
      return undefined;
    }
    return webpages.find((page) => page?.path?.includes(path));
  }, [path, webpages]);
};

export default useFindWebpage;
