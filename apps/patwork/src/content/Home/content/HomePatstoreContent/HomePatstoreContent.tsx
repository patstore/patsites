import patflowCmsVideo from "./videos/patflow_cms.mp4";
import { BrowserMockup } from "@/ui";

const HomePatstoreContent = () => {
    return (
        <div className="section-container padding-bottom-large line-grid border-bottom">
            <div className="w-50">
                <h2>Moderne Datenverwaltung für Webseiten oder Apps.</h2>
            </div>
            <div className="divider large"></div>
            <div className="section-container-element align-start justify-end row">
                <div className="w-25">
                    <p>
                        Patstore ist eine eigens entwickelte Content Management
                        Lösung, die es Ihnen ermöglicht, Ihre Inhalte einfach zu
                        verwalten und zu veröffentlichen. Mit Patstore können
                        Sie Ihre Inhalte zentralisieren und über verschiedene
                        Kanäle hinweg verbreiten.
                    </p>
                </div>
                <div className="section-container-element flex align-center justify-center w-50">
                    <BrowserMockup
                        id="patstore"
                        content={
                            <video
                                src={patflowCmsVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ width: "100%", height: "100%" }}
                            />
                        }
                        sizeKey={1400}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePatstoreContent;
