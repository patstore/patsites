import settings from "@settings";
import React from "react";
import { logoContainer, sponsorsContainer } from "./styles";
import { Divider } from "../Divider";
import ganter from "./images/ganter.png";
import sparkasse from "./images/sparkasse.jpg";

const Sponsors: React.FC = () => (
  <div css={sponsorsContainer}>
    <div css={settings.mq({ flex: 1 })}>
      <h2 css={{ marginTop: "0 !important" }}>Unsere Sponsoren</h2>
    </div>
    <Divider />
    <div css={logoContainer}>
      <img alt="Ganter Brauerei" src={ganter} height={100} loading="lazy" css={{ width: "auto" }} />
      <img alt="Sparkasse" src={sparkasse} height={80} loading="lazy" css={{ width: "auto" }} />
    </div>
  </div>
);

export default Sponsors;
