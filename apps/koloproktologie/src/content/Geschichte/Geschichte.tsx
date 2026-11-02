import { Layout } from "@components";
import {
    ContentContainer,
    Divider,
    HeadContent,
    TextContentElement,
    AppImage
} from "@ui";
import React from "react";
import mitgliederChart from "./images/Mitgliederbewegung_2025.png";

const Geschichte: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Geschichte"
                subtitle="Die Deutsche Gesellschaft für Koloproktologie (DGK) wurde am 21. November 1990 in Düsseldorf als gemeinnütziger Verein (e. V.) gegründet und beschäftigt sich interdisziplinär mit allen auf dem Gebiet der Koloproktologie auftretenden Erkrankungen, insbesondere deren Diagnostik und Therapie."
                image="/geschichte_header.jpg"
                isInline
            />
            <ContentContainer>
                <TextContentElement title="Ziele der DGK">
                    <p>Ziele der Gesellschaft (DGK) sind</p>
                    <ul>
                        <li>
                            die Förderung der interdisziplinären Forschung von
                            Dickdarm- und Enddarmerkrankungen,
                        </li>
                        <li>
                            die Unterstützung der Aus- und Fortbildung von
                            Ärzten,
                        </li>
                        <li>die Erstellung von Leitlinien und</li>
                        <li>
                            die Ausrichtung von Tagungen und Kongressen, auch im
                            Interesse des Erfahrungsaustausches auf
                            internationaler Ebene.
                        </li>
                    </ul>
                    <p>
                        Der interdisziplinäre Charakter der Koloproktologie soll
                        insbesondere durch die Zusammensetzung des Vorstandes
                        und Präsidiums, der Mitglieder sowie des
                        wissenschaftlichen Tagungsprogrammes zum Ausdruck
                        gebracht werden.
                    </p>
                </TextContentElement>

                <TextContentElement title="Gründungsmitglieder">
                    <p>
                        R. Alpers / W. Brühl / P. Forstmann / Th. Hager / C.
                        Junghans / J. J. Kirsch / J. Lill / G. Mahlke / J. Meier
                        zu Eissen / H. Mlitz / F. Raulf / H. Schüler / V.
                        Wienert / O. Zenner
                    </p>
                    <p>
                        Zum ersten Präsidenten wurde Th. Hager gewählt, der bis
                        heute Ehrenmitglied der DGK ist. <br /> Die Gründung der
                        DGK wurde wesentlich beeinflusst durch die fachliche und
                        finanzielle Unterstützung des damaligen Berufsverbandes
                        der Proktologen Deutschlands und den persönlichen großen
                        Einsatz von P. Forstmann und Th. Hager.
                    </p>
                </TextContentElement>
                <TextContentElement title="Geschichte (1991 - 1996)">
                    <p>
                        Von 1991–1996 wurde der Jahreskongress – die
                        „Koloproktologie- Tage“ – gemeinsam mit dem
                        Berufsverband Coloproktologie Deutschland in Bad Homburg
                        ausgerichtet. 1995 schloss sich die Arbeitsgemeinschaft
                        für Coloproktologie (CACP) der Deutschen Gesellschaft
                        für Chirurgie als Mitveranstalter an. Wegen zunehmender
                        Resonanz mit regelmäßig über 400 Teilnehmern erfolgte
                        1997 der Umzug nach München. Mittlerweile wurde der
                        Jahreskongress von regelmäßig über 400 Teilnehmern
                        besucht.
                    </p>
                </TextContentElement>
                <TextContentElement title="Kooperationen">
                    <p>Eine weitere Vertiefung der Kooperation erfolgte:</p>
                    <ul>
                        <li>
                            2002 mit der Österreichischen Arbeitsgemeinschaft
                            für Coloproktologie (ACP);
                        </li>
                        <li>
                            2003 mit der Schweizerischen Arbeitsgruppe für
                            Koloproktologie (SAKP) sowie der
                        </li>
                        <li>
                            Kommission Proktologie der Deutschen Gesellschaft
                            für Verdauungs- und Stoffwechselerkrankungen e.V.
                            (DGVS) und
                        </li>
                        <li>
                            der Arbeitsgemeinschaft Proktologie der Deutschen
                            Dermatologischen Gesellschaft e.V. (DDG);
                        </li>
                        <li>
                            2005 mit der Deutschen Gesellschaft für
                            Neurogastroenterologie und Motilität e.V. (DGNM);
                        </li>
                        <li>
                            2014 mit dem Berufsverband der niedergelassenen
                            Gastroenterologen Deutschland e.V. (bng) und
                        </li>
                        <li>
                            2015 mit der Deutschen ILCO e. V., der
                            Selbsthilfevereinigung für Stomaträger und Menschen
                            mit Darmkrebs, und der Fachgesellschaft Stoma,
                            Kontinenz und Wunde e.V. (FgSKW).
                        </li>
                    </ul>
                </TextContentElement>
                <TextContentElement title="Deutscher Koloproktologen-Kongress">
                    <p>
                        Dank des Engagements aller Beteiligten hat sich der
                        Deutsche Koloproktologen-Kongress zu einer der
                        herausragendsten wissenschaftlichen
                        Fortbildungsveranstaltung in der Koloproktologie
                        entwickelt. 2006 wurde erstmals die Marke von 600
                        Teilnehmern überschritten, 2011 von 1000 und mit 1280
                        Teilnehmern im Jahr 2015 ein neuer Rekord erreicht.
                    </p>
                    <p>
                        Bis heute verzeichnet die Veranstaltung stetig wachsende
                        Anmeldezahlen, was den zunehmenden Erfolg und die hohe
                        Bedeutung der Veranstaltung unterstreicht. Aufgrund der
                        Umbaumaßnahmen im Hilton Munich Park war es
                        erforderlich, auf einen anderen Veranstaltungsort
                        auszuweichen. Ab 2025 wird der Kongress erstmals in
                        Augsburg stattfinden.
                    </p>
                </TextContentElement>
                <TextContentElement title="Meilensteine ab 2001">
                    <ul>
                        <li>
                            2001 erfolgt die Aufnahme in die Arbeitsgemeinschaft
                            der Wissenschaftlichen Medizinischen
                            Fachgesellschaften e.V. (AWMF).
                        </li>
                        <li>
                            Seit 2003 verleiht ein wissenschaftliches Komitee
                            Preise für herausragende Forschungsarbeiten im
                            Rahmen des Deutschen Koloproktologen-Kongresses. Der{" "}
                            <b>Jens Kirsch-Preis</b>, würdigt die beste
                            wissenschaftliche Arbeit und ist mit 3.000 €
                            dotiert; der <b>DGK-Posterpreis</b>, 2004 für die
                            beste Posterpräsentation eingeführt, war bis 2022
                            mit 1.000 € dotiert. Ab 2023 werden die drei
                            innovativsten Poster mit Posterpreisen geehrt und
                            mit Beträgen von 250 €, 500 € und 1.000 €
                            ausgezeichnet.
                        </li>
                        <li>
                            Seit 2007 vergibt die DGK gemeinsam mit der
                            Deutschen Gesellschaft für Allgemein- und
                            Viszeralchirurgie – vertreten durch die CACP – an
                            qualifizierte Kliniken das Zertifikat für
                            chirurgische Kompetenz-, Referenz- und
                            Exzellenz-Zentren sowie zusätzlich gemeinsam mit der
                            Deutschen Gesellschaft für Gynäkologie (DGGG) und
                            der Deutschen Gesellschaft für Urologie (DGU) ein
                            Zertifikat für Interdisziplinäre Kontinenz- und
                            Beckenboden-Zentren.
                        </li>
                        <li>
                            2016 wird erstmals ein Forschungsförderungspreis an
                            Chirurginnen und Chirurgen in der klinischen und
                            experimentellen Forschung auf dem Gebiet der
                            Koloproktologie vergeben.
                        </li>
                        <li>
                            2017 beschließt die Mitgliederversammlung eine
                            Satzungsänderung. Diese sieht als Führung der
                            Gesellschaft einen Vorstand und ein Präsidium vor.
                            Der Vorstand besteht aus 5 Personen: Präsident,
                            Vize-Präsident, Past-Präsident, Generalsekretär und
                            Schatzmeister.
                        </li>
                        <li>
                            2019 publiziert die DGK das{" "}
                            <b>Manual der Koloproktologie</b>, bestehend aus
                            Band 1 und 2, unter den Bedingungen des Open Access.
                            Beide Bände stehen allen Interessierten kostenfrei
                            zur Verfügung. Dank der überwältigenden Resonanz
                            wurden in kürzester Zeit beeindruckende 30.000
                            Downloads verzeichnet.
                        </li>
                        <li>
                            2020 erstellt das Leitlinienprogramm Onkologie unter
                            Federführung der Deutschen Gesellschaft für
                            Koloproktologie e. V. (DGK) erstmals eine
                            S3-Leitlinie zur Diagnostik, Therapie und Nachsorge
                            von Analkanal- und Analrandkarzinomen. Die Leitlinie
                            gibt unter anderem Empfehlungen zur
                            Primärdiagnostik, Therapieentscheidung bei kurativer
                            Operation und kurativer Radiochemotherapie, der
                            Responsebeurteilung nach Radiochemotherapie sowie
                            der Palliativversorgung.
                        </li>
                        <li>
                            Seit 29.01.2021 ist die Deutsche Gesellschaft für
                            Koloproktologie e. V. offizieller Unterstützer der
                            Nationalen Dekade gegen Krebs. Auf Initiative des
                            Bundesministerium für Bildung und Forschung haben
                            sich zahlreiche Akteure zusammengeschlossen, um
                            gemeinsam für eine starke Krebsforschung zu
                            arbeiten, die Patientinnen und Patienten eng
                            einbindet und ihnen bessere Perspektiven eröffnet.
                            Mit ihrem Engagement will die DGK dabei helfen, die
                            Krebsforschung in Deutschland zu stärken und die
                            Ziele der Nationalen Dekade gegen Krebs langfristig
                            zu erreichen.
                        </li>
                        <li>
                            2024 erscheint die 2. Auflage des{" "}
                            <b>Manuals der Koloproktologie</b> erneut unter
                            Bedingungen des Open Access. Die umfassende
                            Neuauflage beider Bände bietet eine fundierte und
                            praxisorientierte Übersicht über die neuesten
                            Entwicklungen und berücksichtigt die jüngsten
                            wissenschaftlichen Erkenntnisse von Behandlungen und
                            Erkrankungen im Bereich der Koloproktologie.
                        </li>
                    </ul>
                </TextContentElement>
                <TextContentElement title="Nachwuchs- und Forschungsförderung">
                    <p>Der proktologische Nachwuchs wird:</p>
                    <ul>
                        <li>
                            seit 2011 durch Hospitations-Stipendien für die
                            Dauer von 2–4 Wochen,
                        </li>
                        <li>
                            seit 2012 mit einem Reise-Stipendium zur
                            ESCP-Tagung,
                        </li>
                        <li>
                            seit 2013 durch ein 3-tägiges Stipendium im Vorfeld
                            des Deutschen Koloproktologen-Kongresses,
                        </li>
                        <li>
                            seit 2018 mit einem Hospitations-Stipendium für
                            Kollegen aus Drittländern gefördert und
                        </li>
                        <li>
                            seit 2019 mit einer Reiseunterstützung (gemeinsam
                            mit der Deutschen Gesellschaft für Allgemein- und
                            Viszeralchirurgie DGAV) unterstützt.
                        </li>
                    </ul>
                    <p>
                        Gezielt engagiert sich die DGK auch in der Förderung
                        wissenschaftlicher Forschungsprojekte:
                    </p>
                    <ul>
                        <li>
                            2023 wurden zwei herausragende Projekte unterstützt.
                            Förderung erhielt eine Studie zur sakralen
                            Neuromodulation bei Kindern und Jugendlichen, um
                            Fortschritte und innovative Therapiemöglichkeiten in
                            diesem spezialisierten Bereich voranzutreiben.
                            Ebenfalls gefördert wurde eine experimentell
                            prospektive Studie, die sich mit der
                            Immuncharakterisierung junger Patienten mit
                            kolorektalem Karzinom befasst mit dem Ziel, ein
                            tieferes Verständnis der Immunreaktionen bei jungen
                            Betroffenen zu entwickeln. Für jedes dieser Projekte
                            stellte die DGK ein Fördervolumen von 10.000 € zur
                            Verfügung.
                        </li>
                        <li>
                            2024 wird eine experimentell prospektive
                            Rebefundungsstudie, die den prätherapeutischen
                            MRT-Befund mit der postoperativen Pathologie bei
                            Rektumkarzinomen vergleicht gefördert, um fundierte
                            Therapieentscheidungen treffen zu können. Für diese
                            Studie wurden ebenfalls Fördermittel in Höhe von
                            10.000 € bereitgestellt.
                        </li>
                    </ul>
                </TextContentElement>
                <Divider />
                <h2>Der Vorstand der DGK ab 2018</h2>
                <table summary="Vorstand der DGK e.V. ab 2018">
                    <thead>
                        <tr>
                            <th> Jahr</th> <th> Präsident</th>
                            <th> 1. Vizepräsident</th>
                            <th> 2. Vizepräsident</th>
                            <th> Generalsekretär</th>
                            <th> Schatzmeister</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2026</td>
                            <td>Prof. Dr. T. Schiedeck</td>
                            <td>Prof. Dr. T. Seufferlein</td>
                            <td>Prof. Dr. R. Croner</td>
                            <td>Prof. Dr. O. Schwandner</td>
                            <td>Prof. Dr. F. Aigner</td>
                        </tr>
                        <tr>
                            <td>2025</td> <td>Prof. Dr. T. Seufferlein</td>
                            <td>Dr. R. Ruppert</td>
                            <td>Prof. Dr. T. Schiedeck</td>
                            <td>Prof. Dr. O. Schwandner</td>
                            <td>Prof. Dr. F. Aigner</td>
                        </tr>
                        <tr>
                            <td>2024</td> <td>Prof. Dr. T. Seufferlein</td>
                            <td>Dr. R. Ruppert</td>
                            <td>Prof. Dr. T. Schiedeck</td>
                            <td>Prof. Dr. O. Schwandner</td>
                            <td>Prof. Dr. F. Aigner</td>
                        </tr>
                        <tr>
                            <td>2023</td> <td>Dr. R. Ruppert</td>
                            <td>Prof. Dr. M. Kreis</td>
                            <td>Prof. Dr. T. Seufferlein</td>
                            <td>Prof. Dr. A. Herold</td>
                            <td>Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td>2022</td> <td>Dr. R. Ruppert</td>
                            <td>Prof. Dr. M. Kreis</td>
                            <td>Prof. Dr. T. Seufferlein</td>
                            <td>Prof. Dr. A. Herold</td>
                            <td>Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2021</td> <td> Prof. Dr. M. Kreis</td>
                            <td> Prof. Dr. S. Post</td>
                            <td> Dr. R. Ruppert</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2020</td> <td> Prof. Dr. M. Kreis</td>
                            <td> Prof. Dr. S. Post</td>
                            <td> Dr. R. Ruppert</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2019</td> <td> Prof. Dr. S. Post</td>
                            <td> Prof. Dr. H. Messmann</td>
                            <td> Prof. Dr. M. Kreis</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2018</td> <td> Prof. Dr. S. Post</td>
                            <td> Prof. Dr. H. Messmann</td>
                            <td> Prof. Dr. M. Kreis</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                    </tbody>
                </table>
                <Divider />
                <h2>Der Vorstand der DGK ab 1990 - 2017</h2>
                <table summary="Der Vorstand der DGK e.V. ab 1990 - 2017">
                    <thead>
                        <tr>
                            <th> Jahr</th> <th> Präsident</th>
                            <th> Vizepräsident</th>
                            <th> Geschäftsführer</th>
                            <th> Schatzmeister</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 2017</td> <td> Prof. Dr. H. Messmann</td>
                            <td> Prof. Dr. S. Post</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2016</td> <td> Prof. Dr. H. Messmann</td>
                            <td> Prof. Dr. S. Post</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2015</td>
                            <td> Prof. Dr. Dr. h.c. W. Hohenberger</td>
                            <td> Prof. Dr. H. Messmann</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2014</td>
                            <td> Prof. Dr. Dr. h.c. W. Hohenberger</td>
                            <td> Prof. Dr. H. Messmann</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2013</td> <td> Prof. Dr. E. Stange</td>
                            <td> Prof. Dr. Dr. h.c. W. Hohenberger</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2012</td> <td> Prof. Dr. E. Stange</td>
                            <td> Prof. Dr. Dr. h.c. W. Hohenberger</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2011</td> <td> Prof. Dr. R. Arbogast</td>
                            <td> Prof. Dr. E. Stange</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2010</td> <td> Prof. Dr. R. Arbogast</td>
                            <td> Prof. Dr. E. Stange</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2009</td> <td> Prof. Dr. F. Hartmann</td>
                            <td> Prof. Dr. R. Arbogast</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2008</td> <td> Prof. Dr. F. Hartmann</td>
                            <td> Prof. Dr. R. Arbogast</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2007</td> <td> Prof. Dr. K-W. Jauch</td>
                            <td> Prof. Dr. F. Hartmann</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> Prof. Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2006</td> <td> Prof. Dr. K-W. Jauch</td>
                            <td> Prof. Dr. F. Hartmann</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> PD Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2005</td> <td> Dr. G. Pommer</td>
                            <td> Prof. Dr. K-W. Jauch</td>
                            <td> Prof. Dr. A. Herold</td>
                            <td> PD Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2004</td> <td> Dr. G. Pommer</td>
                            <td> Prof. Dr. K-W. Jauch</td>
                            <td> PD. Dr. A. Herold</td>
                            <td> PD Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2003</td> <td> Prof. W. Hartschuh</td>
                            <td> Dr. G. Pommer</td>
                            <td> PD. Dr. A. Herold</td>
                            <td> PD Dr. T. Schiedeck</td>
                        </tr>
                        <tr>
                            <td> 2002</td> <td> Prof. W. Hartschuh</td>
                            <td> Dr. G. Pommer</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 2001</td> <td> Prof. W. Heitland</td>
                            <td> Prof. W. Hartschuh</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 2000</td> <td> Prof. W. Heitland</td>
                            <td> Prof. W. Hartschuh</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1999</td> <td> Prof. H Egger</td>
                            <td> Prof. W. Heitland</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1998</td> <td> Prof. H Egger</td>
                            <td> Prof. W. Heitland</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1997</td> <td> Prof. R. Winkler</td>
                            <td> Prof. H. Egger</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1996</td> <td> Prof. R. Winkler</td>
                            <td> Prof. H. Egger</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1995</td> <td> Prof. V. Wienert</td>
                            <td> Prof. R. Winkler</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1994</td> <td> Prof. V. Wienert</td>
                            <td> Prof. R. Winkler</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1993</td> <td> Prof. G. Lux</td>
                            <td> Prof. V. Wienert</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. J. Lill</td>
                        </tr>
                        <tr>
                            <td> 1992</td> <td> Prof. G. Lux</td>
                            <td> Prof. V. Wienert</td>
                            <td> Prof. Th. Hager</td>
                            <td> Dr. Dr. R. Alpers</td>
                        </tr>
                        <tr>
                            <td> 1991</td> <td> Prof. Th. Hager</td>
                            <td> Prof. V. Wienert</td>
                            <td> Dr. P. Forstmann</td>
                            <td> Dr. Dr. R. Alpers</td>
                        </tr>
                        <tr>
                            <td> 1990</td> <td> Prof. Th. Hager</td>
                            <td> Prof. V. Wienert</td>
                            <td> Dr. P. Forstmann</td>
                            <td> Dr. Dr. R. Alpers</td>
                        </tr>
                    </tbody>
                </table>
                <Divider />
                <h2 id="mitgliederbewegung-title">
                    Entwicklung der Mitgliederzahl ab 1991
                </h2>
                <AppImage
                    alt="Mitgliederentwicklung der DGK e.V."
                    src={mitgliederChart}
                    css={{ maxWidth: "700px", height: "auto" }}
                />
            </ContentContainer>
        </Layout>
    );
};

export default Geschichte;
