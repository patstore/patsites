import React from "react";
import styles from "./Label.module.css";

const Label: React.FC<{ text: string; color?: string }> = ({ text, color }) => {
  return (
    <div className={styles.label} style={color ? { ["--label-color" as string]: color } : undefined}>
      {text}
    </div>
  );
};

export default Label;
