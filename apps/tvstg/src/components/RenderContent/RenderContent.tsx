import React, { useMemo } from "react";
import { useCollection } from "@provider";
import { ContentElement, RenderContentProps } from "./types";
import RenderText from "./components/RenderText";
import { WebpageContentDivider } from "@types";
import RenderVideo from "./components/RenderVideo";
import RenderImage from "./components/RenderImage";
import RenderTable from "./components/RenderTable";
import RenderDivider from "./components/RenderDivider";

const RenderContent: React.FC<RenderContentProps> = ({ path, contentId }) => {
  const { items: webpages } = useCollection("Webpage");
  const { items: contents, find: findContent } = useCollection("Content");

  const currentContent: ContentElement[] = useMemo(() => {
    const webpage = path
      ? webpages.find((page) => page?.path?.includes(path))
      : undefined;
    if (contentId) {
      const contentArray = contents.filter(
        (content) => content.content_id === contentId,
      );
      return contentArray.map((content) => ({
        ...content.data,
        active: content.active,
        id: content.objectId,
      }));
    }
    if (webpage) {
      return webpage.content || [];
    }
    return [];
  }, [path, webpages, contentId, contents]);

  return (
    <>
      {currentContent.map((item: ContentElement) => {
        if (item.type === "text" && item.active) {
          return <RenderText key={item.id} text={item.value} />;
        }
        if (item.type === "image" && item.active) {
          return (
            <RenderImage key={item.id} image={item.value} name={item.name} />
          );
        }
        if (item.type === "video" && item.active) {
          return <RenderVideo key={item.id} video={item.value} />;
        }
        if (item.type === "table" && item.active) {
          const contentElement = findContent(item.value);
          if (contentElement) {
            return <RenderTable key={item.id} contentId={item.value} />;
          }
        }
        if (item.type === "divider" && item.active) {
          return (
            <RenderDivider
              key={item.id}
              content={item as unknown as WebpageContentDivider}
            />
          );
        }
      })}
    </>
  );
};

export default RenderContent;
