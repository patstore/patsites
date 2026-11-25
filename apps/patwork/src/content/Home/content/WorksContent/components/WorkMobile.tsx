import { ArrowUpRight } from "lucide-react";
import { useFindData } from "@data";
import type { ArticleClass, ImageClass } from "@data";

import { BrowserMockup } from "@/ui";

const WorkMobile = ({ work, index }: { work: ArticleClass; index: number }) => {
    const { findByObjectId } = useFindData();
    const image: ImageClass | null = findByObjectId(work.image || "");
    return (
        <article
            key={`${work.title}-${index}`}
            className="work-mobile-card"
        >
            <h4>{work.title}</h4>
            <div className="divider medium" />
            <BrowserMockup
                content={
                    <img
                        src={`/data/files/${image?.filePath}`}
                        alt={work.title as string}
                    />
                }
                id={`work-image-${index}`}
                sizeKey={2000}
            />
            <div className="divider large" />
            <div className="work-mobile-card-body">
                <div className="work-mobile-card-row">
                    <p className="bold">Art</p>
                    <p>{work.data?.kategorie}</p>
                </div>
                <div className="work-mobile-card-row">
                    <p className="bold">Jahr</p>
                    <p>{work.date}</p>
                </div>
            </div>
        </article>
    );
};

export default WorkMobile;
