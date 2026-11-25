import { MapPin } from "lucide-react";

const Location = () => {
    return (
        <div className="location-container">
            <div className="location-content">
                <div className="location-content-item">
                    <div className="location-content-item-icon">
                        <MapPin size={16} aria-hidden="true" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
