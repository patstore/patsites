import { Layout } from "@components";
import styles from "./Course.module.css";
import { EventClass } from "@data";
import CourseInfo from "./components/CourseInfo";
import CourseContent from "./components/CourseContent";
import CourseHeader from "./components/CourseHeader";

const Course = ({ course }: { course: EventClass }) => (
  <Layout>
    <CourseHeader course={course} />
    <section className={styles.content}>
      <CourseInfo 
      event={course} 
      />
      <CourseContent text={course.text || ""} event={course} />
    </section>
  </Layout>
);

export default Course;
