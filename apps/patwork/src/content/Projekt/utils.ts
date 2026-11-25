import type { ArticleClass } from "@data";

export const PROJECTS_CATEGORY_ID = "gqVk59EGuh";

export function getProjectArticles(articles: ArticleClass[]): ArticleClass[] {
    return articles.filter((project) =>
        project.categories?.includes(PROJECTS_CATEGORY_ID)
    );
}

export function findProjectBySlug(
    articles: ArticleClass[],
    slug: string
): ArticleClass | undefined {
    return getProjectArticles(articles).find(
        (project) => project.slug === slug
    );
}

function projectDateValue(date?: string | null) {
    const value = new Date(date || "").getTime();
    return Number.isNaN(value) ? 0 : value;
}

export function getProjectsByDate(articles: ArticleClass[]): ArticleClass[] {
    return [...getProjectArticles(articles)].sort(
        (a, b) => projectDateValue(b.date) - projectDateValue(a.date)
    );
}

export function getNextProject(
    articles: ArticleClass[],
    current: ArticleClass
): ArticleClass | null {
    const projects = getProjectsByDate(articles);
    if (projects.length === 0) return null;
    if (projects.length === 1) {
        return projects[0].objectId === current.objectId ? null : projects[0];
    }

    const currentIndex = projects.findIndex(
        (project) => project.objectId === current.objectId
    );
    if (currentIndex === -1) return projects[0];

    return projects[(currentIndex + 1) % projects.length];
}

export function stripHtml(value?: string | null): string {
    if (!value) return "";
    return value
        .replace(/<[^>]*>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function getProjektSeoFields(project: ArticleClass) {
    const title = project.title || "Projekt";
    const slug = project.slug ?? "";
    const description =
        stripHtml(project.description) ||
        stripHtml(project.text) ||
        `${title} – Webprojekt von patwork.`;

    return {
        title,
        seoTitle: `${title} | patwork`,
        description,
        slug,
        path: `/projekte/${slug}`,
        keywords: `${title}, Projekt, Webdesign, Webentwicklung, patwork`
    };
}
