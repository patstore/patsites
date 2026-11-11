import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

const PageHeader = ({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) => (
  <header className="hero">
    <div className={`${styles.inner} content flex column al-ce gap-md`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </div>
  </header>
);

export default PageHeader;
