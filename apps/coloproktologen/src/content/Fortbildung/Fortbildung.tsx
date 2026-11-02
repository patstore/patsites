import { Layout } from "@components";
import { HeadContent } from "@ui";
import React from "react";
import {
    AdditionalTitle,
    FirstContent,
    BasicCourse,
    Manual
} from "./components";
import { Coloproctology } from "../Bcd/components";

const Fortbildung: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Die Koloproktologie"
                content={
                    <div>
                        <p>
                            Die Koloproktologie beschäftigt sich speziell mit den Erkrankungen
                            des Dickdarms, insbesondere mit den Erkrankungen des letzten
                            Abschnitts des Darmes, des sog. Enddarms. Dieser umfasst den
                            Mastdarm und den Afterkanal mit dem Schließmuskelapparat.
                        </p>
                        <p>
                            Als interdisziplinäres Fachgebiet hat die moderne Proktologie
                            Berührungspunkte mit vielen Fachrichtungen, vor allem Chirurgie,
                            Dermatologie und Gastroenterologie. Wachsende Anforderungen im
                            Zuge von Innovation und Wandel prägen ihre Zukunft als Fachbereich
                            mit vielen Möglichkeiten (Systemfach).
                        </p>
                    </div>
                }
                isInline
            />
            <FirstContent />
            <AdditionalTitle />
            <BasicCourse />
            <Manual />
            <Coloproctology color="white" />
        </Layout>
    );
};

export default Fortbildung;
