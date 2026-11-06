import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { newsContainer, newsElementsContainer } from "./styles";
import NewsElement from "./components/NewsElement";
import { FlexBox } from "@ui";
import NewsButtons from "./components/NewsButtons";
import { NewsProps } from "./types";
import { useCollection } from "@provider";
import type { PatstoreEntry } from "@types";
import settings from "@settings";

const News: React.FC<NewsProps> = ({
  title,
  content,
  category,
  background = settings.colors.light,
}) => {
  const [counter, setCounter] = React.useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [xOffset, setXOffset] = useState(0);

  const { items } = useCollection<PatstoreEntry>("Entry");
  const news = items.filter((item) => item.categories?.includes(category));

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    setXOffset(counter * 330);
  }, [counter]);

  return (
    <div css={newsContainer}>
      <FlexBox
        direction="row"
        align="flex-end"
        justify="space-between"
        hasFullWidth
      >
        <div>
          <h2>{title}</h2>
          {content && <div>{content}</div>}
        </div>
        <NewsButtons counter={counter} setCounter={setCounter} news={news} />
      </FlexBox>

      <div
        css={{
          position: "relative",
          height: `${containerHeight + 30}px`,
        }}
      >
        <motion.div
          ref={containerRef}
          id="projects-container"
          css={newsElementsContainer}
          animate={{ left: 0 - xOffset }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            duration: 0.3,
          }}
        >
          {news
            .sort(
              (a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime(),
            )
            .map((newsElement) => (
              <NewsElement
                key={newsElement.objectId}
                news={newsElement}
                background={background}
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default News;
