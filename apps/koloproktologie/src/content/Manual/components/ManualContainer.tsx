import React from "react";
import { manualContainer } from "../styles";
import { Button } from "@ui";

const ManualContainer: React.FC<{ type: "one" | "two" }> = ({ type }) => {
    if (type === "one") {
        return (
            <div css={manualContainer}>
                <h3>Manual der Koloproktologie - Band 1</h3>
                <p>
                    In Band 1 finden Sie aktuelles und praxisorientiertes Wissen
                    zu den Grundlagen, Hämorrhoidalleiden, Analfissur, Abszess
                    und Analfistel, proktologische Dermatologie, HPV + AIN, Akne
                    inversa, Sinus pilonidalis, anale Inkontinenz,
                    Entleerungsstörungen, Proktitis, sowie spezielle
                    Sondersituationen wie Schwangerschaft, Kinder-Proktologie,
                    Urologie und Gynäkologie in der Koloproktologie. Alle
                    sonstigen Erkrankungen der Koloproktologie finden Sie in
                    Band 2.
                </p>
                <Button
                    text="Band 1 herunterladen"
                    externalLink="https://www.degruyterbrill.com/document/doi/10.1515/9783111331270/html"
                />
            </div>
        );
    } else {
        return (
            <div css={manualContainer}>
                <h3>Manual der Koloproktologie - Band 2</h3>
                <p>
                    In Band 2 finden Sie aktuelles und praxisorientiertes Wissen
                    zu Rektumprolaps, Divertikelerkrankung, Chronische
                    Obstipation, Reizdarmsyndrom, Colitis ulcerosa, Morbus
                    Crohn, Kolon-Karzinom, Analkarzinom, Rektumkarzinom,
                    Hereditäre Kolorektale Karzinome, Seltene intestinale
                    Tumoren, Peritonealkarzinose, Polypenmanagement, Stoma,
                    perioperatives und postoperatives Management, Appendizitis,
                    Mesenteriale Ischämie, Kurzdarmsyndrom und abdominelle
                    Fisteln. Alle sonstigen Erkrankungen der Koloproktologie
                    finden Sie in Band 1.
                </p>
                <Button
                    text="Band 2 herunterladen"
                    externalLink="https://www.degruyterbrill.com/document/doi/10.1515/9783111253237/html"
                />
            </div>
        );
    }
};

export default ManualContainer;
