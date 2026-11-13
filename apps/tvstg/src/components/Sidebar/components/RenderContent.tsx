import React, { Fragment } from "react";
import { RenderContentProps } from "../types";

const RenderContent: React.FC<RenderContentProps> = ({ content }) =>
  content.map((contentElement) => (
    <Fragment key={contentElement.id}>
      <div className="section-header flush">{contentElement.header}</div>
      <div>{contentElement.content}</div>
    </Fragment>
  ));

export default RenderContent;
