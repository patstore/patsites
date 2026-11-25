import { BadgeCheck, FolderRoot, Image, Users } from "lucide-react";
import features from "../constants/features";
import type { PricingPlan } from "../constants/pricing_plans";

type PricingCardProps = {
    plan: PricingPlan;
};

const PricingCard = ({ plan }: PricingCardProps) => {
    return (
        <div className="pricing_card">
            <div className="pricing_card_content">
                <div>
                    <h3>{plan.name}</h3>
                    <div className="pricing_card_price">{plan.price}</div>
                    <div className="pricing_card_price_footnote">
                        zzgl. 19% MwSt.
                    </div>
                </div>
                <p>{plan.description}</p>
                <div className="horizontal-divider"></div>
                <div className="feature_list">
                    <div className="feature_item">
                        <div className="feature_item_icon">
                            <Users
                                size={15}
                                color="var(--color-secondary)"
                            />
                        </div>
                        <div>Bis zu {plan.users.toString()} Nutzer</div>
                    </div>
                    {/* <div className="feature_item">
                        <div className="feature_item_icon">
                            <Image
                                size={15}
                                color="var(--color-secondary)"
                            />
                        </div>
                        <div>Bis zu {plan.images.toString()} Bilder</div>
                    </div> */}
                    <div className="feature_item">
                        <div className="feature_item_icon">
                            <FolderRoot
                                size={15}
                                color="var(--color-secondary)"
                            />
                        </div>
                        <div className="feature_item_description">
                            {plan.projects}
                        </div>
                    </div>
                    {features.map((feature) => (
                        <div
                            className="feature_item"
                            key={feature.name}
                        >
                            <div className="feature_item_icon">
                                <BadgeCheck
                                    size={15}
                                    color={
                                        plan.features.includes(feature.name)
                                            ? "var(--color-secondary)"
                                            : "var(--color-text)"
                                    }
                                />
                            </div>
                            <div className="feature_item_description">
                                {
                                    features.find(
                                        (f) => f.name === feature.name
                                    )?.description
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
