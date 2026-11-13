import { CiMail } from "react-icons/ci";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import ContactForm from "./ContactForm";
import { Divider } from "@ui";
import styles from "../Contact.module.css";

const ContactContent = () => {
  return (
    <div className={styles.content}>
      <h3>Kontaktinformationen</h3>
      <div className={styles.icons}>
        <HiOutlineDevicePhoneMobile />
        <a href="tel:+4976646139944">07664 61399-44</a>
      </div>
      <div className={styles.icons}>
        <CiMail />
        <a href="mail:info@saaman.de">info@saaman.de</a>
      </div>
      <Divider />
      <ContactForm />
    </div>
  );
};

export default ContactContent;
