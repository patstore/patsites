import React from "react";
import { RenderTextProps } from "../types";

const RenderText: React.FC<RenderTextProps> = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

export default RenderText;
