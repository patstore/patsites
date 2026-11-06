import { PatstoreContent } from "@types";
import { useCollection } from "./collections";

const useFindContent = () => {
  const { items: contents } = useCollection("Content");

  const findContent: (
    id: string | null | undefined,
  ) => PatstoreContent | undefined = (id: string | null | undefined) => {
    const content = contents.find(
      (content: PatstoreContent) => content.objectId === id,
    ) as PatstoreContent;

    if (!content) {
      return undefined;
    }
    return content;
  };

  return {
    findContent,
  };
};

export default useFindContent;
