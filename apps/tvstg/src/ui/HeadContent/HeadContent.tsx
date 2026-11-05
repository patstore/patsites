import settings from "@settings";
import { useNavigate } from "@tanstack/react-router";
import { FC } from "react";
import {
  headlineContainer,
  siteHeaderContainer,
  subHeaderContainer,
} from "./styles";
import { HeadContentProps } from "./types";
import { FlexBox } from "../FlexBox";
import { Button } from "../Button";

const HeadContent: FC<HeadContentProps> = ({
  titel,
  titeltext,
  site = "other",
  centerHeader = false,
  smallContent = false,
}) => {
  const navigate = useNavigate();

  return (
  <div
    css={[siteHeaderContainer, { maxWidth: smallContent ? "720px" : "1040px" }]}
  >
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
          styles={headlineContainer}
        >
          <h1>{titel}</h1>
          <div
            css={[
              subHeaderContainer,
              { textAlign: centerHeader ? "center" : "left" },
            ]}
          >
            {titeltext}
          </div>
          {/* {!centerHeader && <Divider />} */}
        </FlexBox>
      )}
      {site === "start" && (
        <>
          <FlexBox
            direction="column"
            align="flex-start"
            justify="flex-end"
            styles={{
              width: ["100%", "100%", "100%", "48%", "48%"],
              zIndex: 5,
            }}
          >
            <h1 css={settings.mq({ marginBottom: "2rem" })}>{titel}</h1>
            <Button
              color="primary"
              text="jetzt Mitglied werden"
              onClick={() => navigate({ to: "/mitgliedschaft" })}
            />
          </FlexBox>
        </>
      )}
    </FlexBox>
  </div>
  );
};

export default HeadContent;
