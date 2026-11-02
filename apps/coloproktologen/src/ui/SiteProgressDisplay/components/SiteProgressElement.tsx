import React from "react";
import { siteProgressElementContainer } from "../styles";
import settings from "@settings";
import { SiteProgressElementProps } from "../types";

const SiteProgressElement: React.FC<SiteProgressElementProps> = ({
  isActive,
  number,
}) => {
  return (
    <div
      css={[
        siteProgressElementContainer,
        {
          backgroundColor: isActive
            ? settings.colors.primary
            : settings.colors.lightgrey,
          color: isActive ? settings.colors.white : settings.colors.darkgrey,
        },
      ]}
    >
      {number}
    </div>
  );
};

export default SiteProgressElement;
