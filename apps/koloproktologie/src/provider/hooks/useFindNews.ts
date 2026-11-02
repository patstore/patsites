import { useMemo } from "react";
import { useFindData } from "@data";
import type { ArticleClass } from "@data";

const useFindNews = ({
    category
}: {
    category: string;
}): { news: ArticleClass[]; allNews: ArticleClass[] } => {
    const { findByClassName } = useFindData();

    const newsData = useMemo(() => {
        return findByClassName("articles").filter(
            (article) => article.state === "published"
        );
    }, [findByClassName]);

    const news = useMemo(() => {
        return newsData.filter((item) =>
            item.categories?.includes( category)
        );
    }, [newsData, category]);

    return { news, allNews: newsData };
};

export default useFindNews;
