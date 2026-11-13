import React, { useEffect, useMemo, useState } from "react";
import { getBerlinDateParts, useCollection } from "@provider";
import { Layout } from "@components";
import { FlexBox, HeadContent } from "@ui";
import months from "./constants/months";
import MonthTable from "./components/MonthTable";
import MonthFilterBar from "./components/MonthFilterBar";
import type { YearMonth } from "./constants/monthShortLabels";
import styles from "./Termine.module.css";

const Termine: React.FC = () => {
  const { items: calendar } = useCollection("Appointment");

  const berlinNow = useMemo(() => getBerlinDateParts(Date.now()), []);

  const [selectedMonth, setSelectedMonth] = useState<YearMonth>(() => ({
    year: berlinNow.year,
    month: berlinNow.month,
  }));

  const displayedMonth = useMemo(() => {
    const meta = months[selectedMonth.month - 1];
    const dates = calendar.filter((termin) => {
      if (!termin.date?.start) {
        return false;
      }
      const { year, month } = getBerlinDateParts(termin.date.start);
      return year === selectedMonth.year && month === selectedMonth.month;
    });
    return { ...meta, dates };
  }, [calendar, selectedMonth]);

  useEffect(() => {
    document.getElementById(`month-${selectedMonth.month}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedMonth]);

  return (
    <Layout>
      <div className="wrapper">
        <HeadContent
          titel="Termine"
          titeltext="Was steht an? Kommende Termine und Veranstaltungen unseres Vereins und der Abteilungen siehst Du hier."
          centerHeader
        />
        <div className="site-container">
          <FlexBox direction="column" align="center" justify="space-between">
            <MonthFilterBar
              calendar={calendar}
              selected={selectedMonth}
              onSelect={setSelectedMonth}
            />
            <div className={styles.months}>
              <div
                className={styles.month}
                key={`${selectedMonth.year}-${selectedMonth.month}`}
                id={`month-${selectedMonth.month}`}
              >
                <MonthTable month={displayedMonth} year={selectedMonth.year} />
              </div>
            </div>
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};

export default Termine;
