import { useFindData } from "@data";
import { Link } from "@tanstack/react-router";
import type { ImageClass } from "@data";
import type { WorkProps } from "../types";
import type { FC } from "react";

const Work: FC<WorkProps> = ({ work, number, length }) => {
    const { findByObjectId } = useFindData();
    const image = findByObjectId<ImageClass & { filePath?: string }>(
        work.image || ""
    );
    const year = work.date ? new Date(work.date).getFullYear() : null;

    return (
        <article className="work-card-container">
            <div className="header">
                <div>
                    <p className="bold">{year ? year : null}</p>
                </div>
                <p className="bold">
                    {number}
                    <span> — {length}</span>
                </p>
            </div>
            <Link
                to="/projekte/$slug"
                params={{ slug: work.slug as string }}
                className="work-card-image"
            >
                <img
                    src={`/data/files/${image?.filePath}`}
                    alt={work.title as string}
                />
            </Link>
            <div className="title">
                <p className="bold">{work.title}</p>
            </div>
        </article>
    );
};

export default Work;
