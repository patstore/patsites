import type { EventClass } from "@data";
import styles from "../Course.module.css";
import CourseForm from "./CourseForm";

const CourseContent = ({ text, event }: { text: string; event: EventClass }) => {
  return (
    <div className={styles.content_container}>
      <h3>Kursinhalte</h3>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <CourseForm event={event} />
    </div>
  );
};

export default CourseContent