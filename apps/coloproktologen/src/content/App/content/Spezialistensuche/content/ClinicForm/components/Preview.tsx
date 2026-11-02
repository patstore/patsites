import React, { useEffect, useState } from "react";
import { PreviewProps } from "../types";
import { SpecialistLocation } from "@content";
import { validateAddressWithGoogleMaps } from "@provider";

const Preview: React.FC<PreviewProps> = ({
    doctorData,
    clinicData,
    setClinicData
}) => {
    const [isValidating, setIsValidating] = useState(false);
    const [validationMessage, setValidationMessage] = useState<string>("");
    const [validationStatus, setValidationStatus] = useState<
    "success" | "error" | "info" | ""
  >("info");
    const [validatedData, setValidatedData] = useState(clinicData);

    useEffect(() => {
        const validateAddress = async () => {
            // Skip validation if address data is incomplete or if it's an existing clinic
            if (
                !clinicData.data.strasse ||
        !clinicData.data.plz ||
        !clinicData.data.ort ||
        clinicData.objectId
            ) {
                setValidatedData(clinicData);
                if (clinicData.objectId) {
                    setValidationMessage(
                        "Vorhandene Klinikdaten werden ohne Validierung angezeigt."
                    );
                    setValidationStatus("info");
                }
                return;
            }

            setIsValidating(true);
            setValidationMessage("Adresse wird mit Google Maps validiert...");
            setValidationStatus("info");

            try {
                const result = await validateAddressWithGoogleMaps(
                    clinicData.data.strasse,
                    clinicData.data.plz,
                    clinicData.data.ort,
                    "DE"
                );

                if (result && result.isValid) {
                    // Create updated clinic data with validated information

                    const updatedClinicData = {
                        ...clinicData,
                        coordinates: {
                            latitude: result.location.lat,
                            longitude: result.location.lng
                        },
                        data: {
                            ...clinicData.data,
                            strasse: result.components.street || clinicData.data.strasse,
                            plz: result.components.plz || clinicData.data.plz,
                            ort: result.components.city || clinicData.data.ort,
                            land: result.components.country || "DE"
                        }
                    };

                    // Update both local state and parent state
                    setValidatedData(updatedClinicData);
                    setClinicData(updatedClinicData);

                    setValidationStatus("success");
                    setValidationMessage(
                        "Adresse wurde erfolgreich validiert und korrigiert."
                    );
                } else {
                    setValidatedData(clinicData);
                    setValidationStatus("error");
                    setValidationMessage(
                        "Adresse konnte nicht validiert werden. Die eingegebenen Daten werden angezeigt."
                    );
                }
            } catch (error) {
                setValidatedData(clinicData);
                setValidationStatus("error");
                setValidationMessage(
                    "Fehler bei der Adressvalidierung. Die eingegebenen Daten werden angezeigt."
                );
            } finally {
                setIsValidating(false);
            }
        };

        validateAddress();
    }, [clinicData.data.strasse, clinicData.data.plz, clinicData.data.ort]);

    return (
        <div>
            {validationMessage && (
                <div
                    css={{
                        marginBottom: "20px",
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor:
              validationStatus === "success"
                  ? "#d4edda"
                  : validationStatus === "error"
                      ? "#f8d7da"
                      : "#d1ecf1",
                        color:
              validationStatus === "success"
                  ? "#155724"
                  : validationStatus === "error"
                      ? "#721c24"
                      : "#0c5460",
                        border: `1px solid ${
                            validationStatus === "success"
                                ? "#c3e6cb"
                                : validationStatus === "error"
                                    ? "#f5c6cb"
                                    : "#bee5eb"
                        }`,
                        fontSize: "14px",
                        fontWeight:
              validationStatus === "info" && isValidating ? "600" : "400"
                    }}
                >
                    {validationMessage}
                </div>
            )}

            {isValidating ? (
                <div
                    css={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px",
                        gap: "16px"
                    }}
                >
                    <div
                        css={{
                            width: "48px",
                            height: "48px",
                            border: "4px solid #f3f3f3",
                            borderTop: "4px solid #3498db",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            "@keyframes spin": {
                                "0%": { transform: "rotate(0deg)" },
                                "100%": { transform: "rotate(360deg)" }
                            }
                        }}
                    ></div>
                    <p css={{ color: "#666", fontSize: "16px" }}>Validiere Adresse...</p>
                </div>
            ) : (
                <SpecialistLocation
                    title={validatedData.title}
                    ort={validatedData.data.ort}
                    plz={Number(validatedData.data.plz)}
                    strasse={validatedData.data.strasse}
                    tel={validatedData.data.tel}
                    specialists={[{
                        id: doctorData.objectId,
                        name: doctorData.label,
                        title: doctorData.title,
                        address: doctorData.address,
                        data: doctorData.data?.bcd,
                        last_name: doctorData.last_name,
                        email: doctorData.email || "",
                        description: doctorData.description
                    }]}
                    lat={validatedData.coordinates.latitude || 0}
                    lng={validatedData.coordinates.longitude || 0}
                    distance={"0"}
                    land="DE"
                    email={validatedData.data.email}
                    fax={validatedData.data.fax}
                    homepage={validatedData.data.homepage}
                    kompetenzzentrum={null}
                />
            )}
        </div>
    );
};

export default Preview;
