import React, { Fragment } from "react";
import { RenderContentProps } from "../types";
import { sidebarHeader } from "../styles";

const RenderContent: React.FC<RenderContentProps> = ({ content }) =>
  content.map((contentElement) => (
    <Fragment key={contentElement.id}>
      <div css={sidebarHeader}>{contentElement.header}</div>
      <div>{contentElement.content}</div>
    </Fragment>
  ));

export default RenderContent;
