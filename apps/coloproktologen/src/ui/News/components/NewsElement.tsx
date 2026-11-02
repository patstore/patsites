import settings from "@settings";
import React, { useState } from "react";
import { NewsElementProps } from "../types";
import { AppImage, ContentBox, Divider, SlideIn } from "@ui";
import { getDateString, useFindImages } from "@provider";
const NewsElement: React.FC<NewsElementProps> = ({ news, background }) => {
  const [open, setOpen] = useState(false);
  const { findImage } = useFindImages();
  return (
    <div
      css={{
        width: "300px",
        height: "fit-content",
      }}
    >
      <ContentBox
        key={news.title}
        title={news.title}
        // text={news.text}
        // link={news.link}
        label="Aktuelles"
        date={getDateString(news.date).date}
        background={background}
        image={news.image}
        color={settings.colors.dark}
        buttonBackground={settings.colors.primary}
        buttonText="Weiter lesen"
        onClick={() => setOpen(true)}
      ></ContentBox>
      <SlideIn
        width="small"
        open={open}
        cancelButtonHandler={() => setOpen(false)}
      >
        {news.image && (
          <AppImage
            src={findImage(news.image)}
            alt={news.title}
            objectFit="contain"
            css={{ height: "300px", borderRadius: "24px" }}
          />
        )}
        <Divider />
        <h2>{news.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: news.text }} />
      </SlideIn>
    </div>
  );
};

export default NewsElement;
