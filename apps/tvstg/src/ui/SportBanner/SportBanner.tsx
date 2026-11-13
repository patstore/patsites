import { useNavigate } from "@tanstack/react-router";
import { FullButton } from "../Button";
import styles from "./SportBanner.module.css";

const SPORT_AREAS = [
  { text: "Ballsport", fachbereich: "ballsport" },
  { text: "Gesundheitssport", fachbereich: "gesundheitssport" },
  { text: "Tanz und Rope Skipping", fachbereich: "tanz-und-rope-skipping" },
  { text: "Turnen", fachbereich: "turnen" },
  { text: "Leichtathletik", fachbereich: "leichtathletik" },
];

const SportBanner = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.banner}>
      <div className={styles.copy}>
        <h2 className={styles.title}>Finde jetzt Deine nächste Sportart!</h2>
      </div>
      <div className={styles.actions}>
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
