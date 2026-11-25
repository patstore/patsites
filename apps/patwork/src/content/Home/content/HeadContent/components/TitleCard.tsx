import { useEffect, useState } from "react";
import { AnimateContent } from "@/animations";

const LOCATIONS = ["Freiburg", "Sechtem"] as const;

const TitleCard = () => {
    const [locationIndex, setLocationIndex] = useState(0);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setLocationIndex((current) => (current + 1) % LOCATIONS.length);
        }, 3000);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <div className="head-title-card">
            <p className="large">
                <AnimateContent delay={0.9}>
                    Patwork ist eine Webdesing und Entwicklungsstudion aus{" "}
                    <span className="head-location">
                        {LOCATIONS.map((location, index) => (
                            <span
                                key={location}
                                className={
                                    index === locationIndex
                                        ? "is-active"
                                        : undefined
                                }
                                aria-hidden={index !== locationIndex}
                            >
                                {location}
                            </span>
                        ))}
                    </span>
                    , das einigartige Webseiten und Webanwendungen entwickelt.
                </AnimateContent>
            </p>
        </div>
    );
};

export default TitleCard;
