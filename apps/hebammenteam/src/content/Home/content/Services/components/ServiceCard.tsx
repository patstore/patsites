import { useNavigate } from "@tanstack/react-router";
import type { EntryClass, ImageClass, PersonClass } from "@data";
import styles from "../Services.module.css";
import ArrowIcon from "./ArrowIcon";

const portraitSrc = (image: ImageClass | undefined) => {
  if (!image) {
    return null;
  }
  const path = image.thumbnailPath || image.filePath;
  if (path) {
    const encoded = path
      .split("/")
      .filter(Boolean)
      .map((part) => encodeURIComponent(part))
      .join("/");
    return `/data/files/${encoded}`;
  }
  const remote = image.file?.url;
  return remote && /^https?:\/\//i.test(remote) ? remote : null;
};

const plainText = (value: string | null | undefined) =>
  (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const ServiceCard = ({
  service,
  persons,
  images,
}: {
  service: EntryClass;
  persons: PersonClass[];
  images: ImageClass[];
}) => {
  const navigate = useNavigate();
  const title = service.title || "Leistung";
  const text = plainText(service.text);
  const portraits = persons.flatMap((person) => {
    const src = portraitSrc(images.find((image) => image.objectId === person.image));
    if (!src) {
      return [];
    }
    const name = person.label || person.title || "Hebamme";
    return [{ id: person.objectId, src, name }];
  });

  return (
    <article className={styles.card} data-service-card>
      <div className={styles.copy}>
        <h3>{title}</h3>
        {text ? <p className={styles.text}>{text}</p> : null}
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
          aria-label={`${title}: zu den Leistungen`}
          onClick={() => navigate({ to: "/leistungen" })}
        >
          <ArrowIcon />
        </button>
      </div>
    </article>
  );
};

export default ServiceCard;
