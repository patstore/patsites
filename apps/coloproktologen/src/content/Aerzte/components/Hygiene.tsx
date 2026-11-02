import settings from "@settings";
import { ContentContainer } from "@ui";
import React from "react";

const Hygiene: React.FC = () => {
    return (
        <ContentContainer
            id="empfehlungen-zur-hygiene"
            largeBackground={settings.colors.light}
        >
            <h2>Empfehlungen zur Hygiene</h2>
            <p>
                Herausgegeben vom Berufsverband Coloproktologie Deutschland (BCD) und
                der Deutschen Gesellschaft für Koloproktologie (DGK)
            </p>
            <p>
                <a
                    href="https://www.coloproktologen.de/pdf/Hygieneleitfaden_BCD_2024.pdf"
                    title="coloproctology"
                    target="_blank"                   
                    rel="noreferrer"
                >
                    Leitfaden und Empfehlungen für die Hygiene in der Koloproktologie
                    2024.
                </a>{" "}
                <br /> Quelle: coloproctology, 8. April 2024
            </p>
        </ContentContainer>
    );
};

export default Hygiene;
