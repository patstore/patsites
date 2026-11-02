import settings from "@settings";
import React, { useState } from "react";
import { ContentBox, SlideIn } from "@ui";
import { ProjectProps } from "../types";

const Project: React.FC<ProjectProps> = ({ id, title, subtitle, text }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            css={{
                flex: "50%",
                height: "fit-content"
            }}
        >
            <ContentBox
                key={id}
                title={title}
                text={subtitle}
                label="Forschungsprojekt"
                // date={getDateString(news.date).date}
                background={settings.colors.light}
                color={settings.colors.dark}
                buttonBackground={settings.colors.primary}
                buttonText="Mehr erfahren"
                onClick={() => setOpen(true)}
            ></ContentBox>
            <SlideIn
                width="small"
                open={open}
                cancelButtonHandler={() => setOpen(false)}
            >
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </SlideIn>
        </div>
    );
};

export default Project;
