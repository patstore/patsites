import { EventClass } from '@data'
import { useMemo } from 'react'
import styles from '../Course.module.css'

const NexDate = ({ start, end }: { start: Date, end: Date }) => {
    return (
        <div className={styles.nex_date}>
            <div>
                <div className="eyebrow">
                    Nächster Termin
                </div>
                <p>{start.toLocaleDateString()} - {end.toLocaleDateString()}</p>
            </div>
            <div>
                <a href="#anmeldung">
                    <button>
                        Zur Anmeldung
                    </button>
                </a>
            </div>
        </div>
    )
}

const CourseHeader = ({ course }: { course: EventClass }) => {

    const nexDate = useMemo(() => {
        const upcomingDates = course.dates?.filter((date) => new Date(date.start) > new Date()) || []
        return upcomingDates.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0]
    }, [course.dates])

    console.log(nexDate)

  return (
    <header className={"hero"}>
      <div className="content flex column al-ce gap-md">
        <p className={"eyebrow"}>Kurs</p>
        <h1>{course.title || "Kurs"}</h1>
        <p className={"lead"}>{course.description || "Kurs"}</p>
        <div className="flex gap-md">
            <a href="/#info">
                <button>
                    Mehr über den Kurs
                </button>
            </a>
            <a href="#anmeldung">
                <button>
                    zur Anmeldung
                </button>
            </a>
        </div>
            {nexDate && <NexDate start={new Date(nexDate.start)} end={new Date(nexDate.end)} />}
      </div>
    </header>
  )
}

export default CourseHeader