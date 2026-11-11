import { CmsBody, Layout, PageHeader } from "@components";
import styles from "./Services.module.css";

const services = [
  {
    title: "Schwangerenvorsorge",
    text: "Regelmäßige Untersuchungen und Beratung während der Schwangerschaft.",
  },
  {
    title: "Geburtsbegleitung",
    text: "Unterstützung vor und während der Geburt, zu Hause oder in der Klinik.",
  },
  {
    title: "Wochenbett",
    text: "Besuche nach der Geburt für Mutter und Kind.",
  },
  {
    title: "Rückbildung",
    text: "Kurse und Hinweise, um nach der Geburt wieder zu Kräften zu kommen.",
  },
  {
    title: "Beratung",
    text: "Stillberatung und Antworten auf Fragen rund um die erste Zeit.",
  },
];

const Services = () => (
  <Layout>
    <PageHeader
      eyebrow="Angebot"
      title="Leistungen"
      lead="Was Sie von der Begleitung erwarten können."
    />
    <div className="page-body">
    <ul className={styles.list}>
      {services.map((service) => (
        <li key={service.title} className={styles.item}>
          <h2>{service.title}</h2>
          <p>{service.text}</p>
        </li>
      ))}
    </ul>
    <div className={styles.cms}>
      <CmsBody path="/leistungen" />
    </div>
    </div>
  </Layout>
);

export default Services;
