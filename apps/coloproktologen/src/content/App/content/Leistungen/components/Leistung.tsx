import { Button, SlideIn } from "@ui";
import React, { useState } from "react";
import { infoContainer } from "../styles";
import { LeistungProps } from "../types";
import settings from "@settings";

const Leistung: React.FC<LeistungProps> = ({
  title,
  subtitle,
  description,
  content,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        css={[
          infoContainer,
          {
            borderTop:
              index === 0 ? `0.6px solid ${settings.colors.grey}` : "none",
          },
        ]}
      >
        <h3>{title}</h3>
        {subtitle && <h4>{subtitle}</h4>}
        <p>{description}</p>
        <Button
          text="Mehr erfahren"
          onClick={() => setIsOpen(true)}
          color="white"
        />
      </div>
      <SlideIn open={isOpen} cancelButtonHandler={() => setIsOpen(false)}>
        {content}
      </SlideIn>
    </>
  );
};

export default Leistung;
