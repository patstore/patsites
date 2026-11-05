import { contentBox, memberContainer } from "@styles";
import { Button, ContentContainer, SlideIn } from "@ui";
import React, { useState } from "react";
import {
    specialistIcon
} from "./styles";
import { ClinicForm } from "./content";
import { useSiteContext } from "@provider";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";
import { SpecialistLocation, SpecialistUser } from "@content";

const Spezialistensuche: React.FC = () => {
    const { user } = useSiteContext();
    const [selectClinic, setSelectClinic] = useState<boolean>(false);
console.log({user})
    const { data: locationData } = useQuery(    
        gql`
      query getLocation($objectId: ID!) {
        location(id: $objectId) {
            objectId
            createdAt
            title
            description
            coordinates {
              latitude
              longitude
            }
            data
        }
      }
    `,
        {
            variables: {
                objectId: user?.location
            },
            skip: !user?.location
        }
    );

    const location = locationData?.location;

    if (user?.roles?.includes("qGOcXa3Rsr")) {
        return (
            <ContentContainer>
                <div css={memberContainer}>
                    <div>
                        <h1>Spezialistensuche</h1>
                        <p>
                            Während der Rentner/in-Mitgliedschaft können Sie die Spezialistensuche nicht nutzen.
                        </p>
                    </div>
                </div>
            </ContentContainer>
        );
    }

    if (user?.roles?.includes("tKlza4ZBib")) {
        return (
            <ContentContainer>
                <div css={memberContainer}>
                    <div>
                        <h1>Spezialistensuche</h1>
                        <p>
                            Während der Probemitgliedschaft können Sie die Spezialistensuche nicht nutzen.
                        </p>
                       
                    </div>
                </div>
            </ContentContainer>
        );
    }

    return (
        <ContentContainer>
            <div css={memberContainer}>
                <div>
                    <h1>Spezialistensuche</h1>
                </div>
                <div css={contentBox()}>
                    <h3>Daten bearbeiten</h3>
                    <p>
                        Bearbeiten Sie Ihre Daten, um in der Spezialistensuche angezeigt zu
                        werden.
                    </p>
                    <Button
                        text="Daten bearbeiten"
                        onClick={() => setSelectClinic(true)}
                    />
                </div>
                <div>
                    {location && (
                        <div>
                            <h3>Vorschau zur Spezialistensuche</h3>

                            <SpecialistLocation
                                title={location.title}
                                ort={location?.data?.ort || ""}
                                plz={Number(location?.data?.plz || "")}
                                strasse={location?.data?.strasse || ""}
                                tel={location?.data?.tel || ""}
                                specialists={[{...user, name: user?.label || ""} as unknown as SpecialistUser]}
                                lat={location.coordinates.latitude || 0}
                                lng={location.coordinates.longitude || 0}
                                distance={"0"}
                                land="DE"
                                email={location?.data?.email || ""}
                                fax={location?.data?.fax || ""}
                                homepage={location?.data?.homepage || ""}
                                kompetenzzentrum={null}
                                
                            />
                        </div>
                    )}
                </div>
                <div>
                    <h3>Spezialist*</h3>
                    <div css={specialistIcon}>
                        <span>❌</span>
                    </div>
                    <p>
                        <small>
                            Mitglieder, die sich ausschließlich auf Enddarmerkrankungen
                            spezialisiert haben, erhalten auf Anfrage den Zusatz &quot;Spezialist&quot;
                            und sind durch
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="19"
                                fill="#f50"
                                css={{ scale: 0.8 }}
                                viewBox="0 0 16 16"
                            >
                                <g transform="matrix(1.3333 0 0 -1.3333 0 16)" display="none">
                                    <path d="m4.0039 10.809c-0.71485-0.2-1.4258-0.411-2.1289-0.6449-0.12891-0.043-0.22695-0.1563-0.24609-0.29301-0.41407-3.1172 0.54726-5.391 1.691-6.891 0.48516-0.64024 1.0629-1.2031 1.7152-1.6711 0.25781-0.18398 0.48789-0.31679 0.66797-0.40312 0.08984-0.042968 0.16406-0.069921 0.22304-0.085937 0.02266-0.010938 0.04688-0.014844 0.07383-0.01875 0.02695 0.003906 0.05117 0.010937 0.07383 0.01875 0.05898 0.016016 0.1332 0.042969 0.22305 0.085937 0.18007 0.086329 0.41015 0.21914 0.66796 0.40312 0.65235 0.46797 1.2301 1.0309 1.7152 1.6711 1.1438 1.5 2.1051 3.7738 1.691 6.891-0.0191 0.13671-0.1172 0.25391-0.2461 0.29301-0.48789 0.1597-1.3129 0.4218-2.1289 0.6449-0.83203 0.2219-1.598 0.3898-1.9961 0.3898s-1.1641-0.1679-1.9961-0.3898zm-0.19883 0.7691c0.81211 0.2231 1.6789 0.4219 2.1949 0.4219s1.3828-0.1988 2.1949-0.4219c0.83203-0.223 1.6723-0.4883 2.1641-0.6519 0.4219-0.1371 0.7269-0.5043 0.7859-0.94612 0.4449-3.3551-0.5898-5.8473-1.848-7.4922-0.53477-0.70273-1.1719-1.3238-1.891-1.8398-0.2457-0.17891-0.50781-0.33594-0.78477-0.46797-0.21093-0.098047-0.4332-0.18008-0.62109-0.18008s-0.41016 0.082031-0.62109 0.18008c-0.27696 0.13203-0.53907 0.28906-0.78477 0.46797-0.71914 0.51601-1.3562 1.1371-1.891 1.8398-1.2582 1.6449-2.293 4.1371-1.8481 7.4922 0.058985 0.44182 0.36406 0.80902 0.78594 0.94612 0.71406 0.2379 1.4371 0.4527 2.1641 0.6519z"></path>
                                </g>
                                <g transform="matrix(1.3333 0 0 -1.3333 0 16)">
                                    <path
                                        d="m3.46 5.5376 0.8042 0.070312q0.057129-0.4834 0.26367-0.79541 0.21094-0.30762 0.65039-0.50098 0.43945-0.18896 0.98877-0.18896 0.48779 0 0.86133 0.14502 0.37354 0.14502 0.55371 0.39551 0.18457 0.25488 0.18457 0.55371 0 0.30322-0.17578 0.52734-0.17578 0.22852-0.58008 0.38232-0.25928 0.10107-1.147 0.31201-0.8877 0.21533-1.2437 0.4043-0.46143 0.2417-0.68994 0.59766-0.22412 0.36035-0.22412 0.8042 0 0.48779 0.27686 0.90967 0.27686 0.42627 0.80859 0.646 0.53174 0.21973 1.1821 0.21973 0.71631 0 1.2612-0.23291 0.54932-0.22852 0.84375-0.67676t0.31641-1.0151l-0.81738-0.061524q-0.065918 0.61084-0.44824 0.92285-0.37793 0.31201-1.1206 0.31201-0.77344 0-1.1294-0.28564-0.35156-0.28125-0.35156-0.68115 0-0.34717 0.25049-0.57129 0.24609-0.22412 1.2832-0.46143 1.0415-0.23291 1.4282-0.40869 0.5625-0.25928 0.83057-0.65918 0.26807-0.39551 0.26807-0.91406 0-0.51416-0.29443-0.97119-0.29443-0.45264-0.84814-0.70752-0.54932-0.25049-1.2393-0.25049-0.87451 0-1.4678 0.25488-0.58887 0.25488-0.92725 0.76465-0.33398 0.51416-0.35156 1.1602zm0.54395 5.2714c-0.71485-0.2-1.4258-0.411-2.1289-0.6449-0.12891-0.043-0.22695-0.1563-0.24609-0.29301-0.41407-3.1172 0.54726-5.391 1.691-6.891 0.48516-0.64024 1.0629-1.2031 1.7152-1.6711 0.25781-0.18398 0.48789-0.31679 0.66797-0.40312 0.08984-0.042968 0.16406-0.069921 0.22304-0.085937 0.02266-0.010938 0.04688-0.014844 0.07383-0.01875 0.02695 0.003906 0.05117 0.010937 0.07383 0.01875 0.05898 0.016016 0.1332 0.042969 0.22305 0.085937 0.18007 0.086329 0.41015 0.21914 0.66796 0.40312 0.65235 0.46797 1.2301 1.0309 1.7152 1.6711 1.1438 1.5 2.1051 3.7738 1.691 6.891-0.0191 0.13671-0.1172 0.25391-0.2461 0.29301-0.48789 0.1597-1.3129 0.4218-2.1289 0.6449-0.83203 0.2219-1.598 0.3898-1.9961 0.3898s-1.1641-0.1679-1.9961-0.3898zm-0.19883 0.7691c0.81211 0.2231 1.6789 0.4219 2.1949 0.4219s1.3828-0.1988 2.1949-0.4219c0.83203-0.223 1.6723-0.4883 2.1641-0.6519 0.4219-0.1371 0.7269-0.5043 0.7859-0.94612 0.4449-3.3551-0.5898-5.8473-1.848-7.4922-0.53477-0.70273-1.1719-1.3238-1.891-1.8398-0.2457-0.17891-0.50781-0.33594-0.78477-0.46797-0.21093-0.098047-0.4332-0.18008-0.62109-0.18008s-0.41016 0.082031-0.62109 0.18008c-0.27696 0.13203-0.53907 0.28906-0.78477 0.46797-0.71914 0.51601-1.3562 1.1371-1.891 1.8398-1.2582 1.6449-2.293 4.1371-1.8481 7.4922 0.058985 0.44182 0.36406 0.80902 0.78594 0.94612 0.71406 0.2379 1.4371 0.4527 2.1641 0.6519z"
                                        strokeWidth=".75"
                                    ></path>
                                </g>
                            </svg>
                            nach dem Namen und auf der Karte gekennzeichnet. Zur Änderung
                            dieser Daten nehmen Sie bitte Kontakt mit der{" "}
                            <a href="mailto:info@coloproktologen.de">Geschäftsstelle</a> auf.
                        </small>
                    </p>
                </div>

                <SlideIn
                    open={selectClinic}
                    cancelButtonHandler={() => setSelectClinic(false)}
                    renderButtons={null}
                    hasNoOverflow
                    width="medium"
                    noButtons
                >
                    <ClinicForm setSelectClinic={setSelectClinic} />
                </SlideIn>
            </div>
        </ContentContainer>
    );
};

export default Spezialistensuche;
