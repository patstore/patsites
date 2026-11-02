import React, { useMemo } from "react";
import {
  contentContainer,
  contentContent,
  contentElementContainer,
  contentElementContent,
} from "./styles";
import { ContentContainerProps, ContentElementProps } from "./types";
import settings from "@settings";
import { SerializedStyles } from "@emotion/react";

const ContentContainer: React.FC<ContentContainerProps> = ({
  largeBackground,
  smallBackground,
  children,
  borderRadius = false,
  centerContent = false,
  padding = false,
  dividerTop = false,
  dividerBottom = false,
  noPaddingTop = false,
  styles = {},
  id = "",
}) => {
  return (
    <section
      css={[
        contentContainer({
          background: largeBackground || settings.colors.white,
          borderRadius,
          noPaddingTop,
        }),
        styles as SerializedStyles,
      ]}
      id={id}
    >
      <div
        css={[
          contentContent({
            background: smallBackground || "tranparent",
            borderRadius: borderRadius ? settings.sizes.medium : "0",
            centerContent,
            padding,
          }),
          {
            borderTop: dividerTop ? `1px solid ${settings.colors.grey}` : "0",
            borderBottom: dividerBottom
              ? `1px solid ${settings.colors.grey}`
              : "0",
          },
        ]}
      >
        {children}
      </div>
    </section>
  );
};

const ContentElement: React.FC<ContentElementProps> = ({
  largeBackground,
  smallBackground,
  elements,
  borderRadius = false,
}) => {
  const elementContent = useMemo(() => {
    const renderElementWidth = (width: "1" | "2" | "3") => {
      let widthValue = ["100%", "100%", "300px"];

      if (width === "1") {
        widthValue = ["100%", "100%", "300px"];
      }
      if (width === "2") {
        widthValue = ["100%", "100%", "600px"];
      }
      if (width === "3") {
        widthValue = ["100%", "100%", "960px"];
      }
      return widthValue;
    };

    return (
      <>
        {elements.map((element) => {
          if (!element.content) {
            return null;
          }

          return (
            <div
              key={element.id}
              css={settings.mq({
                width: renderElementWidth(element.width),
              })}
            >
              {element.content}
            </div>
          );
        })}
      </>
    );
  }, [elements]);

  return (
    <div
      css={contentElementContainer({
        background: largeBackground || settings.colors.white,
      })}
    >
      <div
        css={contentElementContent({
          background: smallBackground || settings.colors.white,
          borderRadius: borderRadius ? settings.sizes.medium : "0",
        })}
      >
        {elementContent}
      </div>
    </div>
  );
};

export { ContentContainer, ContentElement };
