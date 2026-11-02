import { Layout } from "@components";
import { ContentContainer, HeadContent } from "@ui";
import React from "react";
import { satzungContainer } from "./styles";

const Satzung: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Satzung"
                subtitle="In der von der Mitgliederversammlung mit Datum vom 31.03.2017 verabschiedeten Fassung."
                isInline
            />
            <ContentContainer noPaddingTop>
                <div css={satzungContainer}>
                    <details>
                        <summary>
                            § 1 Name, Sitz und Zweck der Gesellschaft
                        </summary>
                        <p>
                            Die Gesellschaft führt den Namen “Deutsche
                            Gesellschaft für Koloproktologie e.V.” und ist in
                            das Vereinsregister des Amtsgerichtes Freiburg
                            eingetragen. Der Sitz der Gesellschaft ist Freiburg
                            (im Breisgau). Zweck der Gesellschaft ist die
                            Förderung von Wissenschaft und Forschung und die
                            Berufsbildung im Bereich der Koloproktologie. Die
                            Satzungszwecke werden insbesondere verwirklicht
                            durch:
                        </p>
                        <ul>
                            <li>
                                Die Durchführung von wissenschaftlichen
                                Veranstaltungen und Kongressen,
                            </li>
                            <li>die Veranstaltungen von Tagungen,</li>
                            <li>
                                die Förderung der Weiterbildung in der
                                Koloproktologie,
                            </li>
                            <li>
                                Unterstützung des wissenschaftlichen
                                Nachwuchses, z.B durch die Vergabe von
                                Stipendien o.ä.,
                            </li>
                            <li>
                                Unterstützung koloproktologischer
                                Forschungsvorhaben,
                            </li>
                            <li>
                                Beteiligung an wissenschaftlichen Leitlinien und
                            </li>
                            <li>
                                das Pflegen und Knüpfen von Verbindungen zu
                                nationalen und internationalen
                                koloproktologischen Gesellschaften.
                            </li>
                        </ul>
                    </details>
                    <details>
                        <summary>§ 2 Gemeinnützigkeit</summary>
                        <p>
                            Die Deutsche Gesellschaft für Koloproktologie
                            verfolgt ausschließlich und unmittelbar
                            gemeinnützige Zwecke im Sinne des Abschnitts
                            „Steuerbegünstigte Zwecke“ der Abgabenordnung.
                        </p>
                        <p>
                            Die Gesellschaft ist selbstlos tätig; sie verfolgt
                            nicht in erster Linie eigenwirtschaftliche Zwecke.
                            Mittel der Gesellschaft dürfen nur für die
                            satzungsmäßigen Zwecke verwendet werden.
                        </p>
                        <p>
                            Die Mitglieder erhalten keine Zuwendungen aus
                            Mitteln der Körperschaft.
                        </p>
                        <p>
                            Es darf keine Person durch Ausgaben, die dem Zweck
                            der Körperschaft fremd sind, oder durch
                            unverhältnismäßig hohe Vergütungen begünstigt
                            werden.
                        </p>
                    </details>
                    <details>
                        <summary>§ 3 Mitgliedschaft</summary>
                        <ol>
                            <li>
                                Ordentliches Mitglied kann jeder Arzt werden.
                            </li>
                            <li>
                                Zu Ehrenmitgliedern können Personen ernannt
                                werden, die sich um die Entwicklung und
                                Förderung der Koloproktologie hervorragend
                                verdient gemacht haben. Die Ernennung zum
                                Ehrenmitglied kann von jedem ordentlichen
                                Mitglied vorgeschlagen werden. Der Vorstand
                                entscheidet über die Ernennung mit einer
                                Mehrheit von mindestens vier Fünfteln der
                                abgegeben Stimmen.
                            </li>
                            <li>
                                Mitglied können medizinische Gesellschaften und
                                medizinische Verbände werden, die als
                                assoziierte Mitglieder beitreten. Jedes
                                assoziierte Mitglied benennt für die Mitwirkung
                                in der Gesellschaft einen Vertreter.
                            </li>
                            <li>
                                Fördermitglied können natürliche oder
                                juristische Personen werden, die den Zweck der
                                Gesellschaft im besonderen Maße unterstützen.
                                Die fördernde Mitgliedschaft ist auf zwei Jahre
                                begrenzt und kann jeweils auf Antrag um zwei
                                Jahre verlängert werden.
                            </li>
                            <li>
                                Aufnahmegesuche sind über den Generalsekretär an
                                den Vorstand zu richten. Über die Aufnahme
                                entscheidet der Vorstand. Über Einsprüche gegen
                                die Ablehnung der Aufnahme entscheidet der
                                Vorstand abschließend.
                            </li>
                        </ol>
                    </details>
                    <details>
                        <summary>§ 4 Erlöschen der Mitgliedschaft</summary>
                        <ol>
                            <li>Durch Tod.</li>
                            <li>
                                Durch Kündigung des Mitgliedes, die mit einer
                                Kündigungsfrist von drei Monaten zum Schluss
                                eines jeden Kalenderjahres schriftlich an den
                                Generalsekretär zu erfolgen hat. Der Beitrag für
                                das laufende Geschäftsjahr ist zu entrichten.
                            </li>
                            <li>
                                Durch Ausschließung. Diese darf nur
                                ausgesprochen werden, wenn das Mitglied durch
                                sein Verhalten das Ansehen der Gesellschaft grob
                                geschädigt, in grober Weise gegen die Interessen
                                der Gesellschaft verstoßen hat oder trotz
                                zweimaliger schriftlicher Mahnung mit der
                                Zahlung des Beitrages länger als ein Jahr im
                                Rückstand ist. Über den Ausschluss entscheidet
                                der Vorstand mit einem einstimmigen Beschluss.
                            </li>
                            <li>
                                Dem Betroffenen muss auf seinen Wunsch die
                                Möglichkeit gegeben werden, die
                                Mitgliederversammlung anzurufen und sich hier
                                persönlich zum Gegenstand des Ausschlusses zu
                                äußern. Die Mitgliederversammlung kann mit
                                einfacher Mehrheit den Beschluss des Vorstandes
                                für ungültig erklären.
                            </li>
                            <li>
                                Durch Verlust der bürgerlichen Ehrenrechte oder
                                durch Aberkennung der Approbation.
                            </li>
                        </ol>
                    </details>
                    <details>
                        <summary>§ 5 Beiträge / Geschäftsjahr</summary>
                        <p>
                            Die Höhe des jährlichen Mitgliedsbeitrages wird von
                            der Mitgliederversammlung festgelegt (siehe
                            Beitragsordnung). Das Geschäftsjahr ist das
                            Kalenderjahr.
                        </p>
                    </details>
                    <details>
                        <summary>§ 6 Der Vorstand</summary>
                        <p>Der Vorstand besteht:</p>
                        <ul>
                            <li>aus dem Präsidenten,</li>
                            <li>
                                aus dem ersten Vizepräsidenten, (= Präsident der
                                vorhergehenden Amtsperiode)
                            </li>
                            <li>
                                aus dem zweiten Vizepräsidenten, (= Präsident
                                der kommenden Amtsperiode)
                            </li>
                            <li>aus dem Generalsekretär,</li>
                            <li>aus dem Schatzmeister.</li>
                        </ul>
                        <p>
                            Nur der Präsident oder zwei Mitglieder des
                            Vorstandes gemeinsam sind vertretungsberechtigt.
                        </p>
                        <p>
                            Der Vorstand wird von der Mitgliederversammlung -
                            auf Antrag in geheimer Wahl - gewählt. Der Vorstand
                            schlägt jeweils geeignete Personen vor.
                        </p>
                        <p>
                            Vorschläge können auch von jedem Mitglied bis 4
                            Wochen vor der Mitgliederversammlung eingereicht
                            werden. Kandidaten müssen dann von mindestens 10
                            DGK-Mitgliedern unterstützt werden.
                        </p>
                        <p>
                            Die Vorstände werden für folgende Zeiträume gewählt:
                        </p>
                        <ul>
                            <li>
                                Der zweite Vizepräsident für zwei Jahre. Er
                                wechselt nach zwei Jahren automatisch für zwei
                                Jahre in das Präsidentenamt.
                            </li>
                            <li>
                                Der Generalsekretär und der Schatzmeister werden
                                für die Dauer von vier Kalenderjahren gewählt;
                            </li>
                            <li>
                                Zwei Kassenprüfer werden für vier Kalenderjahre
                                gewählt.
                            </li>
                        </ul>
                        <p>
                            Personell sollte der Vorstand dem interdisziplinären
                            Charakter der Gesellschaft Rechnung tragen.
                        </p>
                    </details>
                    <details>
                        <summary>§ 7 Pflichten des Vorstands</summary>
                        <ol>
                            <li>
                                Dem Vorstand obliegt die Wahrnehmung der Ziele
                                des § 1, die Geschäftsleitung, die Ausführung
                                der Vereinsbeschlüsse und die Verwaltung des
                                Vereinsvermögens. Der Vorstand gibt sich einen
                                Geschäftsverteilungsplan.
                            </li>
                            <li>
                                Der Vorstand kann zu seiner Unterstützung
                                Präsidiumsmitglieder (s. § 9) zwecks Bildung von
                                Referatsbereichen berufen.
                            </li>
                            <li>
                                Der Präsident, im Verhinderungsfalle einer der
                                Stellvertreter, beruft die Mitgliederversammlung
                                ein und leitet diese. Sind 1. und 2.
                                Stellvertreter verhindert, an der
                                Mitgliederversammlung teilzunehmen, ist aus dem
                                Kreis der Mitglieder auf Vorschlag der übrigen
                                anwesenden Vorstandsmitglieder ein
                                Abstimmungsleiter zu wählen.
                            </li>
                            <li>
                                Der Generalsekretär führt über jede Verhandlung
                                des Vorstands und über jede
                                Mitgliederversammlung ein Protokoll, das von ihm
                                und dem Versammlungsleiter zu unterzeichnen ist.
                                Es soll folgende Feststellungen enthalten: Ort
                                und Zeit der Versammlung, die Person des
                                Versammlungsleiters, die Zahl der erschienenen
                                Mitglieder, die Tagesordnung, die einzelnen
                                Abstimmungsergebnisse und die Art der
                                Abstimmung.
                            </li>
                            <li>
                                Der Schatzmeister verwaltet das Vermögen und die
                                Vereinskasse und gibt nach Prüfung durch die
                                Rechnungsprüfer der jährlichen
                                Mitgliederversammlung einen Rechenschaftsbericht
                                zwecks Entlastung.
                            </li>
                            <li>
                                Der Generalsekretär bzw. der Schatzmeister sind
                                berechtigt, zur Ausführung von
                                Vereinsbeschlüssen und zur Verwaltung des
                                Vereinsvermögens Zahlungen zu veranlassen.
                            </li>
                        </ol>
                    </details>
                    <details>
                        <summary>§ 8 Vergütungen</summary>
                        <p>
                            Den Vorstandsmitgliedern und vom Vorstand zur
                            Vornahme von Rechtsgeschäften Beauftragte und nach §
                            9 berufenen Präsidiumsmitgliedern kann ein Anspruch
                            auf angemessene Vergütung ihrer Tätigkeit gewährt
                            werden.
                        </p>
                        <p>
                            Die Vereinbarung bedarf der Schriftform und wird
                            seitens des Vereins vom Vorstand abgeschlossen.
                        </p>
                    </details>
                    <details>
                        <summary>§ 9 Das Präsidium</summary>
                        <p>
                            Die Zusammensetzung des Präsidiums sollte der
                            interdisziplinären Zielsetzung der Gesellschaft auf
                            dem Gebiet der Koloproktologie und seiner
                            Grenzgebiete Rechnung tragen.
                        </p>
                        <p>
                            Das Präsidium berät gemeinsam mit dem Vorstand über
                            die Richtlinien für die Arbeit der Gesellschaft. Der
                            Vorstand bedient sich seiner, insbesondere für die
                            Zielsetzungen des § 1 der Satzung.
                        </p>
                        <p>Zum Präsidium gehören:</p>
                        <ol>
                            <li>
                                ein Vertreter der assoziierten medizinischen
                                Gesellschaften und medizinischen Verbände;
                            </li>
                            <li>aus dem Vorstand ausgeschiedene Mitglieder;</li>
                            <li>
                                von der Mitgliederversammlung gewählte
                                Mitglieder verschiedener Fachrichtungen;
                            </li>
                            <li>
                                vom Vorstand berufene Präsidiumsmitglieder zur
                                Erfüllung bestimmter Referatsaufgaben im Sinne
                                von § 7 Nr. 2.
                            </li>
                        </ol>
                        <p>
                            Die Präsidiumsmitglieder zu 1. und 2. werden auf der
                            Mitgliederversammlung bestätigt, die
                            Präsidiumsmitglieder zu 3. gewählt.
                        </p>
                        <p>
                            Der Vorstand hat das Recht, zusätzlich Mitglieder
                            der Gesellschaft in das Präsidium zu integrieren bis
                            zur Bestätigung durch die Mitgliederversammlung.
                        </p>
                        <p>
                            Die Wahlperiode beträgt vier Jahre. Eine Wiederwahl
                            ist nur unzulässig für Präsidiumsmitglieder zu 2.
                        </p>
                        <p>
                            Den Vorsitz im Präsidium übt der jeweilige Präsident
                            bzw. ein Vertreter aus. Die Sitzungen des Präsidiums
                            sollen in der Regel vom Präsidenten einmal jährlich
                            einberufen werden. Eine Präsidiumsmehrheit kann eine
                            Sondersitzung verlangen
                        </p>
                    </details>
                    <details>
                        <summary>§ 10 Mitgliederversammlung</summary>
                        <ol>
                            <li>
                                Die Mitgliederversammlung findet einmal jährlich
                                in den ersten sechs Monaten statt - nach
                                Möglichkeit während einer wissenschaftlichen
                                Tagung. Sie wird vom Präsidenten einberufen:
                                <ul>
                                    <li>auf Antrag des Vorstands,</li>
                                    <li>
                                        wenn 25% der Mitglieder dies beantragen.
                                    </li>
                                </ul>
                                Die Einberufung erfolgt schriftlich oder per
                                E-Mail unter Angabe der Tagesordnung mindestens
                                sechs Wochen vor dem Tagungstermin.
                            </li>
                            <li>
                                Anträge der Mitglieder zur Tagesordnung müssen 8
                                Tage vor dem Tagungstermin beim Präsidenten
                                eingegangen sein. Die Mitgliederversammlung
                                <ul>
                                    <li>den Jahresbericht der Vorstandes,</li>
                                    <li>
                                        den Rechenschaftsbericht des
                                        Schatzmeisters,
                                    </li>
                                    <li>die Entlastung des Vorstandes</li>
                                    <li>
                                        Neuwahlen bzw. Bestätigung von
                                        Vorstands- und Präsidiumsmitglieder.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Die Mitgliederversammlung umfasst alle
                                Mitglieder des Vereines. Jedes ordentliche
                                Mitglied hat eine Stimme. Jeder von den
                                assoziierten medizinischen Gesellschaften und
                                medizinischen Verbänden in die
                                Mitgliederversammlung entsandte Vertreter hat
                                eine Stimme. Wählbar sind ordentliche Mitglieder
                                und Vertreter der assoziierten medizinischen
                                Gesellschaften und medizinischen Verbände.
                            </li>
                            <li>
                                Die Stimmabgabe erfolgt schriftlich und geheim.
                                Der Versammlungsleiter kann nach seinem
                                pflichtgemäßen Ermessen von diesem Verfahren
                                abweichen.
                            </li>
                            <li>
                                Soweit Gesetz und Satzung nichts anderes
                                vorsehen, entscheidet bei der Beschlussfassung
                                die Mehrheit der abgegebenen gültigen Stimmen.
                            </li>
                            <li>
                                Änderungen des Vereinszweckes und sonstige
                                Satzungsänderungen bedürfen einer Mehrheit von
                                3/4 der abgegebenen gültigen Stimmen. Die
                                Auflösung des Vereines bedarf einer Mehrheit von
                                3/4 aller ordentlichen und assoziierten
                                Mitglieder.
                            </li>
                            <li>
                                Das Protokoll der Mitgliederversammlung wird den
                                Mitgliedern (schriftlich, per E-Mail oder online
                                auf der Homepage der Gesellschaft) zur Kenntnis
                                gebracht und gilt als genehmigt, sofern nicht
                                innerhalb von 4 Wochen ein schriftlicher,
                                begründeter Einspruch beim Generalsekretär
                                eingeht.
                            </li>
                        </ol>
                    </details>
                    <details>
                        <summary>§ 11 Veröffentlichungen</summary>
                        <p>
                            Veröffentlichungen des Vereines erfolgen im
                            elektronischen Bundesanzeiger.
                        </p>
                    </details>
                    <details>
                        <summary>
                            § 12 Auflösung, Wegfall des Gesellschaftszweckes
                        </summary>
                        <ol>
                            <li>
                                Bei Auflösung oder Aufhebung der Körperschaft
                                oder bei Wegfall steuerbegünstigter Zwecke fällt
                                das Vermögen der Gesellschaft an die Stiftung
                                Deutsche Krebshilfe, die es unmittelbar und
                                ausschließlich für gemeinnützige, mildtätige
                                oder kirchliche Zwecke zu verwenden hat.
                            </li>
                            <li>
                                Für Streitigkeiten zwischen der Gesellschaft und
                                ihren Mitgliedern gilt Freiburg als
                                ausschließlich vereinbarter Gerichtsstand.
                            </li>
                        </ol>
                    </details>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Satzung;
