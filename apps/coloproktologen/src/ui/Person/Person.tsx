import { AppImage } from "@ui";
import React from "react";
import { PersonProps } from "./types";
import { personContainer, personImage } from "./styles";
import { useFindImages } from "@provider";
import { FlexBox } from "../FlexBox";
import { IoIosMail } from "react-icons/io";

const Person: React.FC<PersonProps> = ({ img, name, info, email }) => {
  const { findImage } = useFindImages();

  return (
    <div css={personContainer}>
      {img && (
        <AppImage src={findImage(img)} alt={name} css={personImage} />
      )}
      <h4>{name}</h4>
      {info && <p>{info}</p>}
      {email && (
        <FlexBox direction="row" justify="flex-start" align="center" gap="6px">
          <a css={{ verticalAlign: "middle" }} href={`mailto:${email}`}>
            <IoIosMail
              size={21}
              style={{
                verticalAlign: "middle",
                marginRight: "6px",
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
