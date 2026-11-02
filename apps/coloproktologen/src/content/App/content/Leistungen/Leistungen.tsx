import { memberContainer } from "@styles";
import { ContentContainer } from "@ui";
import React from "react";
import leistungen from "./constants/leistungen";
import Leistung from "./components/Leistung";

const Leistungen: React.FC = () => {
  return (
    <ContentContainer>
      <div css={memberContainer}>
        <div>
          <h1>Leistungen</h1>
          <p>Hier finden Sie alle Informationen zu den Leistungen des BCD.</p>
        </div>
        <div>
          {leistungen.map((newsItem: any, index: number) => (
            <Leistung
              key={newsItem.objectId}
              title={newsItem.title}
              subtitle={newsItem.subtitle}
              description={newsItem.description}
              content={newsItem.content}
              index={index}
            />
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default Leistungen;
