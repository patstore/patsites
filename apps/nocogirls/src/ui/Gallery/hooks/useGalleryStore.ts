import { create } from "zustand";
import type { ImageRecord } from "@types";

type GalleryStore = {
	activeImage: ImageRecord | null;
	setActiveImage: (image: ImageRecord | null) => void;
};

export const useGalleryStore = create<GalleryStore>((set) => ({
	activeImage: null,
	setActiveImage: (image) => set({ activeImage: image })
}));
