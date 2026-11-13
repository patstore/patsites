import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getDateString, slugify, useCollection } from "@provider";
import { ContentBlock, contentBlockStyles } from "@ui";

const HomeAppointments: React.FC = () => {
  const { items: appointments } = useCollection("Appointment");
  const { find: findCategory } = useCollection("Category");

  const events = useMemo(() => {
    const now = Date.now();
    return [...appointments]
      .filter(
        (event) => event.date?.start && new Date(event.date.start).getTime() > now,
      )
      .sort(
        (a, b) =>
          new Date(a.date?.start ?? 0).getTime() - new Date(b.date?.start ?? 0).getTime(),
      );
  }, [appointments]);

  if (events.length === 0) {
    return null;
  }

  return (
    <ContentBlock as="section" className={contentBlockStyles.list}>
      <div className="section-header">Kommende Termine</div>
      <div>
        {events.map((termin) => {
          const slug = slugify(termin.title ?? termin.objectId ?? "");
          const start = getDateString(termin.date?.start);
          const end =
            termin.date?.end && termin.date.end !== termin.date?.start
              ? getDateString(termin.date.end)
              : null;
          return (
            <Link
              key={termin.objectId}
              to="/termine"
              hash={slug}
              aria-label={`Termin ${termin.title ?? ""} auf der Termine-Seite anzeigen`}
              className={`${contentBlockStyles.row} ${contentBlockStyles.rowHome}`}
            >
              <div className={contentBlockStyles.date}>
                <p className={contentBlockStyles.strong}>{start.date}</p>
                <p className={contentBlockStyles.muted}>
                  {end ? `${start.time} – ${end.time}` : start.time}
                </p>
              </div>
              <div className={contentBlockStyles.main}>
                <h3 className={contentBlockStyles.title}>{termin.title}</h3>
                {termin.categories && termin.categories.length > 0 ? (
                  <div className={contentBlockStyles.tags}>
                    {termin.categories.map((categoryId) => {
                      const category = findCategory(categoryId);
                      if (!category?.title) {
                        return null;
                      }
                      return (
                        <span key={categoryId} className={contentBlockStyles.tag}>
                          {category.title}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className={contentBlockStyles.arrow}>
                <AiOutlineArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>
    </ContentBlock>
  );
};

export default HomeAppointments;
