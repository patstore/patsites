import { contentBlockStyles } from "../ContentBlock";
import { Divider } from "../Divider";
import ganter from "./images/ganter.png";
import sparkasse from "./images/sparkasse.jpg";
import styles from "./Sponsors.module.css";

const Sponsors = () => (
  <div className={`${contentBlockStyles.block} ${styles.sponsors}`}>
    <div className="section-header">Unsere Sponsoren</div>
    <Divider />
    <div className={styles.logos}>
      <img alt="Ganter Brauerei" src={ganter} height={100} loading="lazy" className={styles.logo} />
      <img alt="Sparkasse" src={sparkasse} height={80} loading="lazy" className={styles.logo} />
    </div>
  </div>
);

export default Sponsors;
