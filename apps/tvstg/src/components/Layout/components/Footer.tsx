import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { getBerlinDateParts } from "@provider";
import { Button, FlexBox } from "@ui";
import { RenderContent } from "../../RenderContent";
import logo from "../images/logo_neu_rot_klein.png";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className="site-container">
        <FlexBox style={{ width: "100%", padding: 0 }}>
          <div className={styles.top}>
            <div>
              <h6>Anschrift</h6>
              <RenderContent contentId="footer_address" />
            </div>
            <div>
              <h6>Kontakt</h6>
              <RenderContent contentId="footer_contact" />
            </div>
            <div className={styles.contactAction}>
              <Button
                text="zum Kontaktformular"
                onClick={() => navigate({ to: "/kontakt" })}
              />
            </div>
          </div>
        </FlexBox>
      </div>
      <footer className={styles.footer}>
        <div className="site-container">
          <FlexBox style={{ marginTop: 0, padding: "0" }}>
            <FlexBox
              direction="row"
              justify="space-between"
              wrap
              style={{
                width: "100%",
                padding: "1.2rem 0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className={styles.links}>
                <p>TV Freiburg St. Georgen © {getBerlinDateParts(Date.now()).year}</p>
                <Link to="/datenschutzerklaerung">Datenschutzerklärung</Link>
                <p className={styles.sep}>|</p>
                <Link to="/impressum">Impressum</Link>
                <p className={styles.sep}>|</p>
                <Link to="/kontakt">Kontakt</Link>
              </div>

              <div className={styles.logoWrap}>
                <img
                  src={logo}
                  alt="TV Freiburg St. Georgen von 1897 e.V."
                  className={styles.logo}
                />
              </div>
            </FlexBox>
          </FlexBox>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
