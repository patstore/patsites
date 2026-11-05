import React from "react";
import { FlexBox } from "../FlexBox";
import { Image } from "../Image";
import placeholder from "./images/placeholder_m.png";
import { PatstorePerson } from "@types";
import { useFindImages } from "@provider";

type ContactPersonProps = {
  person: PatstorePerson;
};

const ContactPerson: React.FC<ContactPersonProps> = ({ person }) => {
  const { findImage } = useFindImages();

  return (
    <FlexBox align="center" hasFullWidth styles={{ margin: "6px 0" }}>
      <div css={{ marginRight: "1em" }}>
        <Image
          alt={person.title || ""}
          image={person.image ? findImage(person.image) : { src: placeholder }}
          objectPosition="top"
          width={60}
          height={60}
          style={{ borderRadius: "4px" }}
        />
      </div>

      <div>
        <h4>{person.title || ""}</h4>
        {person.email && (
          <a href={`mailto:${person.email}`}>E-Mail schreiben</a>
        )}
      </div>
    </FlexBox>
  );
};

export default ContactPerson;
