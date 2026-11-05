import React from "react";
import settings from "@settings";
import { Layout } from "@components";
import { FlexBox, HeadContent, SectionDivider } from "@ui";
import { wrapper } from "@styles";
import { siteContainer } from "../../styles/styles";

const Chronik = () => {
  const dateHandler = () => {
    const today = new Date();
    const former = new Date("1897");
    const dateDifference = today.getFullYear() - former.getFullYear();
    return dateDifference;
  };

  return (
    <Layout>
      <div css={wrapper}>
        <HeadContent
          titel="Unsere Chronik"
          titeltext={`Die Geschichte unseres Vereins reicht bis ins 19. Jahrhundert. \t Wir blicken auf die letzten ${dateHandler()} Jahre zurück.`}
        />

        <div css={siteContainer}>
          <FlexBox
            direction="column"
            align="center"
            justify="space-between"
            styles={{
              padding: settings.padding.large,
              h2: { marginTop: "2em" },
            }}
          >
            <SectionDivider title="Chronik" />
            <div>
              <h2>2003</h2>
              <p>
                Das Jahr fängt munter an: Der Vorstand erstellt ein Notprogramm
                für die Abteilungen, die eigentlich in der Sporthalle der
                Schneeburg-Schule trainieren, die aber aufgrund der
                Dachsanierung dort nicht ihren Übungsbetrieb abhalten können. Ab
                dem 10.02.2003 dann auch hier Entwarnung: die Dachsanierung ist
                abgeschlossen.
                <br />
                Neues Ungemach droht jetzt bei der Festhalle: Der Parkettboden
                ist zu weich und muss unter Umständen herausgerissen und
                erneuert werden. Eigentlich soll auch noch in diesem Jahr die
                Sanierung der Festhalle (Küche, Umkleiden, Toiletten,
                Geräteräume und Bühne) beginnen – die prekäre Haushaltslage der
                Stadt Freiburg macht es aber spannend……….. Zudem verfügt die
                Stadt Freiburg ein generelles Rauchverbot in der Festhalle. Die
                Gemüter in St. Georgen kochen hoch und teilen den Stadtteil in
                zwei Lager. Die Reblaus-Zunft sagt daraufhin den St. Georgener
                Fasnetsumzug ab. Unsere Erste Vorsitzende, Brigitte Lorenz,
                nimmt an einer Fernseh-Diskussion zu diesem Tema bei FR TV im
                Februar teil. Die Turnerfasnet findet aber trotz dem Rauchverbot
                statt.
                <br />
                Die Mitgliederzahlen steigen auf rd. 1.500 an. Der
                Internet-Auftritt des TV wurde komplett neu gestaltet und steht
                seit Anfang des Jahres im world wide web: www.tvstg.de
              </p>
              <h2>2002</h2>
              <p>
                Die Einführung des (T)Euro zeigt sich auch bei den neuen
                Beiträgen – aber auch die Übungsleiter-/innen-Vergütungen wurden
                angepasst. Das TurnerEcho erscheint im 50. Jahrgang und der TV
                ist beim Deutschen Turnfest in Leipzig präsent.
                <br />
                Die Handball-Abteilung des TV wird 75 Jahre und veranstaltet am
                21. September einen Festabend in der Festhalle St. Georgen
                (leider ein Geheimtipp). Die Mitgliederzahlen steigen weiter auf
                rd. 1.400 an.
                <br />
                Hallenprobleme stehen im Herbst und Winter an: Die Festhalle
                erhält einen neuen Hallenboden. Dadurch muss auch die
                Nikolausfeier abgesagt werden. Die Abteilungen, die in der
                Festhalle trainieren sollen teilweise in der Schneeburg-Halle
                untergebracht werden – doch dann kommt es knüppeldick: das
                undichte Dach der Sporthalle der Schneeburg-Schule wird saniert
                und im November / Dezember kommt Das sportliche Angebot fast zum
                Erliegen. Entwarnung dann vor Weihnachten in der Festhalle: die
                Sanierung des Bodens ist abgeschlossen.
              </p>

              <h2>2001</h2>
              <p>
                Das Attentat vom 11. September überschattete das Jahr. Die
                Einführung des Euro erforderte eine Beitragsänderung ab dem Jahr
                2002, der die Mitgliederversammlung am 30. März zustimmte.
                Besuch des Landesturnfestes in Konstanz.
              </p>

              <h2>1999</h2>
              <p>
                TV mit Motivwagen beim Fasnachtsumzug in St. Georgen und beim
                Rosenmontags-Umzug in der Stadt. Ausrichtung der Süddeutschen
                Prellball-Meisterschaften. Aktionstag Herz und Gesundheit im
                Bürgerhaus Seepark. Swim and Run des TV im Rahmen des St.
                Georgener Schwimmbadfestes. Teilnahme beim Sport-Night-Event der
                Stadt Freiburg mit dem Sportkreis Freiburg im Seepark.
                <br />
                Die Mitgliederzahlen gehen auf die 1.300 zu. Neue Sportangebote
                Freizeit-Volleyball-Gruppe für Frauen, Volleyball für
                Jugendliche, Wirbelsäulengymnastik, Herzsportgruppe
                (Koronargruppe), Walking, Kletter- und Bewegungsgruppe, ……..
                <br />
                Möglich wurde die Erweiterung der Angebotspalette auch dadurch,
                dass die Sporthalle der Karoline-Kaspar-Grundschule im Stadtteil
                Vauban neu gebaut wurde und der TV hier Stunden von der Stadt
                Freiburg erhalten hat – nicht zuletzt dank der Beharrlichkeit
                des Vorstandes. Außerdem neu: die Freisportanlage der
                Staudinger-Schule für die Abteilung Leichtathletik des TV
                (Umkleide-/ Geräteräume sowie sanitäre Anlagen kommen erst 2001
                dazu).
              </p>
              <h2>1998</h2>
              <p>
                „Rien ne va plus“ trifft die Gemütslage: erst einmal
                durchschnaufen. Aber zu den üblichen Veranstaltungen
                (Turnerfasnet, Programmpunkte beim Gemeinschaftsabend,
                Jahreshauptversammlung, 1. Mai: Turnerhock am Ehrenmal, St.
                Georgener Weintage mit Handball-Weinfestturnier,
                Vereinsmeisterschaften und die Nikolausfeier) kamen dann doch
                die Ausrichtung der Badischen Prellball-Meisterschaften und der
                Besuch des Deutschen Turnfestes in München – und für die
                Orts-Chronik: die Wiedereröffnung des Freibades St. Georgen am
                06./07.06.1998.
                <br />
                Der Zweite Vorsitzende, Oskar Moser, scheidet aus diesem Amt aus
                und wird ersetzt durch Eberhard Dirner. Oskar Moser bleibt aber
                dem Vorstand erhalten und wird Ehrenvorsitzender.
                <br />
                Der Dritte Vorsitzende, Klaus Kretzdorn scheidet aus seinem Amt
                aus. Neuer Dritter Vorsitzender wird Michael Eck.
              </p>
              <h2>1997</h2>
              <p>
                Auftakt des Jubiläumsjahres „100 Jahre Turnverein Freiburg-St.
                Georgen e.V.“ unter dem Motto 100 Jahre jung mit Schwung mit
                einem festlichen Silvesterball in der Festhalle St. Georgen.
                Höhepunkt war das Festwochenende vom 10. bis 12. Oktober 1997.
                Am 10.10. begann das Festwochenende mit einem Bankett, am 11.10.
                folgte eine Sport-Gala mit Tanz und am 12.10. endete das
                Festwochenende mit einem Festgottesdienst in der Kirche St.
                Georg und anschließendem Frühschoppen in der Festhalle.
                Anlässlich des Jubiläums erschien eine Festschrift.
                <br />
                Weitere Veranstaltungen: Der TV richtete die Deutschen
                Prellball- Jugend- Meisterschaften aus, veranstaltete ein
                Kinderfest im THG, einen Seniorennachmittag und eine Jugendfete.
                Dazu kam noch der Besuch des Landesturnfestes in Karlsruhe. Der
                Turnverein erhielt die Sportplakette des Bundespräsidenten,
                zahlreiche verdiente Mitglieder erhielten Ehrennadeln und
                Auszeichnungen.
              </p>
              <h2>1996</h2>
              <p>
                Die M 50 werden Bad. Prellball-Meister. Die Damen steigen in die
                1. Bundesliga auf und die M1 in die 2. Bundesliga ab. Die
                Mitgliederzahlen der letzten Jahre bewegten sich konstant
                zwischen 1.100 und 1.200.
                <br />
                Das 100. Jubiläumsjahr des TV wird mit einem festlichen
                Silvesterball in der Festhalle St. Georgen eingeläutet.
              </p>
              <h2>1995</h2>
              <p>
                Die DAK veranstaltet, in Zusammenarbeit mit dem TV,
                Gesundheitskurse. Das Vorschulturnen wird gemischt. Der TV
                veranstaltet im Freibad St. Georgen ein Spektakel um für den
                Erhalt dieses Bades zu kämpfen. Die Prellball-Mädchen werden
                Bad. Meister und belegen den 6. Platz in der Dt. Meisterschaft.
                Die MI steigen in die 1. Prellball-Bundesliga auf.
                Spielgemeinschaft der Handballabteilung mit dem ESV Freiburg.
              </p>
              <h2>1994</h2>
              <p>
                Oskar Moser erhält die Sport-Verdienstmedaille der Stadt
                Freiburg. Der TV richtet die Bad. Prellball-Meisterschaften aus.
                Durch die Einführung einer Hallenmiete der Stadt Freiburg wird
                eine Erhöhung der Mitgliedsbeiträge notwendig. Am 1. Mai richtet
                der TV den Landeswandertag des BTB mit über 600 Teilnehmern aus.
                Gründung der Abteilung Aerobic. Am Dt. Turnfest in Hamburg nimmt
                der TV mit 75 Mitgliedern teil. Gründung des Förderstützpunktes.
                Corina Hauger wird Bad. Meisterin und belegt den 3. Platz der
                Dt. Meisterschaften. Die B-Jugend der Handball-Mädchen wird
                Südbad. Meister
              </p>
              <h2>1993</h2>
              <p>
                Die Männer 50 und die weibl. Jugend werden Bad.
                Prellball-Meister. Corina Hauger wird Bad. Mehrkampfmeisterin
                und erhält dafür die Bronzene Sportmedaille der Stadt Freiburg.
              </p>
              <h2>1992</h2>
              <p>
                Seit 40 Jahren erscheint das Turnerecho. M50 und MI werden Bad.
                Meister im Prellball. Die Männer 50 werden Süddt.
                Prellballmeister. Der TV richtet den 33. Gauturntag des
                Breisgauer Turntages aus. In Pforzheim findet das 41.
                Landesturnfest statt an dem der TV auch teilnimmt. Corina Hauger
                wird Bad. Mehrkampfvizemeisterin. Erstmals veranstaltet der TV
                wieder erfolgreich eine &#8222;Turnerfasnet&#8220;. Die
                Jugendabteilung wird gegründet. 1. Vorsitzender ist Tobias Salb.
                Die MI steigen in die 2. Bundesliga ab.
              </p>
              <h2>1991</h2>
              <p>
                Die Prellball MI und MIV werden Bad. Meister. Gründung der
                Lauftreff-Gruppe für Erwachsene. Corina Hauger wird Bad.
                Mehrkampfmeisterin. Robert Rantzuch erhält die Verdienstmedaille
                des Verdienstordens der BRD. Die Volleyballer nehmen an der
                Freizeitrunde teil.
              </p>
              <h2>1990</h2>
              <p>
                erstmalig wird eine Frau: Brigitte Lorenz, und zwar einstimmig
                zur Ersten Vorsitzenden des Turnvereins gewählt. Die
                Prellball-Abteilung ist Ausrichter der Bad. Meisterschaften und
                M50. Die MI werden Bad. Meister. Pia Schrörs wird Bad.
                Vizemeisterin und Kreiscrossläuferin, Bad. Schülermeisterin über
                2.000 m und Gesamtsieger der Crosslaufserie. Kai Braun wird
                Kreiscrosslaufmeister und Gesamtsieger der Crosslaufserie.
                Erneut veranstaltet der TV einen &#8222;Tag der offenen
                Tür&#8220;. Die Handballer steigen in die Bezirksliga auf. Beim
                Dt. Turnfest in Bochum/Dortmund ist der TV mit 45 Teilnehmern
                dabei. Der TV veranstaltet mit der SG Halle-Neustadt (Damals
                noch &#8222;DDR&#8220;) ein gemeinsames Jugendturncamp.
              </p>
              <h2>1987</h2>
              <p>
                wird unter der Schirmherrschaft von Oberbürgermeister Dr. Böhme
                der 90. Geburtstag des Turnvereins, der inzwischen weit über
                1000 Mitglieder zählt, zu einem ganz besonderen Ereignis. Viele
                St.Georgener Vereine wirken bei der Festveranstaltung mit.
                Anlässlich des Jubiläums wird eine Festschrift herausgegeben.
              </p>
              <h2>1986</h2>
              <p>
                In der Jahreshauptversammlung wird Dr. Hans-Jürgen Schroers zum
                neuen 1. Vorsitzenden gewählt. Unter seinem Vorsitz und mit
                tatkräftiger Unterstützung von Oskar Moser und dem restlichen
                Vorstand und Turnrat wird die 1200-Jahr-Feier von St.Georgen mit
                vorbereitet. Ein Jahr später,
              </p>
              <h2>1984</h2>
              <p>
                Nach 21-jähriger Amtszeit, der längsten in der Geschichte des
                Vereins, kann Heiner Mutter aus gesundheitlichen Gründen die
                vielfältigen Pflichten und Aufgaben eines Vorsitzenden nicht
                mehr weiter tragen. Oskar Moser, der Stellvertretende
                Vorsitzende, übernimmt für die nächsten zwei Jahre kommissarisch
                die Leitung des TV.
              </p>
              <h2>1972</h2>
              <p>
                Der &#8222;Turnverein Freiburg St.Georgen von 1897 e.V.&#8220;
                feiert im großen Rahmen sein 75-jähriges Bestehen.
                Regierungspräsident Dr. Person, Oberbürgermeister Dr. Keidel und
                Persönlichkeiten des Badischen und des Breisgauer Turnerbundes
                würdigen die Verdienste und Leistungen des aus kleinen Anfängen
                heraus gewachsenen Turnvereins. Eine Jubiläumsfestschrift wird
                vom TV herausgegeben.
              </p>
              <h2>1963</h2>
              <p>
                wird Heinrich Mutter zum Nachfolger Willi Beckmanns gewählt.
                Unter seiner Führung gelangt der TV zu neuer Blüte. Bald schon
                müssen wegen den inzwischen über 900 Mitgliedern neue
                Übungsleiter gewonnen wer-den. Diese und die bisherigen
                Turnwarte/Übungsleiter erhalten nun erstmals &#8211; ein Trend
                der Zeit &#8211; kleine Aufwandsentschädigungen aus der
                Vereinskasse.
              </p>
              <h2>1954</h2>
              <p>
                von Vereinsmitgliedern zum Gedenken an die verstorbenen
                Turnschwestern und -brüder errichtete Ehrenmal am Fuße des
                Schönbergs. Das für viele St.Georgener attraktive Angebot des TV
                spiegelt sich in dem auf inzwischen über 500 Mitglieder
                angewachsenem Verein wider.
              </p>
              <h2>1952</h2>
              <p>
                das erste Mitteilungsblatt des Turnvereins, das spätere
                &#8222;Turner Echo&#8220;, für das er über 15 Jahre lang
                verantwortlich zeichnet. Im gleichen Jahr wird das 50-jährige
                Vereinsjubiläum nachgeholt, das wegen des Verbotes der
                Besatzungsmächte 1947 nicht gefeiert werden durfte.
                &#8222;Unseren Toten zur Ehr&#8220;, diese Inschrift trägt das
              </p>
              <h2>1950</h2>
              <p>
                darf diese Sportgemeinschaft wieder aufgelöst werden. Gottfried
                Keller beruft eine Gründungsversammlung des alten TV ein, bei
                der Willi Beckmann zum 1. Vorsitzenden gewählt wird. Er
                bekleidet dieses Amt 12 Jahre lang. Auf Initiative von Theodor
                Steiert entsteht
              </p>
              <h2>1946</h2>
              <p>
                genehmigt der Kontrollrat die Bildung eines
                &#8222;Allsportvereins&#8220;, dem sich der ehem.
                Athletenverein, Fußballverein und Turnverein anschließen. Die
                Eigenständigkeit der Abteilungen bleibt unter August Bank jedoch
                erhalten. Erst vier Jahre später
              </p>
              <h2>1938</h2>
              <p>Zwangsweise Eingemeindung von St.Georgen zu Freiburg.</p>
              <h2>1937</h2>
              <p>
                in großem Rahmen in Verbindung mit einem Kreistreffen der Turner
                und Leichtathleten gefeiert wird. Theodor Steiert mobilisiert
                über 500 Wettkämpfer. Er bleibt als 1. Vorsitzender bis zum
                Kriegsende als die Besatzungsmächte alle Vereine auflösen.
              </p>
              <h2>1930</h2>
              <p>
                Gründung der Buslinie St.Georgen &#8211; Freiburg.
                <br />
                Ein besonderer Höhepunkt der 30er Jahre ist das 40-jährige
                Jubiläum, das im Juni
              </p>
              <h2>1926</h2>
              <p>
                wird die neu erbaute Turn- und Festhalle Heimstatt für den regen
                Übungsbetrieb. In den Folgejahren leiten K. Marzluf, Wilhelm
                Troll, Albert Brecht und Adolf Salb als jeweils 1. Vorsitzende
                die Geschicke des nun stetig wachsenden Turnvereins.
              </p>
              <h2>1925</h2>
              <p>Einwohnerzahl St.Georgen 2.639 (heute über 12.000)</p>
              <h2>1922</h2>
              <p>
                Im Geburtsjahr von Ludwig Erhard, die Einwohnerzahl von Freiburg
                lag bei rd. 60.000, die rasche Zunahme der Stadtbevölkerung
                erfordert den Bau einer zweiten Wasserleitung zur Brunnenstube
                im Sternwald, erfolgte die Vereinsgründung zum Zwecke der
                Körperertüchtigung, Leibesübungen sowie als Erziehungs- und
                Gesinnungsgemeinschaft eingedenk Turnvater Jahn. Heribert
                Schitterer gründet mit vier Gleichgesinnten den Turnverein St.
                Georgen. Barren und Reck werden in Eigenbau hergestellt, Frei-
                und Stabübungen ergänzen das Turnprogramm. Der junge Verein
                gewinnt recht schnell neue begeisterte Mitglieder, und mit viel
                Mut veranstalten sie
              </p>
              <h2>1919</h2>
              <p>
                der Turn- und der Athletenverein zu einer Notgemeinschaft unter
                Fritz Schlegel zusammen und ein Jahr später übernimmt Friedrich
                Güth die Vereinsführung. Mit steigenden Mitgliederzahlen gehen
                die beiden Vereine bald wieder eigene Wege und der TV wird
                geründet eine Damenriege sowie Handball- und
                Leichtathletik-Abteilungen.
              </p>
              <h2>1912</h2>
              <p>
                den Vereinsvorsitz übernahm und Franz Mohr als Oberturnwart eine
                starke Turnabteilung mit etwa 30 Männern aufbaute. Damals war
                das Turnen noch eine reine Männersache. Turnstätten waren damals
                im Sommer der alte Schulhof und im Winter bei Petroleumlicht in
                der alten Scheune von Herrn Kleinhanssen., Vater des
                Ehrenmitgliedes Hermann Kleinhans. Während des 1. Weltkrieges
                hält Hermann Roth als 1. Vorsitzender mit wenigen verbliebenen
                Aktiven, aber vielen Jugendlichen den Turnbetrieb aufrecht. In
                der schlechten Zeit nach dem Kriege schließen sich
              </p>
              <h2>1899</h2>
              <p>
                ein erstes Schauturnen mit anschließendem großem Gartenfest für
                das noch kleine aber eigenständige Dorf St.Georgen. Leider
                fehlen für einige Folgejahre Aufzeichnungen, aber es ist
                überliefert, daß Adolf Eckert
              </p>
              <h2>1897</h2>
              <p>
                Immer mehr Turnvereine wurden gegründet und schafften so breite
                Basen sportlicher Betätigung.
              </p>
            </div>
          </FlexBox>
        </div>
      </div>
    </Layout>
  );
};
export default Chronik;
