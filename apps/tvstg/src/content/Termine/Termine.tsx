import React, { useEffect, useMemo } from "react";
import { termineContainer } from "./styles";
import { getBerlinDateParts, useCollection } from "@provider";
import { Layout } from "@components";
import { FlexBox, HeadContent, SwitchButton } from "@ui";
import { siteContainer, wrapper } from "@styles";
import months from "./constants/months";
import MonthTable from "./components/MonthTable";
import settings from "@settings";

type TermineProps = {
  jahr: number;
  /** Current year in Berlin, as determined by the loader. */
  currentYear: number;
  onYearChange: (jahr: number) => void;
};

const Termine: React.FC<TermineProps> = ({ jahr, currentYear, onYearChange }) => {
  const { items: calendar } = useCollection("Appointment");

  const switchButtons = useMemo(
    () =>
      [currentYear - 1, currentYear, currentYear + 1].map((value) => ({
        value,
        label: value.toString(),
      })),
    [currentYear],
  );
  const activeYear = { value: jahr, label: jahr.toString() };

  const monthArray = useMemo(() => {
    const monthBuckets = months.map((month) => ({ ...month, dates: [...month.dates] }));
    calendar.forEach((termin) => {
      if (!termin.date?.start) {
        return;
      }
      const { year, month } = getBerlinDateParts(termin.date.start);
      if (year === jahr) {
        monthBuckets[month - 1].dates.push(termin);
      }
    });
    return monthBuckets;
  }, [calendar, jahr]);

  useEffect(() => {
    if (jahr !== currentYear) {
      return;
    }
    const { month } = getBerlinDateParts(Date.now());
    document.getElementById(`month-${month}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [jahr, currentYear]);

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          titel="Termine"
          titeltext="Was steht an? Kommende Termine und Veranstaltungen unseres Vereins und der Abteilungen siehst Du hier."
          centerHeader
        />
        <div css={siteContainer}>
          <FlexBox
            direction="column"
            align="center"
            justify="center"
            styles={{ padding: ["0 2em", "0 2em", "0 2em", "0 2em", 0] }}
          >
            <FlexBox
              direction="row"
              align="center"
              justify="center"
              wrap
              styles={{
                marginTop: "2rem",
                backgroundColor: settings.colors.light,
                borderRadius: settings.sizes.medium,
                padding: settings.padding.small,
              }}
            >
              {switchButtons.map((button) => (
                <SwitchButton
                  key={button.value}
                  state={activeYear}
                  initialState={button}
                  text={button.label}
                  onClick={() => onYearChange(button.value)}
                />
              ))}
            </FlexBox>
          </FlexBox>
        </div>
        <div css={[siteContainer, { flexDirection: "column", width: "100%" }]}>
          <FlexBox direction="column" align="center" justify="space-between">
            <div css={termineContainer}>
              {monthArray.map((month) => (
                <div
                  css={{ width: "100%" }}
                  key={month.number}
                  id={`month-${month.number}`}
                >
                  <MonthTable month={month} year={jahr} />
                </div>
              ))}
            </div>
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};

export default Termine;
