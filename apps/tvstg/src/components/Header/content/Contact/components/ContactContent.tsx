import React from "react";
import { contentContainer, iconsContainer } from "../styles";

import { CiMail } from "react-icons/ci";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import ContactForm from "./ContactForm";
import { Divider } from "@ui";

const ContactContent = () => {
  return (
    <div css={contentContainer}>
      <h3>Kontaktinformationen</h3>
      <div css={iconsContainer}>
        <HiOutlineDevicePhoneMobile />
        <a href="tel:+4976646139944">07664 61399-44</a>
      </div>
      <div css={iconsContainer}>
        <CiMail />
        <a href="mail:info@saaman.de">info@saaman.de</a>
      </div>
      <Divider />
      <ContactForm />
    </div>
  );
};

export default ContactContent;
