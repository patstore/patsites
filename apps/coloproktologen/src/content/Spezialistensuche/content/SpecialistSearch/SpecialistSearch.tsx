import { env } from "@env";
import { navigate } from "@router";
import { ContentContainer, GoogleMaps } from "@ui";
import React, { useMemo, useState } from "react";
import {
    searchFieldsContainer,
    specialistsContainer,
    specialistSearchContainer
} from "./styles";
import { SpecialistLocation } from "./content";
import { SearchSpecialistResult, SpecialistUser } from "./types";
import SearchFields from "./components/SearchFields";
import FilterButtons from "./components/FilterButtons";
import Loader from "./components/Loader";
import filter_array from "./constants/filter_array";

import SpecialistsHeader from "./components/SpecialistsHeader";
import settings from "@settings";

const SpecialistSearch: React.FC = () => {
    const [locations, setLocations] = useState<SearchSpecialistResult>([]);
    const [highlightedLocation, setHighlightedLocation] = useState<
    SearchSpecialistResult[number] | undefined
  >(undefined);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<{ value: string; label: string }>(
        filter_array[0]
    );
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: 52.520008,
        lng: 13.404954
    });

    const filtereLocations = useMemo(() => {
        if (filter.value === "all") {
            return locations;
        }
        if (filter.value === "specialists") {
            const locationArray: SearchSpecialistResult = [];

            locations.forEach((location) => {
                const userArray: SpecialistUser[] = [];
                location.users.forEach((user) => {
                    if (user.data?.spezialist === true) {
                        userArray.push(user);
                    }
                });
                if (userArray.length > 0) {
                    locationArray.push({
                        ...location,
                        users: userArray
                    });
                }
            });

            return locationArray;
        }
        if (filter.value === "competence_centers") {
            return locations.filter((location) => !!location.data.kompetenzzentrum);
        }
        return locations;
    }, [locations, filter]);

    return (
        <ContentContainer noPaddingTop id="search-fields-container">
            <div css={specialistSearchContainer}>
                <div css={searchFieldsContainer}>
                    <SearchFields
                        setLocations={setLocations}
                        setLoading={setLoading}
                        setCenter={setCenter}
                    />
                    <FilterButtons filter={filter} setFilter={setFilter} />
                    <GoogleMaps
                        apiKey={env.googleMapsApiKey}
                        center={center}
                        zoom={11}
                        markers={filtereLocations.map((location) => ({
                            lat: location.latitude,
                            lng: location.longitude,
                            text: location.title,
                            onClick: () => {
                                setCenter({ lat: location.latitude, lng: location.longitude });
                                setHighlightedLocation(location);
                                navigate("#search-fields-container");
                            }
                        }))}
                    />
                </div>
                <div css={specialistsContainer}>
                    <SpecialistsHeader
                        highlightedLocation={highlightedLocation}
                        setHighlightedLocation={setHighlightedLocation}
                        locations={filtereLocations}
                    />
                    {loading ? <Loader /> : null}
                    {highlightedLocation ? (
                        <SpecialistLocation
                            key={highlightedLocation.id}
                            title={highlightedLocation.title}
                            description={highlightedLocation.description}
                            distance={highlightedLocation.distance}
                            land={highlightedLocation?.data?.land}
                            ort={highlightedLocation.data.ort}
                            plz={highlightedLocation.data.plz}
                            email={highlightedLocation.data.email}
                            strasse={highlightedLocation.data.strasse}
                            tel={highlightedLocation.data.tel}
                            specialists={highlightedLocation.users}
                            kompetenzzentrum={highlightedLocation?.data?.kompetenzzentrum}
                            homepage={highlightedLocation.data.homepage}
                            lat={highlightedLocation.latitude}
                            lng={highlightedLocation.longitude}
                        />
                    ) : (
                        filtereLocations.length > 0 ? filtereLocations.sort((a, b) => a.distance_int - b.distance_int).map((location) => {
                            if (!location.data) {
                                return null;
                            }
                            
                            return (
                            <SpecialistLocation
                                key={location.id}
                                title={location.title}
                                description={location.description}
                                distance={location.distance}
                                land={location?.data?.land}
                                ort={location.data.ort}
                                plz={location.data.plz}
                                strasse={location.data.strasse}
                                email={location.data.email}
                                tel={location.data.tel}
                                specialists={location.users}
                                kompetenzzentrum={location?.data?.kompetenzzentrum}
                                homepage={location.data.homepage}
                                lat={location.latitude}
                                lng={location.longitude}
                            />
                        )})
                            : <div css={{ textAlign: "center", padding: "20px", backgroundColor: settings.colors.light }}>
                                <p>
                                    Bitte Geben Sie eine Postleitzahl ein oder aktivieren Sie die Standortübermittlung.
                                </p>
                            </div>
                    )}
                </div>
            </div>
        </ContentContainer>
    );
};

export default SpecialistSearch;
