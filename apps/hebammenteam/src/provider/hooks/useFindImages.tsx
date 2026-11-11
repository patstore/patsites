import { useCallback } from "react";
import { useCollection } from "./collections";

const useFindImages = () => {
  const { find: findRecord } = useCollection("Image");

  const findImageUrl = useCallback(
    (id: string | null | undefined) => findRecord(id)?.url ?? null,
    [findRecord],
  );

  return { findImageUrl };
};

export default useFindImages;
