import { Link } from "@tanstack/react-router";
import { useFindData } from "@data";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./components/ProjectCard";
import { getProjectArticles } from "@/content/Projekt/utils";
import "./project_grid.scss";
import { AnimateContent } from "@/animations";

const getProjectYear = (date?: string | null) => {
    if (!date) return null;
    const year = new Date(date).getFullYear();
    return Number.isNaN(year) ? null : year;
};

const ProjectGrid = () => {
    const { findByClassName } = useFindData();
    const projects = getProjectArticles(findByClassName("articles"));
    if (projects.length === 0) return null;

    return (
        <div className="section-container padding-top-large padding-bottom-large project-grid">
            {projects
                .sort((a, b) => {
                    return (
                        new Date(b.date || "").getTime() -
                        new Date(a.date || "").getTime()
                    );
                })
                .map((project, index) => {
                    const year = getProjectYear(project.date);
                    const imageOnLeft = index % 2 === 0;
                    const slug = project.slug ?? "";

                    return (
                        <article
                            key={project.objectId}
                            className={`project-grid-row ${imageOnLeft ? "is-left" : "is-right"}`}
                        >
                            <div className="project-grid-image">
                                <Link
                                    to="/projekte/$slug"
                                    params={{ slug }}
                                    className="project-grid-media-link"
                                >
                                    <ProjectCard
                                        project={project}
                                        parallax
                                    />
                                </Link>
                            </div>
                            <div className="project-grid-info">
                                <AnimateContent
                                    viewport={0.2}
                                    className="project-grid-info-inner"
                                >
                                    {year ? (
                                        <p className="project-grid-year">
                                            {year}
                                        </p>
                                    ) : null}
                                    <h2 className="project-grid-title">
                                        <Link
                                            to="/projekte/$slug"
                                            params={{ slug }}
                                        >
                                            {project.title}
                                        </Link>
                                    </h2>
                                    <Link
                                        to="/projekte/$slug"
                                        params={{ slug }}
                                        className="project-grid-cta"
                                    >
                                        <span>Mehr Informationen</span>
                                        <ArrowUpRight size={12} />
                                    </Link>
                                </AnimateContent>
                            </div>
                        </article>
                    );
                })}
        </div>
    );
};

export default ProjectGrid;
