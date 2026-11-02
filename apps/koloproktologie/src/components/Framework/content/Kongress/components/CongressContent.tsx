import { Button, FlexBox, AppImage } from "@ui";
import React from "react";
import { KongressContentProps } from "../types";
import { useGetImages } from "@provider";

const CongressContent: React.FC<KongressContentProps> = ({
    title,
    image,
    link,
    showVideoPage
}) => {
    const { findImageUrl } = useGetImages();
    return (
        <FlexBox
            direction="column"
            align="center"
            justify="flex-start"
            gap={"12px"}
            styles={{ height: "auto", flex: "1 2 80%", width: "100%" }}
        >
            <h4 css={{ textAlign: "center" }}>{title}</h4>
            {image && (
                <AppImage
                    src={findImageUrl(image)}
                    alt="Kongress"
                    css={{ maxHeight: "180px" }}
                    style={{ height: "100%", objectFit: "contain" }}
                />
            )}
            {showVideoPage ? (
                <Button
                    size="medium"
                    text="Vorträge On Demand 2026"
                    internalLink={"/aktivitaeten/kongress/videos"}
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
