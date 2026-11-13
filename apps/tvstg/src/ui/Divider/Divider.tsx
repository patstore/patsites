import styles from "./Divider.module.css";

const Divider = ({ showLine = false }: { showLine?: boolean }) => {
  return <div className={showLine ? `${styles.divider} ${styles.line}` : styles.divider} />;
};

export default Divider;
