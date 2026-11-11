import { CmsBody, Layout, PageHeader } from "@components";
import { useFindWebpage } from "@provider";
import styles from "./Impressum.module.css";

const Impressum = () => {
  const page = useFindWebpage({ path: "/impressum" });

  return (
    <Layout>
      <PageHeader eyebrow="Rechtliches" title="Impressum" lead="Angaben zu dieser Website." />
      <div className="page-body">
      {page ? (
        <CmsBody page={page} />
      ) : (
        <div className={styles.prose}>
          <h2>Anbieter</h2>
          <p>Die Pflichtangaben zu dieser Website werden über den Seiteninhalt gepflegt.</p>
          <h2>Kontakt</h2>
          <p>Die Erreichbarkeit steht auf der Kontaktseite.</p>
        </div>
      )}
      </div>
    </Layout>
  );
};

export default Impressum;
