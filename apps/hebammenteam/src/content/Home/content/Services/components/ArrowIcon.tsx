import styles from "../Services.module.css";

const ArrowIcon = ({ direction = "right" }: { direction?: "left" | "right" }) => (
  <svg
    className={direction === "left" ? `${styles.icon} ${styles.iconLeft}` : styles.icon}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M9 5l7 7-7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
