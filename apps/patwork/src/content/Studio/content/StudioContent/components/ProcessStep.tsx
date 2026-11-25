import type { ReactNode } from "react";

const ProcessStep = ({
    number,
    title,
    children
}: {
    number: string;
    title: ReactNode;
    children: ReactNode;
}) => {
    return (
        <div className="studio-process-step section-container-element justify-start w-100">
            <div className="studio-process-label w-33">
                <p className="bold">{number}</p>
                <h3 className="studio-process-title">{title}</h3>
            </div>
            <div className="studio-process-copy w-66">{children}</div>
        </div>
    );
};

export default ProcessStep;
