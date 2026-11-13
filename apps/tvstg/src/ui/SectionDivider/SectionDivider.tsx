import styles from "./SectionDivider.module.css";

const SectionDivider = ({ title, subTitle }: { title: string; subTitle?: string }) => (
  <div className={styles.section}>
    <div className={styles.heading}>
      <h2 className={subTitle ? `${styles.title} ${styles.split}` : styles.title}>{title}</h2>
      {subTitle && <h3 className={styles.subtitle}>{subTitle}</h3>}
    </div>
    <div className={styles.rule} />
  </div>
);

export default SectionDivider;
