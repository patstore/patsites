import settings from "@settings";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { getBerlinDateParts } from "@provider";
import { siteContainer, wrapper } from "@styles";
import { Button, FlexBox, Image } from "@ui";
import { RenderContent } from "../../RenderContent";
import logo from "../images/logo_neu_rot_klein.png";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div css={wrapper}>
      <div css={siteContainer}>
        <FlexBox styles={{ width: "100%", padding: 0 }}>
          <div
            css={settings.mq({
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              borderTop: `1px solid ${settings.colors.grey}`,
              gap: "2em",
              padding: ["2em 2em", "2em 2em", "4em 0", "4em 0"],
            })}
          >
            <div>
              <h6>Anschrift</h6>
              <RenderContent contentId="footer_address" />
            </div>
            <div>
              <h6>Kontakt</h6>
              <RenderContent contentId="footer_contact" />
            </div>
            <div css={{ height: "auto" }}>
              <Button
                text="zum Kontaktformular"
                onClick={() => navigate({ to: "/kontakt" })}
              />
            </div>
          </div>
        </FlexBox>
      </div>
      <footer
        css={{
          borderTop: `1px solid ${settings.colors.grey}`,
          background: settings.colors.lightgrey,
          overflowX: "hidden",
          p: { marginBlockEnd: "0 !important" },
        }}
      >
        <div css={siteContainer}>
          <FlexBox styles={{ marginTop: 0, padding: "0" }}>
            <FlexBox
              direction="row"
              justify="space-between"
              wrap
              styles={{
                width: "100%",
                padding: "1.2rem 0",
                position: "relative",
                p: { margin: "0 0.4em" },
                overflow: "hidden",
              }}
            >
              <div
                css={settings.mq({
                  display: "flex",
                  gap: ["1.2rem", "1.2rem", ".6rem"],
                  flexDirection: ["column", "column", "row", "row", "row"],
                  alignItems: ["flex-start", "flex-start", "center"],
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  position: "relative",
                  padding: settings.padding.medium,
                })}
              >
                <p>TV Freiburg St. Georgen © {getBerlinDateParts(Date.now()).year}</p>
                <Link to="/datenschutzerklaerung">Datenschutzerklärung</Link>
                <p css={settings.mq({ display: ["none", "none", "inline"] })}>
                  |
                </p>
                <Link to="/impressum">Impressum</Link>
                <p css={settings.mq({ display: ["none", "none", "inline"] })}>
                  |
                </p>
                <Link to="/kontakt">Kontakt</Link>
              </div>

              <div
                css={{
                  width: "1.4rem",
                  height: "1.4rem",
                  justifyItems: "flex-end",
                }}
              >
                <Image
                  src={logo}
                  alt="TV Freiburg St. Georgen von 1897 e.V."
                  style={{ width: "100%", height: "100%" }}
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
