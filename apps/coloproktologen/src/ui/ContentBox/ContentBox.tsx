import { AppImage } from "@ui";
import { navigate, Link } from "@router";
import React from "react";
import { contentBoxContainer, iconContainer } from "./styles";
import { ContentBoxProps } from "./types";
import Button from "../Button/Button";
import { motion } from "motion/react";
import { useFindImages } from "@provider";
import settings from "@settings";
import { ArrowRight } from "lucide-react";
import { FlexBox } from "../FlexBox";
import { Label } from "../Label";
import { topline } from "@styles";
const ContentBox: React.FC<ContentBoxProps> = ({
  title,
  text,
  link,
  image,
  children,
  label = "",
  date = "",
  background = settings.colors.light,
  color = settings.colors.dark,
  buttonBackground = settings.colors.secondary,
  buttonText = "Download",
  onClick,
  icon,
  alignCenter = false,
  externalLink
}) => {
  const { findImage } = useFindImages();

  const absoluteImagePath = image &&  (image.startsWith("/") || image.startsWith("http"));

  return (
    <motion.div
      css={[
        contentBoxContainer({ background }),
        { cursor: link || onClick ? "pointer" : "default" },
        { paddingTop: image ? "230px" : "24px", paddingBottom: "24px" },
      ]}
    >
      {icon && <div css={iconContainer}>{icon}</div>}
      {image && (
        <AppImage
          css={{
            width: "100%",
            height: "210px",
            marginBottom: "30px",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          src={absoluteImagePath ? image : findImage(image)}
          alt={title}
        />
      )}
      {(label || date) && (
        <FlexBox
          direction="row"
          justify="space-between"
          align="center"
          hasFullWidth
        >
          {label && <div css={[topline, {fontSize: "10px !important", fontWeight: 500, marginBottom: 0}]}>{label}</div>}
          <h5 css={{ color }}>{date}</h5>
        </FlexBox>
      )}
      <h4 css={{ color, textAlign: alignCenter ? "center" : "left" }}>
        {title}
      </h4>
      <div>
        <p css={{ color, textAlign: alignCenter ? "center" : "left" }}>{text}</p>
      </div>
      {children && <div>{children}</div>}
      <div css={{ marginTop: "12px" }}></div>
      <FlexBox
        direction="row"
        justify={alignCenter ? "center" : "flex-start"}
        align="center"
      >
        {link && (
          <Link to={link} css={{ textDecoration: "none !important" }}>
            <Button background={buttonBackground} text={buttonText}>
              {<ArrowRight size={12} />}
            </Button>
          </Link>
        )}
        {(onClick || externalLink) && (
          <Button
            background={buttonBackground}
            text={buttonText}
            onClick={() => (link ? navigate(link) : onClick && onClick())}
            externalLink={externalLink}
          >
            {<ArrowRight size={12} />}
          </Button>
        )}
      </FlexBox>
    </motion.div>
  );
};

export default ContentBox;
