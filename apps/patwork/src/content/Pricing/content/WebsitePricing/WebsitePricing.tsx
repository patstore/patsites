import website_pricing_elements from "./constants/website_pricing_elements";
import { ContentBox } from "@/ui";

const WebsitePricing = () => {
    return (
        <>
            <div className="section-container padding-top-large padding-bottom-large">
                <div className="section-container-element row align-center padding-bottom-small">
                    <div className="w-33">
                        <p className="chapter-number">03</p>
                    </div>
                    <div className="w-66">
                        <h2>Webseite</h2>
                    </div>
                </div>
                <div className="section-container-element row justify-end padding-bottom-medium">
                    <div className="w-33 content-padding-right">
                        <p>
                            Die Kosten für eine Webseite hängen vom Umfang und
                            den Anforderungen ab und können nicht pauschal
                            festgelegt werden werden. Hier finden Sie eine
                            Übersicht darüber, was die Preise einer Seite
                            beeinlusst.
                        </p>
                    </div>
                    <div className="w-33">
                        <p>
                            Die Preise für die Erstellung oder die Übertragung
                            einer Webseite werden im Vorfeld besproche.
                            Zusätzliche Kosten entstehen nur, wenn sich die
                            Anforderungen während oder nach der Entwicklung
                            ändern.
                        </p>
                    </div>
                </div>

                <div className="section-container-element w-66 column align-self-end padding-top-medium">
                    <div className="elements-container">
                        <div className="inner-grid columns-2 gap-medium">
                            {website_pricing_elements.map((element, index) => (
                                <ContentBox
                                    number={(index + 1).toString()}
                                    key={element.title}
                                    title={element.title}
                                    description={element.description}
                                    paddingRight={24}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WebsitePricing;
