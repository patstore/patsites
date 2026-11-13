import React, { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getDateString, slugify, useCollection } from "@provider";
import settings from "@settings";
import {
  appointmentDate,
  appointmentLinkButton,
  appointmentMain,
  appointmentRow,
  appointmentTag,
  appointmentTags,
  appointmentTitle,
  appointmentsList,
  homeAppointmentsHeader,
} from "../styles";
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
    <section css={appointmentsList}>
      <div css={homeAppointmentsHeader}>Kommende Termine</div>
      <div css={{padding: settings.padding.small}}>
        {events.map((termin, index) => {
          const slug = slugify(termin.title ?? termin.objectId ?? "");
          const start = getDateString(termin.date?.start);
          const end =
            termin.date?.end && termin.date.end !== termin.date?.start
              ? getDateString(termin.date.end)
              : null;
          return (
            <Link
              to="/termine"
              hash={slug}
              aria-label={`Termin ${termin.title ?? ""} auf der Termine-Seite anzeigen`}
              css={{textDecoration: "none !important", margin: "0 !important"}}
            >
            <article
              key={termin.objectId}
              css={[
                appointmentRow,
                // index % 2 === 1 ? { backgroundColor: settings.colors.light } : null,
              ]}
            >
              <div css={appointmentDate}>
                <p
                  css={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: "1rem !important",
                    lineHeight: "1.2 !important",
                  }}
                >
                  {start.date}
                </p>
                <p
                  css={{
                    margin: 0,
                    fontSize: "0.75rem !important",
                    color: settings.colors.grey,
                  }}
                >
                  {end ? `${start.time} – ${end.time}` : start.time}
                </p>
              </div>
              <div css={appointmentMain}>
                <h3 css={appointmentTitle}>{termin.title}</h3>
                {termin.categories && termin.categories.length > 0 ? (
                  <div css={appointmentTags}>
                    {termin.categories.map((categoryId) => {
                      const category = findCategory(categoryId);
                      if (!category?.title) {
                        return null;
                      }
                      return (
                        <span key={categoryId} css={appointmentTag}>
                          {category.title}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
             
                <div css={appointmentLinkButton}>
                  <AiOutlineArrowRight size={16} />
                </div>
            </article>
              </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HomeAppointments;
