import { PatstoreContent } from "@types";
import { useGetContent } from "./collections";

const useFindContent = () => {
  const { contents } = useGetContent();

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
