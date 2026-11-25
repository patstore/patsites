import { useFindData } from "@data";
import type { ImageClass } from "@data";
import type { FC } from "react";
import type { ProjektContentProps } from "../../types";
import { AnimateContent } from "@/animations";
import "./projekt_content.scss";

type ImageWithPath = ImageClass & { filePath?: string };

const ProjektContent: FC<ProjektContentProps> = ({ project }) => {
    const { findByObjectId } = useFindData();
    const mainImage = project.image
        ? findByObjectId<ImageWithPath>(project.image)
        : null;
    const galleryImages = (project.gallery ?? [])
        .map((id) => findByObjectId<ImageWithPath>(id))
        .filter((image): image is ImageWithPath => Boolean(image?.filePath));
    const description = project.description || project.text || "";
    const leistungen = project.data?.leistungen || "";

    return (
        <div className="section-container padding-top-small padding-bottom-large projekt-content">
            <div className="section-container-element align-self-end w-66">
                {mainImage?.filePath ? (
                    <AnimateContent
                        className="projekt-main-image"
                        trigger={true}
                    >
                        <img
                            src={`/data/files/${mainImage.filePath}`}
                            alt={project.title || ""}
                        />
                    </AnimateContent>
                ) : null}
            </div>

            <div className="section-container-element w-66 align-self-end">
                {description ? (
                    <AnimateContent
                        className="w-50 projekt-html"
                        trigger={true}
                    >
                        <p className="bold">Beschreibung</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: description
                            }}
                        />
                    </AnimateContent>
                ) : null}
                {leistungen ? (
                    <AnimateContent
                        viewport={0}
                        className="w-50 projekt-html projekt-leistungen"
                    >
                        <p className="bold">Leistungen</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: leistungen
                            }}
                        />
                    </AnimateContent>
                ) : null}
            </div>

            <div className="section-container-element justify-end w-100 gap-large">
                {galleryImages.length > 0 ? (
                    <div className="projekt-gallery">
                        {galleryImages.map((image, index) => (
                            <img
                                key={image.objectId}
                                className={
                                    index % 2 === 0 ? "is-left" : "is-right"
                                }
                                src={`/data/files/${image.filePath}`}
                                alt={image.title || project.title || ""}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProjektContent;
