import { Layout } from "@components";
import {
    Enddarmerkrankungen,
    Enddarmbehandlung,
    Faq
} from "./components";
import { Button, HeadContent, SpecialistSearch } from "@ui";
import React from "react";

const Patienten: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Patienten"
                description="Hier finden Sie alle Informationen für Patienten."
                isInline
                image="/images/charles_mcarthur_pixabay_family-6398107_b_xxl.jpg"
                content={
                    <div>
                        <p>
                            Enddarmbeschwerden - mehr als 25 Prozent der Bevölkerung in
                            Deutschland leiden darunter. Ansprechpartner Nummer 1 ist der
                            Koloproktologe, der sich um anale Erkrankungen wie das
                            Hämorrhoidalleiden, aber auch um entzündliche und bösartige
                            Erkrankungen des Enddarms und des Dickdarms kümmert.
                        </p>
                        <p>
                            Eine rechtzeitige Diagnose ist ein wichtiger Schritt zur wirksamen
                            Behandlung der Erkrankungen. Unsere Mitglieder beschäftigen sich
                            speziell mit den Erkrankungen des Dickdarms, insbesondere mit den
                            Erkrankungen des letzten Abschnitts des Darmes, des sog. Enddarms.
                        </p>
                        <Button
                            text="Zur Spezialistensuche"
                            internalLink="/spezialistensuche"
                        />
                    </div>
                }
            />
            <Enddarmerkrankungen />
            <Enddarmbehandlung />
            <Faq />
            <SpecialistSearch />
        </Layout>
    );
};

export default Patienten;
