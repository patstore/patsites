import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FlexBox } from "@ui";
import styles from "./Follow.module.css";

const Follow = () => (
  <div className="sidebar-panel">
    <div className="section-header flush">Folge uns jetzt!</div>
    <div className="sidebar-block">
      <FlexBox direction="row" align="center" justify="center" gap="12px">
        <a
          href="https://www.facebook.com/tvstg"
          target="_blank"
          className={styles.social}
          rel="noreferrer"
        >
          <AiOutlineFacebook size={36} />{" "}
        </a>
        <a
          href="https://www.instagram.com/tvfrstg/"
          target="_blank"
          className={styles.social}
          rel="noreferrer"
        >
          <AiOutlineInstagram size={36} />{" "}
        </a>
      </FlexBox>
    </div>
  </div>
);

export default Follow;
