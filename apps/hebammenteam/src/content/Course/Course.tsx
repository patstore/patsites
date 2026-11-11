import { Link } from "@tanstack/react-router";
import { CmsBody, Layout } from "@components";
import type { PatstoreWebpage } from "@types";
import styles from "./Course.module.css";

const Course = ({ course }: { course: PatstoreWebpage }) => (
  <Layout>
    <Link to="/kurse" className={styles.back}>
      Alle Kurse
    </Link>
    <header className={styles.header}>
      <h1 className={styles.title}>{course.title || "Kurs"}</h1>
    </header>
    <div className={styles.body}>
      <CmsBody page={course} />
    </div>
  </Layout>
);

export default Course;
