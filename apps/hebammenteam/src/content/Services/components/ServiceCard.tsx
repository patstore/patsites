import styles from "../Services.module.css";
import ArrowIcon from "./ArrowIcon";

export type ServicePortrait = {
  id: string;
  src: string;
  name: string;
};

type ServiceCardProps = {
  id?: string;
  title: string;
  description: string;
  portraits: ServicePortrait[];
  onOpen: () => void;
};

const ServiceCard = ({ id, title, description, portraits, onOpen }: ServiceCardProps) => (
  <article className={styles.card} id={id}>
    <div className={styles.copy}>
      <h2>{title}</h2>
      {description ? <p className={styles.text}>{description}</p> : null}
    </div>
    <div className={styles.cardFooter}>
      {portraits.length > 0 ? (
        <div className={styles.portraits}>
          {portraits.map((portrait) => (
            <img
              key={portrait.id}
              className={styles.portrait}
              src={portrait.src}
              alt={portrait.name}
              width={48}
              height={48}
            />
          ))}
        </div>
      ) : (
        <span />
      )}
      <button
        type="button"
        className={styles.cardArrow}
        aria-label={`${title} öffnen`}
        onClick={onOpen}
      >
        <ArrowIcon />
      </button>
    </div>
  </article>
);

export default ServiceCard;
