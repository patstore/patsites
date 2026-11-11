import styles from "../Services.module.css";
import ArrowIcon from "./ArrowIcon";

type SliderControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

const SliderControls = ({ onPrev, onNext, canPrev, canNext }: SliderControlsProps) => (
  <div className={styles.arrows}>
    <button
      type="button"
      className={styles.arrow}
      onClick={onPrev}
      disabled={!canPrev}
      aria-label="Vorherige Leistung"
    >
      <ArrowIcon direction="left" />
    </button>
    <button
      type="button"
      className={styles.arrow}
      onClick={onNext}
      disabled={!canNext}
      aria-label="Nächste Leistung"
    >
      <ArrowIcon />
    </button>
  </div>
);

export default SliderControls;
