import { useState, type FC } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "motion/react";
import styles from "./ExtendedButton.module.css";

type ExtendedButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const ExtendedButton: FC<ExtendedButtonProps> = ({ text, onClick, disabled = false }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={styles.button}
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
      type="button"
    >
      <div className={styles.content}>
        <span>{text}</span>
        <AiOutlineArrowRight height="30px" width="30px" />
      </div>
      {!disabled && (
        <motion.div
          className={styles.underline}
          animate={{ width: hover ? "100%" : "0" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}
      <div className={styles.track} />
    </button>
  );
};

export default ExtendedButton;
