import { Link } from "@tanstack/react-router";
import { useFindData } from "@data";
import { getNextProject } from "../../utils";
import type { ImageClass } from "@data";
import type { FC } from "react";
import type { NextProjectProps } from "../../types";
import { AnimateContent } from "@/animations";
import "./next_project.scss";
import { ArrowRight } from "lucide-react";

type ImageWithPath = ImageClass & { filePath?: string };

const NextProject: FC<NextProjectProps> = ({ project }) => {
    const { findByClassName, findByObjectId } = useFindData();
    const nextProject = getNextProject(findByClassName("articles"), project);

    if (!nextProject) return null;

    const image = nextProject.image
        ? findByObjectId<ImageWithPath>(nextProject.image)
        : null;
    const slug = nextProject.slug ?? "";

    return (
        <div className="section-container padding-top-medium padding-bottom-large next-project bg-lightgrey">
            <div className="section-container-element w-100 justify-end  align-end">
                <div className="w-33">
                    <AnimateContent
                        viewport={0}
                        className="w-33"
                    >
                        <p className="bold">Nächstes Projekt</p>
                    </AnimateContent>
                    <AnimateContent
                        viewport={0}
                        delay={0.2}
                    >
                        <Link
                            to="/projekte/$slug"
                            params={{ slug }}
                            className="next-project-preview"
                        >
                            {image?.filePath ? (
                                <img
                                    style={{ height: "100%" }}
                                    src={`/data/files/${image.filePath}`}
                                    alt={nextProject.title || ""}
                                />
                            ) : null}
                            <button className="inline">
                                {nextProject.title} <ArrowRight size={12} />
                            </button>
                        </Link>
                    </AnimateContent>
                </div>
            </div>
        </div>
    );
};

export default NextProject;
