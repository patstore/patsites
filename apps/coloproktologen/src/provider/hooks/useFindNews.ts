import { useMemo } from "react";
import { useGetEntry } from "./patstore";
import { PatstoreEntry } from "@types";

const useFindNews = ({
  category,
}: {
  category: string;
}): { news: PatstoreEntry[] } => {
  const { entrys: allNews } = useGetEntry();

  const news = useMemo(() => {
    return allNews.filter((news) => news?.categories?.includes(category));
  }, [allNews, category]);

  return { news };
};

export default useFindNews;
