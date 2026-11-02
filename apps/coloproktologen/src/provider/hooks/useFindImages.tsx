import useGetImage from "./patstore/useGetImage";

const useFindImages = () => {
    const { findImage, images } = useGetImage();
    return {
        findImage,
        findImageUrl: findImage,
        images
    };
};

export default useFindImages;
