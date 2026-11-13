import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { sidebarElement, sidebarElementContainer, sidebarElementContent, sidebarElementHeader, sidebarHeader } from "../styles";
import settings from "@settings";
import { sidebarContainer } from "@styles";
import { FlexBox } from "@ui";

const Follow = () => (
  <div css={sidebarElement}>
    <div css={sidebarElementHeader}>Folge uns jetzt!</div>
    <div
      css={sidebarElementContent}
    >
      <FlexBox direction="row" align="center" justify="center" gap={settings.sizes.medium}>
      <a
        href="https://www.facebook.com/tvstg"
        target="_blank"
        css={{ fontSize: "16px" }}
        rel="noreferrer"
      >
        <AiOutlineFacebook size={36} />{" "}
      </a>
      <a
        href="https://www.instagram.com/tvfrstg/"
        target="_blank"
        css={{ fontSize: "16px" }}
        rel="noreferrer"
      >
        <AiOutlineInstagram size={36} />{" "}
      </a>
      </FlexBox>
    </div>
  </div>
);

export default Follow;
