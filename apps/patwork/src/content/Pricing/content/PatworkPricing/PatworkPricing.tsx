import { useState } from "react";
import PricingCard from "./components/PricingCard";
import pricing_plans from "./constants/pricing_plans";
import "./pricing_content.scss";

const PatworkPricing = () => {
    const [showModules, setShowModules] = useState(false);
    return (
        <div
            className="column-block"
            id="cms"
        >
            <div className="section-container  padding-bottom-large line-grid">
                <div className="section-container-element row align-center padding-top-large padding-bottom-small">
                    <div className="w-33">
                        <p className="chapter-number">01</p>
                    </div>
                    <div className="w-66">
                        <h2>Preise für patstore</h2>
                        {/* <p>
                            Wähle das Paket, das zu deinem Team und deinen
                            Anforderungen passt — transparent, monatlich und
                            flexibel erweiterbar.
                        </p> */}
                    </div>
                    {/* <div className="w-33">
                        <button
                            className="border-top w-100"
                            onClick={() => setShowModules(true)}
                        >
                            Alle Module anzeigen
                            <ArrowRight size={12} />
                        </button>
                    </div> */}
                </div>
                <div className="section-container-element row align-center justify-end padding-bottom-medium">
                    <div className="w-66">
                        <p>
                            Wähle das Paket, das zu deinem Team und deinen
                            Anforderungen passt — transparent, monatlich und
                            flexibel erweiterbar.
                        </p>
                    </div>
                </div>

                <div className="section-container-element column align-start">
                    <div className="pricing_cards">
                        {pricing_plans.map((plan) => (
                            <PricingCard
                                key={plan.name}
                                plan={plan}
                            />
                        ))}
                    </div>
                </div>
                <div className="section-container-element column  align-end w-100">
                    <div className="w-50 bg-dark padding-medium border-bottom">
                        <p className="pricing_footnote">
                            * Für alle Pakete: Automatisch monatlich können
                            weitere Nutzer in der Höhe der Paketnutzer
                            hinzugebucht werden, bis zu einem Maximalbetrag von
                            36 Euro. Registrierte Webseiten-nutzer ohne
                            Adminrechte zählen in die Nutzermenge mit ein.
                        </p>
                    </div>
                </div>
            </div>
            {/* <SlideIn
                isOpen={showModules}
                setIsOpen={setShowModules}
                title="Module"
            >
                <ModuleOverview />
            </SlideIn> */}
        </div>
    );
};

export default PatworkPricing;
