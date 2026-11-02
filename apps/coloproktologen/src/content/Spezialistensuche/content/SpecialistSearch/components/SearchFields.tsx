import React, { useCallback, useEffect, useState } from "react";
import { SearchFieldsProps, SearchSpecialistResult, SpecialistUser } from "../types";
import { Button } from "@ui";
import {
    postalcodeInput,
    searchFieldsContainer,
    searchFieldsFormContainer,
    specialistSearchForm
} from "../styles";
import { useSiteContext } from "@provider";
import { calculateDistance } from "../functions/calculateDistance";
import { fetchGeocodePostalcode } from "../functions/fetchGeocodePostalcode";

const SearchFields: React.FC<SearchFieldsProps> = ({
    setLocations,
    setLoading,
    setCenter
}) => {
    const { locations, users } = useSiteContext();


    const [defaultPlz] = useState<string | undefined>(undefined);

    const searchSpecialits = useCallback((latitude: number, longitude: number, distance: number) => {
        const returnValue: SearchSpecialistResult = [];
        if (locations?.length > 0) {
            locations.forEach(location => {
                const coordinates = location.coordinates as unknown as { latitude: number; longitude: number };
                const locationLatitude = coordinates.latitude;
                const locationLongitude = coordinates.longitude;
                const distanceBetween = calculateDistance(latitude, longitude, locationLatitude, locationLongitude);
                if (distanceBetween <= distance) {
                    const locationUsers: SpecialistUser[] = [];
                    users.forEach(user => {
                        if (user.location === location.objectId) {
                            locationUsers.push({
                                id: user.objectId,
                                title: user.title,
                                description: user.description,
                                name: `${user.first_name} ${user.last_name}`,
                                last_name: user.last_name,
                                email: user.email ?? undefined,
                                data: user.data.bcd,
                                pre_title: user.pre_title,
                                post_title: user.post_title ?? undefined,
                            });
                        }
                       
                    });
                    if (locationUsers.length > 0) {
                        returnValue.push({
                            id: location.objectId,
                            title: location.title || "",
                            description: location.description || undefined,
                            users: locationUsers,
                            data: location.data,
                            latitude: locationLatitude,
                            longitude: locationLongitude,
                            distance: distanceBetween.toFixed(2),
                            distance_int: distanceBetween
                        });
                    }
                }
            });
        } 
        return returnValue;
    }, [locations, users]);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        const value = (e.target as HTMLFormElement).postalcode.value;
        const geocodeData = await fetchGeocodePostalcode(value);
        const geocodeResults = geocodeData.success ? geocodeData.result : [];
        if (geocodeResults.length === 0) {
            alert("Keine PLZ gefunden");
            setLoading(false);
            return;
        }
        const distance = 200;
        const latitude = Number(geocodeResults[0].lat);
        const longitude = Number(geocodeResults[0].lon);

        const specialistResponse = searchSpecialits(latitude, longitude, distance);
        setLocations(specialistResponse);
        setCenter({ lat: latitude, lng: longitude });
        setLoading(false);
    }, [users, setLocations, setCenter, setLoading, locations]);

    const handlePlzSubmit = async (value: string) => {
        setLoading(true);
        let geocodeData;
        try {
            geocodeData = await fetchGeocodePostalcode(value);
        } catch (error) {
            console.error(error);   
            setLoading(false);
            return;
        }
        const distance = 200;
        const data = geocodeData.success ? geocodeData.result : [];
        if (data.length > 0) {
            const specialistResponse = searchSpecialits(Number(data[0].lat), Number(data[0].lon), distance);
            setLocations(specialistResponse);
            setCenter({ lat: Number(data[0].lat), lng: Number(data[0].lon) });
            setLoading(false);
        } else {
            alert("Keine PLZ gefunden");
        }

        setLoading(false);
    };

    const handleLocationSubmit = async () => {
        setLoading(true);

        if (!navigator.geolocation) {
            alert("Geolocation wird von Ihrem Browser nicht unterstützt");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                const distance = 200;
                const specialistResponse = searchSpecialits(Number(latitude), Number(longitude), distance);
                setLocations(specialistResponse);
                setLoading(false);
                if (window.scrollY > 300) {
                    window.scrollTo({ top: 120, behavior: "smooth" });
                }
                setCenter({ lat: Number(latitude), lng: Number(longitude) });
              
            },
            (error) => {
                let errorMessage = "Standort konnte nicht ermittelt werden";

                switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Berechtigung für Standortzugriff wurde verweigert";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Standortinformationen sind nicht verfügbar";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Zeitüberschreitung bei der Standortermittlung";
                    break;
                }

                alert(errorMessage);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        const plz = new URLSearchParams(window.location.search).get("plz");
        const standort = new URLSearchParams(window.location.search).get(
            "standort"
        );
        window.scrollTo({ top: 60, behavior: "smooth" });

        if (plz && locations.length > 0 && users.length > 0) {
            handlePlzSubmit(plz);
        } else if (standort && locations.length > 0 && users.length > 0) {
            handleLocationSubmit();
        }
    }, [locations, users]);

    return (
        <div css={searchFieldsContainer}>
            <div css={searchFieldsFormContainer}>
                <h4>Postleitzahl</h4>
                <form css={specialistSearchForm} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="PLZ"
                            name="postalcode"
                            id="postalcode"
                            css={postalcodeInput}
                            defaultValue={defaultPlz}
                        />
                    </div>
                    <Button type="submit" text="Suchen" />
                </form>
            </div>
            <div css={searchFieldsFormContainer}>
                <h4>Standort</h4>
                <Button text="Standort übermitteln" onClick={handleLocationSubmit} />
            </div>
        </div>
    );
};

export default SearchFields;
