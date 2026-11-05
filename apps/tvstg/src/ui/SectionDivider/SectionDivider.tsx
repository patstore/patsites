import settings from "@settings";
import React from "react";

const SectionDivider = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => (
  <div css={{ margin: "4.2rem 0 1.8rem 0" }}>
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <h2
        css={settings.mq({
          margin: 0,
          flex: "1 0 auto",
          maxWidth: ["100%", "100%", "100%", !subTitle ? "100%" : "50%"],
        })}
      >
        {" "}
        {title}
      </h2>
      {subTitle && (
        <h3
          css={settings.mq({
            display: ["none", "none", "none", "inline-block"],
          })}
        >
          {subTitle}
        </h3>
      )}
    </div>
    <div
      css={settings.mq({
        height: "1px",
        backgroundColor: settings.colors.lightgrey,
        width: "100%",
      })}
    />
  </div>
);

export default SectionDivider;
