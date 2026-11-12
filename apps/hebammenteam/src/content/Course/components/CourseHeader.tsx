import { EventClass } from "@data";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { PageHeader } from "@components";
import { courseSlug } from "@provider";
import styles from "../Course.module.css";

const NexDate = ({ start, end, kursId }: { start: Date; end: Date; kursId: string }) => {
    return (
        <div className={styles.nex_date}>
            <div>
                <div className="eyebrow">
                    Nächster Termin
                </div>
                <p>{start.toLocaleDateString()} - {end.toLocaleDateString()}</p>
            </div>
            <div>
                <Link to="/kurse/$kurs_id" params={{ kurs_id: kursId }} hash="anmeldung">
                    <button type="button">Zur Anmeldung</button>
                </Link>
            </div>
        </div>
    )
}

const CourseHeader = ({ course }: { course: EventClass }) => {
    const kursId = courseSlug(course.path) ?? course.slug ?? course.objectId;

    const nexDate = useMemo(() => {
        const upcomingDates = course.dates?.filter((date) => new Date(date.start) > new Date()) || [];
        return upcomingDates.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0];
    }, [course.dates]);

  return (
    <PageHeader
      eyebrow="Kurs"
      title={course.title || "Kurs"}
      lead={course.description || "Kurs"}
    >
      <div className="flex gap-md">
        <Link to="/kurse/$kurs_id" params={{ kurs_id: kursId }} hash="info">
          <button type="button">Mehr über den Kurs</button>
        </Link>
        <Link to="/kurse/$kurs_id" params={{ kurs_id: kursId }} hash="anmeldung">
          <button type="button">Zur Anmeldung</button>
        </Link>
      </div>
      {nexDate ? (
        <NexDate
          start={new Date(nexDate.start)}
          end={new Date(nexDate.end)}
          kursId={kursId}
        />
      ) : null}
    </PageHeader>
  )
}

export default CourseHeader