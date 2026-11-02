import staticAsset0 from "../images/faq.jpg";
import settings from "@settings";
import {
    contentBox,
    detailsContainer,
    headlineContainer,
    roundIcon
} from "@styles";
import { AppImage, ContentContainer, FlexBox } from "@ui";
import { Plus } from "lucide-react";
import React from "react";

const Faq: React.FC = () => {
    return (
        <ContentContainer id="haeufige-fragen">
            <div css={headlineContainer}>
                <h2>Häufige Fragen</h2>
                <p>Wohlfühlen - 12 Fragen an den Koloproktologen</p>
            </div>
            <FlexBox
                direction="row"
                align="stretch"
                justify="space-between"
                gap={settings.sizes.medium}
                changeToColumn
                hasFullWidth
            >
                <div css={contentBox()}>
                    <h3>Häufige Fragen</h3>
                    <h4>Enddarmbeschwerden</h4>
                    <p>
                        Hier werden die wichtigsten Fragen über Enddarmerkrankungen, wie das
                        Hämorrhoidalleiden, Thrombosen, Marisken, Fisteln sowie Erkrankungen
                        des Schließmuskels beantwortet.
                    </p>
                    <p>
                        Ursachen für Enddarmbeschwerden kann nur der Arzt feststellen und
                        eine Behandlung rechtzeitig einleiten. Wichtig ist die rechtzeitige
                        Vorstellung beim Arzt.
                    </p>
                </div>
                <div css={[contentBox(), { padding: 0 }]}>
                    <AppImage
                        src={staticAsset0} alt="Faq"
                        objectFit="cover"
                        css={{ width: "100%", height: "100%" }}
                    />
                </div>
            </FlexBox>
            <div css={detailsContainer}>
                <details>
                    <summary>
                        <h3>Unterschied äußere und innere Hämorrhoiden</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Im Afterkanal finden sich schwellkörperartige Gefäßpolster, die
                        neben dem Schließmuskel für den exakten Afterverschluss notwendig
                        sind (Feinkontinenz). Wenn sich diese Gefäßpolster vergrößern,
                        sprechen wir vom Hämorrhoidalleiden, umgangssprachlich
                        „Hämorrhoiden“.
                    </p>
                    <p>
                        Hautläppchen (Marisken) und schmerzhafte blaurote Knoten
                        (Analthrombosen) werden oft irrtümlich als „äußere“ Hämorrhoiden
                        bezeichnet. Diese gibt es aber gar nicht.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Müssen Hämorrhoiden immer behandelt werden ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Grundsätzlich wird nur das Hämorrhoidalleiden (Juckreiz, Nässen,
                        Brennen, Wundsein, Fremdkörpergefühl, Entzündungen der Haut,
                        Blutungen und Stuhlverschmutzung der Wäsche) behandelt. Vergrößerte
                        Hämorrhoiden, die keine Beschwerden machen, müssen nicht behandelt
                        werden.
                    </p>
                    <p>
                        Abzugrenzen sind Veränderungen am After: Hautfalten am After
                        (Marisken) hat etwa jeder zweite Erwachsene. Die Unterscheidung zu
                        ähnlichen Veränderungen wie Tumoren oder infektiösen Feigwarzen muss
                        der Fachmann treffen. Falls die Marisken keine Beschwerden machen,
                        werden sie nicht behandelt. Bei wiederholten Entzündungen oder
                        erschwerter Afterhygiene können sie abgetragen werden. Plötzlich
                        auftretende Analvenenthrombosen (harmlose Blutgerinnsel in den
                        äußeren Afteradern) sind schmerzhaft.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Wie häufig treten Hämorrhoiden auf ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Hämorrhoiden und andere Enddarmleiden sind außerordentlich weit
                        verbreitet. In Mitteleuropa leidet wohl jeder zweite Erwachsene
                        früher oder später unter Beschwerden des Enddarmes. Oft werden die
                        Beschwerden über einen langen Zeitraum verschwiegen. Aus falscher
                        Scham wird der Arzt nicht oder erst nach einer langen Leidenszeit
                        aufgesucht.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Warum können Hämorrhoiden heimtückisch sein ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Sie sind die häufigste Ursache für Enddarm-Beschwerden. Es können
                        sich jedoch auch andere schwerwiegende Erkrankungen hinter solchen
                        Beschwerden verbergen. Das ist wichtig! Sonst verzögert sich im
                        Vertrauen auf die &quot;Harmlosigkeit&quot; der Hämorrhoiden eine
                        frühzeitige Erkennung und Behandlung dieser anderen Erkrankungen,
                        z.B. von entzündlichen oder tumorartigen Veränderungen.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Kann aus Hämorrhoiden Krebs entstehen ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Aus Hämorrhoiden entsteht kein Krebs. Da aber die Symptome bei
                        Hämorrhoiden (z.B. Blut) auch bei anderen Enddarmerkrankungen
                        auftreten, müssen alle sogenannten
                        &quot;Hämorrhoidalbeschwerden&quot; ärztlich abgeklärt werden.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>
                            Was sind die Ursachen von Hämorrhoiden bzw. Hämorrhoidalleiden ?
                        </h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Die krankhafte Vergrößerung der Hämorrhoidalpolster mit den
                        nachfolgenden Hämorrhoidalbeschwerden hat mehrere Ursachen. Neben
                        der erblichen Belastung (sogenannte Bindegewebsschwäche) fördern u.
                        a. zu faser- bzw. ballaststoffarme Ernährung, starkes Pressen beim
                        Stuhlgang, insbesondere das &quot;Nachpressen&quot; und Abführmittel
                        (mit zu weichem Stuhl) die Vergrößerung von Hämorrhoiden. Alkohol,
                        Kaffee, scharfe Gewürze und &quot;kaltes Sitzen&quot; führen nicht
                        zu Hämorrhoiden. Bei bereits vorhandenem Hämorrhoidalleiden können
                        allerdings entsprechende Beschwerden dadurch ausgelöst oder
                        verstärkt werden.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>
                            Wie erkenne ich, ob ich Hämorrhoiden bzw. ein Hämorrhoidalleiden
                            habe ?
                        </h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Bei einem gestörten Feinverschluss des Afters kann Darmschleim in
                        den unteren Teil des Analkanals und nach außen auf die Haut
                        gelangen. Diese sehr empfindliche Zone wird gereizt, und es kommt zu
                        den typischen Beschwerden wie Juckreiz, Brennen, Wundsein und
                        Nässen. Die Haut kann sogar schmerzen. Die Blutung ist ein weiteres
                        charakteristisches Symptom: Beim Abwischen auf dem Papier, als
                        Blutauflagerung auf dem Stuhl oder tropfend. Hautausschläge (Ekzeme)
                        oder verschmutzte Wäsche durch Nachschmieren deuten auch auf
                        Hämorrhoiden hin, ebenso ein Druckgefühl im Afterkanal
                        (Fremdkörpergefühl). Diese Beschwerden sind aber leider nicht
                        spezifisch und treten auch bei Tumoren im Analkanal und Enddarm auf.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Kann ich mir bei Beschwerden selbst helfen ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Durch sogenannte Hämorrhoidalsalben, Analtampons und auch durch
                        Sitzbäder lassen sich diese Beschwerden lindern. Wichtig ist die
                        rechtzeitige Vorstellung beim Arzt!
                    </p>
                    <p>
                        Vorbeugend und zur Unterstützung der Enddarmbehandlung wird eine
                        ballastreiche Ernährung (z. B. Obst, Gemüse, Vollkornerzeugnisse,
                        Weizenkleie) empfohlen sowie ausreichend Flüssigkeit (möglichst 2
                        Liter täglich). Achten Sie auf eine richtige Stuhlentleerung,
                        vermeiden Sie Pressen, verzichten Sie unbedingt auf Abführmittel,
                        treiben Sie Bewegungssport, der den Beckenboden nicht belastet, wie
                        Schwimmen und Radfahren. Hilfreich ist eine sorgfältige Analhygiene
                        mit lauwarmem Wasser ohne Zusätze und anschließendem Trockentupfen,
                        ohne Reiben.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Wann sollte ich einen Arzt aufsuchen ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Wenn die Beschwerden trotz Selbstbehandlung nicht rasch abklingen -
                        spätestens nach 2-4 Wochen. Bei Blutungen, Schleimabsonderung und
                        Stuhlunregelmäßigkeiten sollte man einen Arzt umgehend aufsuchen.
                        Meist sind Hämorrhoiden Ursache für die Beschwerden, jedoch können
                        lebensbedrohliche Erkrankungen dahinterstecken. Eines steht fest:
                        Ursachen für Enddarmbeschwerden kann nur der Arzt feststellen – und
                        eine Behandlung rechtzeitig einleiten.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Ich habe Angst vor einer unangenehmen Behandlung</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Der Arzt wird zunächst ausführlich mit Ihnen Ihre Beschwerden
                        besprechen und daraus schon wichtige Schlüsse ziehen können.
                        Notwendige proktologische Untersuchungen sind lediglich ungewohnt,
                        selten unangenehm. Bei entsprechender Erfahrung des Arztes sind sie
                        aber ungefährlich und meist schmerzlos. Die Austastung mit dem
                        Finger ist äußerst wichtig und nicht belastend; sie gibt bereits
                        entscheidende Informationen über Art und Ausmaß einer Erkrankung:
                        Ausschluss von Tumoren, Schließmuskelschwäche u.a.
                    </p>
                    <p>
                        Bei der Afterspiegelung (Proktoskopie) wird der Analkanal mit einem
                        kleinen Rohr inspiziert. Nur hierdurch können Hämorrhoiden und ihre
                        Vergrößerung beurteilt werden. Mit dem Finger oder dem starrem
                        Mastdarmspiegel sind sie nicht zu erkennen. Die Mastdarmspiegelung
                        (Rektoskopie) gewährt Einsicht in den unteren Dickdarm, mit ihr
                        werden Entzündungen, Polypen oder auch Krebs ausgeschlossen.
                        Manchmal müssen die höheren Darmabschnitte mit einem biegsamen
                        Instrument, dem Koloskop, inspiziert werden (Darmspiegelung). Auch
                        diese Untersuchung erfolgt in der Regel ambulant. Bei Bedarf können
                        bei allen Spiegelungen Gewebeproben entnommen werden (Biopsie).
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Wie geht der Arzt bei einer Behandlung vor ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Mit Salben und Analtampons lassen sich allein oder
                        therapiebegleitend die Beschwerden lindern, nicht jedoch deren
                        Ursache, die erweiterten Hämorrhoiden, beseitigen. Die Art der
                        Behandlung richtet sich nach der Größe der Hämorrhoiden.
                        Hämorrhoiden ersten Grades (nur mit dem Proktoskop zu erkennen) und
                        Hämorrhoiden zweiten Grades – sie sind größer und rutschen nach dem
                        Vorfall noch allein in den Afterkanal zurück – werden mit einer
                        Verödung (Sklerosierung) behandelt oder einem kleinen Gummiring
                        wirkungsvoll abgebunden (Ligatur). Bei entsprechender Erfahrung des
                        Arztes sind die Verödung und die Gummibandligatur in der Regel
                        schmerzfrei und können ambulant durchgeführt werden. Die seltenen
                        dritt- oder gar viertgradigen Hämorrhoiden müssen meist operativ
                        saniert werden.
                    </p>
                </details>
                <details>
                    <summary>
                        <h3>Ist eine Hämorrhoiden-OP gefährlich ?</h3>
                        <div css={roundIcon}>
                            <Plus />
                        </div>
                    </summary>
                    <p>
                        Ihr Arzt wird Ihnen eine Operation je nach Schweregrad nur dann
                        empfehlen, wenn die anderen Verfahren keinen Erfolg versprechen.
                        Einzelne Hämorrhoiden können ambulant operiert werden. Ausgedehnte
                        Hämorrhoidalbefunde werden einen stationären Aufenthalt erfordern.
                        Bei unmittelbaren postoperativen Beschwerden wie Schmerzen,
                        Störungen beim Wasserlassen und Nachblutungen kann rasch geholfen
                        werden.
                    </p>
                    <p>
                        Um später ungewollten Stuhl- und Windabgang (lnkontinenz) zu
                        verhindern, sind für ausgeprägte Vorfälle besondere plastische
                        Operationsverfahren entwickelt worden. Spätfolgen, wie etwa
                        Schließmuskelschäden, sollten zu den extrem seltenen Ausnahmen
                        gehören.
                    </p>
                </details>
            </div>
        </ContentContainer>
    );
};

export default Faq;
