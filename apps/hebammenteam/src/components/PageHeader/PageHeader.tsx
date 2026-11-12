import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

const PageHeader = ({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) => (
  <header className="hero">
    <div className={`${styles.inner} content flex column al-ce gap-md`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className={styles.title}>
        {title}
        <img
          className={styles.flower}
          src="/logo_coming_home.webp"
          alt=""
          width={36}
          height={36}
        />
      </h1>
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </div>
  </header>
);

export default PageHeader;
