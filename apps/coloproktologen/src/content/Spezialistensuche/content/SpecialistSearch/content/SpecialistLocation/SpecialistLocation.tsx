import React from "react";
import { locationContainer, locationIconContent } from "./styles";
import { SpecialistLocationProps } from "./types";
import { Globe, Mail, MapPin, Phone, Printer, Target } from "lucide-react";
import { SiGooglemaps } from "react-icons/si";
import Specialist from "./components/Specialist";
import settings from "@settings";
import { FlexBox } from "@ui";
import RenderIcon from "./components/RenderIcon";

const SpecialistLocation: React.FC<SpecialistLocationProps> = ({
    title,
    description,
    distance,
    email,
    fax,
    homepage,
    kompetenzzentrum = null,
    land,
    ort,
    plz,
    strasse,
    tel,
    specialists,
    lat,
    lng
}) => {
    // Generate Google Maps URL - prefer coordinates if available, otherwise use address
    const getGoogleMapsUrl = () => {
        if (lat && lng) {
            return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        }
        const address = `${strasse}, ${plz} ${ort}, ${land}`;
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    const generateValidUrl = (url: string) => {
        if (url.startsWith("http")) {
            return url;
        }
        if (url.startsWith("//")) {
            return `https:${url}`;
        }
        if (url.startsWith("www.")) {
            return `https://${url}`;
        }
        return url;
    };

    return (
        <div css={locationContainer}>
            <FlexBox
                direction="row"
                align="center"
                justify="space-between"
                gap={settings.sizes.small}
            >
                <h3 css={{ margin: "0 !important" }}>{title}</h3>
                <div css={locationIconContent}>
                    <Target size={15} />
                    <p css={{ margin: "0 !important" }}>{distance} Km</p>
                </div>
            </FlexBox>
            {description && (
                <div>
                    <p>{description}</p>
                </div>
            )}
            <FlexBox direction="row"
                align="center"
                justify="flex-start"
                gap={settings.sizes.small}>
                {kompetenzzentrum === "K" && (
                    <>
                        <h4 css={{ color: settings.colors.tertiary}}>Kompetenzzentrum Koloproktologie</h4>
                        <h4 css={{ color: settings.colors.tertiary}}><RenderIcon type="K"/></h4>
                    </>
                )}
                {kompetenzzentrum === "P" && (
                    <>
                        <h4 css={{ color: settings.colors.tertiary}}>Kompetenzzentrum Proktologie</h4>
                        <h4 css={{ color: settings.colors.tertiary}}><RenderIcon type="P"/></h4>
                    </>
                )}
            </FlexBox>
            <div css={locationIconContent}>
                <MapPin size={15} />
                {`${strasse}, ${plz} ${ort}`}
            </div>
            <div css={locationIconContent}>
                <Phone size={15} />
                <a href={`tel:${tel}`}>{tel}</a>
            </div>
            {fax && (
                <div css={locationIconContent}>
                    <Printer size={15} />
                    <p>{fax}</p>
                </div>
            )}
            <div css={locationIconContent}>
                <SiGooglemaps size={15} />
                <a href={getGoogleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer">
                    In Google Maps öffnen
                </a>
            </div>
            {email && (
                <div css={locationIconContent}>
                    <Mail size={15} />
                    <a href={`mailto:${email}`}>{email}</a>
                </div>
            )}
            {homepage && (
                <div css={locationIconContent}>
                    <Globe size={15} />
                    <a href={generateValidUrl(homepage)} target="__blank">
                        {homepage}
                    </a>
                </div>
            )}
            {specialists.sort((a, b) =>( b.data.order || 0) - (a.data.order || 0)).map((specialist) => (
                <Specialist
                    key={specialist.id}
                    title={specialist.pre_title || ""}
                    address={specialist.title}
                    name={specialist.name}
                    description={specialist?.data?.fachrichtung}
                    email={specialist?.data?.email}
                    specialist={specialist?.data?.spezialist}
                    tel={specialist?.data?.telefon}
                />
            ))}
        </div>
    );
};

export default SpecialistLocation;
