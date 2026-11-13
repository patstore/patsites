import { Image } from "@repo/ui";
import { FlexBox } from "../FlexBox";
import placeholder from "./images/placeholder_m.png";
import { PatstorePerson } from "@types";
import styles from "./ContactPerson.module.css";

type ContactPersonProps = {
  person: PatstorePerson;
};

const ContactPerson = ({ person }: ContactPersonProps) => {
  const name = person.title || "";

  return (
    <FlexBox align="center" hasFullWidth styles={{ margin: "6px 0" }}>
      <div className={styles.portrait}>
        {person.image ? (
          <Image id={person.image} alt={name} className={styles.photo} style={{ width: 60, height: 60, borderRadius: 4 }} />
        ) : (
          <img src={placeholder} alt={name} width={60} height={60} className={styles.photo} />
        )}
      </div>

      <div>
        <h4>{name}</h4>
        {person.email && <a href={`mailto:${person.email}`}>E-Mail schreiben</a>}
      </div>
    </FlexBox>
  );
};

export default ContactPerson;
