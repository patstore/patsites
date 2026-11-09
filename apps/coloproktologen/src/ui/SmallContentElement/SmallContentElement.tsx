import React, { useState } from "react";
import { SmallContentElementProps } from "./SmallContentElement.d";
import { smallContentElementContainer } from "./styles";
import { roundIcon } from "@styles";
import { ArrowRight } from "lucide-react";
import { SlideIn } from "../SlideIn";
import { motion } from "framer-motion";
import settings from "@settings";
import { getDateString } from "@provider";

const SmallContentElement: React.FC<SmallContentElementProps> = ({
  title,
  text,
  content,
  link,
  flex = "1 1 50%",
  noTextBreak = false,
  date,
  buttonText,
}) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const contentOrLinkExists = !!content || !!link;
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() =>
          link ? window.open(link, "_blank") : content && setOpen(!open)
        }
        css={[
          smallContentElementContainer(flex), 
          {cursor: content || link ? "pointer" : "default"}
        ]}
      >
        <motion.div
          initial={{ height: "0%" }}
          animate={{
            height: hover ? "100%" : "0%",
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          css={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: settings.colors.primary,
            borderRadius: settings.borderRadius.medium,
            zIndex: 0,
          }}
        />
        <motion.div
          animate={{
            color: hover ? settings.colors.white : settings.colors.dark,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          css={{ position: "relative", zIndex: 1, width: "100%" }}
        >
          <h3 lang="de" css={{overflowWrap: "break-word", hyphens: "auto"}}>{title.length > 60 ? title.slice(0, 60) + "..." : title}</h3>
          <p
            css={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: noTextBreak ? 10 : 3,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </p>
        </motion.div>
        <div css={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", zIndex: 1 }}>
          {contentOrLinkExists && (
            <motion.div
              animate={{
                backgroundColor: hover
                  ? settings.colors.white
                  : settings.colors.primary,
                color: hover ? settings.colors.primary : settings.colors.white,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              css={{
                display: "flex",
                alignItems: "center",
                gap: buttonText ? "6px" : 0,
                height: "36px",
                width: buttonText ? "auto" : "36px",
                padding: buttonText ? "0 8px 0 14px" : 0,
                borderRadius: "999px",
                color: "inherit",
              }}
            >
              {buttonText && (
                <span css={{ fontSize: "0.8rem", fontWeight: 600, lineHeight: 1 }}>
                  {buttonText}
                </span>
              )}
              <motion.div
                animate={{
                  transform: hover ? "rotate(-45deg)" : "rotate(0deg)",
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                css={
                  buttonText
                    ? {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "inherit",
                      }
                    : [roundIcon, { color: "inherit", backgroundColor: "transparent" }]
                }
              >
                <ArrowRight strokeWidth={0.8} />
              </motion.div>
            </motion.div>
          )}
          {date && <h5 css={{margin: "0 !important", color: hover ? settings.colors.white : settings.colors.dark}}>{getDateString(date).date}</h5>}
        </div>
      </div>
      {content && (
        <SlideIn
          open={open}
          cancelButtonHandler={() => setOpen(false)}
          width="small"
        >
          <h3>{title}</h3>
          {content}
        </SlideIn>
      )}
    </>
  );
};

export default SmallContentElement;
