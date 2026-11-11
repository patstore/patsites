import type { PatstoreWebpage, WebpageBlock } from "@types";
import { useFindImages, useFindWebpage } from "@provider";
import styles from "./PageContent.module.css";

type CmsBodyProps = {
  page?: PatstoreWebpage | null;
  path?: string | string[];
};

const isActive = (block: WebpageBlock) => block.active !== false;

const CmsBody = ({ page, path }: CmsBodyProps) => {
  const found = useFindWebpage({ path });
  const current = page ?? found;
  const { findImageUrl } = useFindImages();
  const blocks = (current?.content ?? []).filter(isActive);

  if (!current) {
    return null;
  }

  if (blocks.length === 0) {
    if (!current.text && !current.subtitle) {
      return null;
    }
    return (
      <div className={styles.body}>
        {current.subtitle ? <p>{current.subtitle}</p> : null}
        {current.text ? <div dangerouslySetInnerHTML={{ __html: current.text }} /> : null}
      </div>
    );
  }

  return (
    <div className={styles.body}>
      {current.subtitle ? <p>{current.subtitle}</p> : null}
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.type}-${index}`;
        if (block.type === "text" && block.value) {
          return <div key={key} dangerouslySetInnerHTML={{ __html: block.value }} />;
        }
        if (block.type === "image" && block.value) {
          const src = findImageUrl(block.value);
          if (!src) {
            return null;
          }
          return (
            <figure key={key} className={styles.figure}>
              <img src={src} alt={block.name ?? ""} />
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CmsBody;
