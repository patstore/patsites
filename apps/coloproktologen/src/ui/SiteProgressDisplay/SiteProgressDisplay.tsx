import React, { useMemo } from "react";
import { SiteProgressDisplayProps } from "./types";
import {
  siteProgressDisplayContainer,
  siteProgressElementContainer,
} from "./styles";
import SiteProgressElement from "./components/SiteProgressElement";
import HorizontalLine from "./components/HorizontalLine";

const SiteProgressDisplay: React.FC<SiteProgressDisplayProps> = ({
  siteStates,
  currentState,
}) => {
  const currentIndex = useMemo(
    () => siteStates.findIndex((state) => state.value === currentState.value),
    [currentState],
  );

  return (
    <div css={siteProgressDisplayContainer}>
      {siteStates.map((currentState, index) => {
        return (
          <React.Fragment key={currentState.value}>
            <SiteProgressElement
              isActive={index <= currentIndex}
              number={index + 1}
            />
            {index < siteStates.length - 1 && (
              <HorizontalLine isActive={index <= currentIndex - 1} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SiteProgressDisplay;
