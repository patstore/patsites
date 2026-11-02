import React from "react";
import { PersonProps } from "./types";
import { personContainer, personImage } from "./styles";
import { useGetImages } from "@provider";
import { AppImage } from "../AppImage";
import { FlexBox } from "../FlexBox";
import { IoIosMail } from "react-icons/io";

const Person: React.FC<PersonProps> = ({ img, name, info, email, spacingAfterTitle = false }) => {
    const { findImageUrl } = useGetImages();

    return (
        <div css={personContainer}>
            {img && (
                <AppImage
                    src={findImageUrl(img)}
                    alt={name}
                    css={personImage}
                />
            )}
            <h4 css={{ marginBottom: "0 !important" }}>{name}</h4>
            {info && <p style={{ marginTop: spacingAfterTitle ? "10px" : "0" }}>{info}</p>}
            {email && (
                <FlexBox
                    direction="row"
                    justify="flex-start"
                    align="center"
                    gap="6px"
                >
                    <a
                        css={{ verticalAlign: "middle" }}
                        href={`mailto:${email}`}
                    >
                        <IoIosMail
                            size={21}
                            style={{
                                verticalAlign: "middle",
                                marginRight: "6px"
                            }}
                        />
                        {email}
                    </a>
                </FlexBox>
            )}
        </div>
    );
};

export default Person;
