import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { sidebarHeader } from "../styles";

const Follow = () => (
  <div>
    <div css={sidebarHeader}>Folge uns jetzt!</div>
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.2rem",
        marginBottom: "2.4rem",
      }}
    >
      <a
        href="https://www.facebook.com/tvstg"
        target="_blank"
        css={{ fontSize: "16px" }}
        rel="noreferrer"
      >
        <AiOutlineFacebook size={24} />{" "}
      </a>
      <a
        href="https://www.instagram.com/tvfrstg/"
        target="_blank"
        css={{ fontSize: "16px" }}
        rel="noreferrer"
      >
        <AiOutlineInstagram size={24} />{" "}
      </a>
      {/* <a css={{fontSize: '2em', display:'none'}}><GiSmartphone /> </a> */}
    </div>
  </div>
);

export default Follow;
