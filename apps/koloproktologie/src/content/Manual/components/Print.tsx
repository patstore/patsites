import settings from "@settings";
import { Button, FlexBox } from "@ui";
import React from "react";

const Print: React.FC = () => {
    return (
        <FlexBox
            direction="row"
            align="center"
            gap={settings.sizes.medium}
            changeToColumn
        >
            <div>
                <h2>Printausgabe</h2>
                <p>
                    Die beiden Bände sind auch in einer gebundenen Ausgabe u. a.
                    beim publizierenden Verlag de Gruyter erhältlich. Dort
                    stehen beide Bände auch komplett und kostenfrei als EPUB und
                    im PDF-Format zum Download bereit, um im Sinne von Open
                    Access jedermann Zugang zu wissenschaftlicher Literatur zu
                    ermöglichen.
                </p>
                <Button
                    text="Zum Verlag De Gruyter"
                    background={settings.colors.primary}
                    color={settings.colors.white}
                    externalLink="https://www.degruyterbrill.com/document/doi/10.1515/9783111331270/html"
                />
            </div>
            <div>
                <img
                    css={{ width: "240px" }}
                    src={"/manual_print.jpeg"}
                    alt="Manual der Koloproktologie Printausgabe"
                />
            </div>
        </FlexBox>
    );
};

export default Print;
