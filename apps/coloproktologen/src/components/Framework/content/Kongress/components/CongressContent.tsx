import { AppImage, Button, FlexBox } from "@ui";
import React from "react";
import { KongressContentProps } from "../types";
import { useFindImages } from "@provider";
const CongressContent: React.FC<KongressContentProps> = ({
    title,
    image,
    link,
    showVideoPage
}) => {
    const { findImage } = useFindImages();

    return (
        <FlexBox
            direction="column"
            align="center"
            justify="flex-start"
            gap={"12px"}
            styles={{ height: "auto", flex: "1 2 80%", width: "100%" }}
        >
            <h4 css={{ textAlign: "center" }}>{title}</h4>
            {findImage(image) && (
                <AppImage
                    src={findImage(image)}
                    alt="Kongress"
                    css={{ height: "210px", width: "100%", objectFit: "contain" }}
                    objectFit="contain"
                />
            )}
            {showVideoPage ? (
                <Button
                    size="medium"
                    text="Vorträge On Demand 2026"
                    externalLink={"https://koloproktologie.org/aktivitaeten/kongress/videos"}
                />
            ) : (
                link && (
                    <Button
                        size="medium"
                        text="Zum Kongress"
                        externalLink={link}
                    />
                )
            )}
        </FlexBox>
    );
};

export default CongressContent;
