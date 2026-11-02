import React from "react";
import { FC, useState } from "react";
import {
  buttonContentContainer,
  extendedButtonContainer,
  underline,
  underlineGrey,
} from "./styles";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import settings from "@settings";

type ExtendedButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const ExtendedButton: FC<ExtendedButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      css={extendedButtonContainer}
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
    >
      <div
        css={[
          buttonContentContainer,
          !disabled
            ? { color: hover ? settings.colors.dark : settings.colors.darkgrey }
            : { color: settings.colors.grey },
        ]}
      >
        <span>{text}</span>
        <AiOutlineArrowRight height={"30px"} width={"30px"} />
      </div>
      {!disabled && (
        <motion.div
          css={underline}
          animate={{ width: hover ? "100%" : "0" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}
      <motion.div
        css={underlineGrey}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </button>
  );
};

export default ExtendedButton;
