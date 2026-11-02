import React from "react";
import { Button, Divider, SlideIn } from "@ui";
import projects from "../constants/projects";
import settings from "@settings";

const summaryStyle = settings.mq({
    width: "fit-content",
    color: settings.colors.white,
    fontSize: settings.fontSize.small,
    cursor: "pointer",
    backgroundColor: settings.colors.primary,
    listStyle: "none",
    padding: settings.padding.small,
    borderRadius: settings.sizes.medium
});

const PreviousProjects: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [openProjectId, setOpenProjectId] = React.useState<string | null>(
        null
    );

    const completedProjects = projects.filter((p) => p.is_completed);

    const handleSummaryClick = (
        e: React.MouseEvent<HTMLElement>,
        id: string
    ) => {
        e.preventDefault();
        setOpenProjectId((current) => (current === id ? null : id));
    };

    return (
        <>
            <Button
                text="Abgeschlossene Forschungsprojekte"
                onClick={() => setOpen(true)}
            />
            <SlideIn
                open={open}
                cancelButtonHandler={() => setOpen(false)}
                width="medium"
            >
                <h2>Abgeschlossene Forschungsprojekte</h2>
                <div>
                    {completedProjects.map((project) => (
                        <div key={project.id}>
                            <h3>{project.title}</h3>
                            <details open={openProjectId === project.id}>
                                <summary
                                    css={summaryStyle}
                                    onClick={(e) =>
                                        handleSummaryClick(e, project.id)
                                    }
                                >
                                    Mehr erfahren
                                </summary>
                                <div
                                    css={{
                                        marginTop: "1rem",
                                        padding: "24px",
                                        backgroundColor: settings.colors.light,
                                        borderRadius: settings.sizes.medium
                                    }}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: project.text
                                        }}
                                    />
                                </div>
                            </details>
                            <Divider showLine />
                        </div>
                    ))}
                </div>
            </SlideIn>
        </>
    );
};

export default PreviousProjects;
