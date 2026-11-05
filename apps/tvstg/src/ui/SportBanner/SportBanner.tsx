import settings from "@settings";
import React from "react";
import { FullButton } from "../Button";
import { useNavigate } from "@tanstack/react-router";
import { sportBannerContainer } from "./styles";

const SPORT_AREAS = [
  { text: "Ballsport", fachbereich: "ballsport" },
  { text: "Gesundheitssport", fachbereich: "gesundheitssport" },
  { text: "Tanz und Rope Skipping", fachbereich: "tanz-und-rope-skipping" },
  { text: "Turnen", fachbereich: "turnen" },
  { text: "Leichtathletik", fachbereich: "leichtathletik" },
];

const SportBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
  <div css={sportBannerContainer}>
    <div css={settings.mq({ flex: 1 })}>
      <h2
        css={{
          color: `${settings.colors.light} !important`,
          fontSize: "3em",
          textTransform: "uppercase",
          textAlign: "left",
        }}
      >
        Finde jetzt Deine nächste Sportart!
      </h2>
    </div>
    <div
      css={settings.mq({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1em",
        flexWrap: "wrap",
        paddingLeft: [0, "1em", "2em", "3em", "4em"],
      })}
    >
      {SPORT_AREAS.map(({ text, fachbereich }) => (
        <FullButton
          key={fachbereich}
          color="white"
          text={text}
          onClick={() =>
            navigate({ to: "/sportarten/$fachbereich", params: { fachbereich } })
          }
        />
      ))}
    </div>
  </div>
  );
};

export default SportBanner;
