import { useNavigate } from "@tanstack/react-router";
import { FC } from "react";
import { HeadContentProps } from "./types";
import { FlexBox } from "../FlexBox";
import { Button } from "../Button";
import styles from "./HeadContent.module.css";

const join = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

const HeadContent: FC<HeadContentProps> = ({
  titel,
  titeltext,
  site = "other",
  centerHeader = false,
  smallContent = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className={join(styles.header, smallContent && styles.narrow, centerHeader && styles.centered)}>
      <FlexBox
        direction="row"
        align="flex-end"
        changeToColumn
        hasFullWidth
        styles={{ position: "relative", height: "100%" }}
      >
        {site !== "start" && (
          <FlexBox
            direction="column"
            align={centerHeader ? "center" : "flex-start"}
            justify="flex-end"
            className={styles.headline}
          >
            <h1>{titel}</h1>
            <div className={join(styles.sub, centerHeader && styles.subCenter)}>{titeltext}</div>
          </FlexBox>
        )}
        {site === "start" && (
          <FlexBox
            direction="column"
            align="flex-start"
            justify="flex-end"
            className={styles.startCopy}
          >
            <h1 className={styles.startTitle}>{titel}</h1>
            <Button
              color="primary"
              text="jetzt Mitglied werden"
              onClick={() => navigate({ to: "/mitgliedschaft" })}
            />
          </FlexBox>
        )}
      </FlexBox>
    </div>
  );
};

export default HeadContent;
