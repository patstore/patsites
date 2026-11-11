import { Link } from "@tanstack/react-router";
import { CmsBody, Layout, excerpt } from "@components";
import { courseSlug } from "@provider";
import type { PatstoreWebpage } from "@types";
import styles from "./Courses.module.css";

const Courses = ({ courses }: { courses: PatstoreWebpage[] }) => (
  <Layout>
    <header className={styles.header}>
      <h1 className={styles.title}>Kurse</h1>
      <p className={styles.lead}>Geburtsvorbereitung, Rückbildung und weitere Angebote.</p>
    </header>
    <div className={styles.cms}>
      <CmsBody path="/kurse" />
    </div>
    {courses.length === 0 ? (
      <p className={styles.empty}>Kurse erscheinen hier, sobald sie veröffentlicht sind.</p>
    ) : (
      <ul className={styles.list}>
        {courses.map((course) => {
          const slug = courseSlug(course.path) ?? course.objectId;
          const summary = excerpt(course.subtitle || course.text, 180);
          return (
            <li key={course.objectId}>
              <Link to="/kurse/$kurs_id" params={{ kurs_id: slug }} className={styles.card}>
                <h2>{course.title || "Kurs"}</h2>
                {summary ? <p>{summary}</p> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    )}
  </Layout>
);

export default Courses;
