import React from "react";

const deseases = [
  {
    key: 1,
    title: "Hämorrhoiden",
    text: "Im Afterkanal finden sich schwellkörperartige Gefäßpolster, die neben dem Schließmuskel für den exakten Afterverschluss notwendig sind (Feinkontinenz).",
    content: (
      <>
        <p>
          Im Afterkanal finden sich schwellkörperartige Gefäßpolster, die neben
          dem Schließmuskel für den exakten Afterverschluss notwendig sind
          (Feinkontinenz). Sie können sich vergrößern und dann Beschwerden
          auslösen, ein sogenanntes Hämorrhoidalleiden. Die Beschwerden umfassen
          Juckreiz, Nässen, Brennen, Wundsein, Fremdkörpergefühl, Entzündungen
          der Haut, Blutungen und Stuhlverschmutzung der Wäsche. Unkomplizierte
          Hämorrhoiden verursachen keine Schmerzen.
        </p>
        <p>
          Die Symptome des Hämorrhoidalleidens werden in den meisten Fällen
          &quot;konservativ&quot; mit Salben oder Zäpfchen gelindert. Eine
          Behandlung kann meistens ebenfalls &quot;konservativ&quot; durch
          Verödung (Sklerosierung) oder durch Abbinden (Gummiringligatur)
          erfolgen und ist in der Regel schmerzlos.
        </p>
        <p>
          Eine &quot;operative&quot; Therapie wird nur in wenigen Fällen bei
          einem weiter fortgeschrittenen Hämorrhoidalleiden erforderlich. Dabei
          kommen unterschiedliche Operationsverfahren zum Einsatz, die
          individuell und bezogen auf den jeweiligen Befund ausgewählt werden.
        </p>
      </>
    ),
  },
  {
    key: 2,
    title: "Analthrombose (perianale Venenthrombose)",
    text: "Analthrombosen, fälschlich &quot;äußere Hämorrhoiden&quot; genannt, sind schmerzhafte Knoten am Analrand, die durch Blutgerinnsel in den Venen am Afterrand entstehen.",
    content: (
      <>
        <p>
          Analthrombosen, fälschlich &quot;äußere Hämorrhoiden&quot; genannt,
          sind schmerzhafte Knoten am Analrand, die durch Blutgerinnsel in den
          Venen am Afterrand entstehen. Ursachen sind Druck auf den Beckenboden,
          z.B. durch schwer Heben, Pressen beim Stuhlgang oder ungewöhnliche
          körperliche Tätigkeit. Häufig treten Analthrombosen auch während
          Schwangerschaft und Entbindung auf.
        </p>
        <p>
          Zumeist reicht eine Behandlung mit Salben und Schmerzmitteln aus. Sie
          können aber auch bei starken Beschwerden in örtlicher Betäubung
          entfernt werden.
        </p>
      </>
    ),
  },
  {
    key: 3,
    title: "Marisken",
    text: "Hierbei handelt es sich um schmerzlose Hautläppchen oder Hautfalten am Afterrand, die im Volksmund als &quot;äußere Hämorrhoiden&quot; bezeichnet werden.",
    content: (
      <p>
        Hierbei handelt es sich um schmerzlose Hautläppchen oder Hautfalten am
        Afterrand, die im Volksmund als &quot;äußere Hämorrhoiden&quot;
        bezeichnet werden. Sie sind in der Regel harmlos, auch wenn sie
        gelegentlich anschwellen können. In Ausnahmefällen werden sie operativ
        entfernt.
      </p>
    ),
  },
  {
    key: 4,
    title: "Abszess",
    text: "Ein Abszess ist eine abgekapselte, eitrige Entzündung.",
    content: (
      <>
        <p>
          Ein Abszess ist eine abgekapselte, eitrige Entzündung. Die Entzündung
          geht häufig aus von Drüsen, die in der Wand des Afterkanals liegen.
          Dann entwickelt sich eine schmerzhafte Schwellung am Afterrand.
        </p>
        <p>
          Ein Abszess muss operativ eröffnet werden; es reicht nicht aus, ihn
          mit einem Antibiotikum oder &quot;Zugsalbe&quot; zu behandeln oder zu
          warten, bis er &quot;reif&quot; wird und sich spontan eröffnet.
          Ursache eines Abszesses kann eine Analfistel sein, die im Rahmen eines
          späteren Eingriffs beseitigt werden muss. Nur wenn diese Fistel
          aufgefunden und fachgerecht beseitigt wird, kann die Erkrankung
          ausheilen. Ansonsten kommt es immer wieder zu Abszessen.
        </p>
        <p>
          Andere Ursachen sind eine Entzündung von Haarfollikeln oder
          Talgdrüsen, dann liegt keine Fistel vor.
        </p>
      </>
    ),
  },
  {
    key: 5,
    title: "Analfissur (Afterriss)",
    text: "Ein Afterriss ist eine sehr schmerzhafte Erkrankung.",
    content: (
      <>
        <p>
          Ein Afterriss ist eine sehr schmerzhafte Erkrankung. Die Schmerzen
          treten bei der Stuhlentleerung auf und halten mitunter noch mehrere
          Stunden danach an.
        </p>
        <p>
          Man unterscheidet eine akute von einer chronischen Fissur. Die akute
          Fissur heilt in der Regel unter Anwendung von Salben aus. Die
          chronische Fissur zeigt Vernarbungen und Wulstbildungen, in denen sich
          immer wieder Entzündungen abspielen können. Sie muss darum häufig
          operiert werden. Dabei wird das gesamte Narbengewebe abgetragen. Die
          Wunde bleibt anschließend offen und heilt innerhalb einiger Wochen
          wieder aus.
        </p>
      </>
    ),
  },
  {
    key: 6,
    title: "Analfistel",
    text: "Analfisteln sind eitergefüllte Gänge zwischen dem Afterkanal und der Afterumgebung.",
    content: (
      <>
        <p>
          Analfisteln sind eitergefüllte Gänge zwischen dem Afterkanal und der
          Afterumgebung. Aus der äußeren Öffnung entleert sich ein eitriges
          Sekret. Die Fistel und der Abszess sind im Prinzip die gleiche
          Erkrankung: Der Abszess ist die akute Form und die Fistel die
          chronische Form.
        </p>
        <p>
          Bei der operativen Freilegung einer Fistel wird regelhaft ein Teil der
          Schließmuskulatur durchtrennt. Dies ist bei der überwiegenden Zahl der
          Patienten nicht mit einer Schwächung der Haltekraft verbunden. Bei
          höher gelegenen Fisteln wird die innere Fistelöffnung verschlossen
          bzw. der Schließmuskel genäht.
        </p>
      </>
    ),
  },
  {
    key: 7,
    title: "Pilonidalsinus (Steißbeinfistel)",
    text: "Der Begriff der Steißbeinfistel ist nicht richtig.",
    content: (
      <>
        <p>
          Der Begriff der Steißbeinfistel ist nicht richtig. Es handelt sich
          nicht um eine Fistel ausgehend vom Steißbein, sondern nur um eine
          Entzündung der Haut und des Unterhautfettgewebes über der
          Steißbeinregion. Zumeist kommt es zu einer Eiteransammlung und in
          diesem Abszess finden sich dann von außen eingedrungene Haare.
        </p>
        <p>
          Ein solcher Pilonidalsinus sollte operativ entfernt werden.
          Grundsätzlich kann man den Befund operativ entfernen und die Wunde
          offen ausheilen lassen. Als neuere Technik können nur die Eingänge
          (engl. &quot;pits&quot;) der Haare ausgestanzt werden, sog. Pit
          picking. Als Alternative kann man den Befund ausschneiden und die
          Wunde nach besonderen Kriterien wieder verschließen. Die offene
          Wundbehandlung dauert zwar länger, sie führt aber etwas seltener zum
          Wiederauftreten der Entzündung.
        </p>
      </>
    ),
  },
  {
    key: 8,
    title: "Analekzem",
    text: "Als Analekzem wird eine entzündliche Hauterkrankung der Afterumgebung bezeichnet.",
    content: (
      <>
        <p>
          Als Analekzem wird eine entzündliche Hauterkrankung der Afterumgebung
          bezeichnet. Es wird ausgelöst durch eine Schädigung der Haut durch
          Sekretabgänge aus dem After bei einem Hämorrhoidalleiden oder
          beispielsweise einer Fistel oder einer Stuhlinkontinenz.
        </p>
        <p>
          Seltener findet sich ein Analekzem auf dem Boden einer Allergie oder
          einer besonderen Empfindlichkeit der Haut. Die Behandlung erfolgt in
          Abhängigkeit von der auslösenden Ursache.
        </p>
        <p>
          Eine sinnvolle Analhygiene unterstützt durch Sitzbäder oder Cremes
          führt schnell zum Rückgang des Ekzems. Bei allergischer Ursache sind
          Hauttests zur Klärung der Ursache erforderlich. Eine Schuppenflechte
          (Psoriasis) in der Analregion zeigt ein ähnliches Bild wie ein
          Analekzem.
        </p>
      </>
    ),
  },
  {
    key: 9,
    title: "Feigwarzen (Condylomanta acuminata)",
    text: "Feigwarzen sind das Ergebnis einer Virusinfektion (HPV – Humanes Papilloma Virus) der Afterregion, die typischerweise durch Geschlechtsverkehr übertragen werden kann.",
    content: (
      <>
        <p>
          Feigwarzen sind das Ergebnis einer Virusinfektion (HPV – Humanes
          Papilloma Virus) der Afterregion, die typischerweise durch
          Geschlechtsverkehr übertragen werden kann.
        </p>
        <p>
          Die Therapie erfolgt entweder mit Salben oder - bei entsprechender
          Ausprägung - durch die operative Abtragung der Viruswarzen. Um das
          Wiederauftreten zu vermeiden, muss der Sexualpartner ebenfalls
          behandelt werden, falls auch er Viruswarzen hat.
        </p>
        <p>
          Gegen den HP Virus sollten alle Kinder zwischen dem 9. und 14.
          Lebensjahr, spätestens bis zum 17. Lebensjahr geimpft werden, dann
          treten die Feigwarzen regelhaft nicht mehr auf.
        </p>
      </>
    ),
  },
  {
    key: 10,
    title: "Stuhlhalteschwächen",
    text: "Eine Inkontinenz zeigt sich als Schwäche des Afterverschlusses.",
    content: (
      <p>
        Eine Inkontinenz zeigt sich als Schwäche des Afterverschlusses.
        Hierdurch kann die Stuhlentleerung nicht mehr exakt kontrolliert werden.
        Es kommt dazu, dass die Winde nicht mehr kontrolliert werden können oder
        dass die Afterumgebung mit Stuhl oder Darmschleim verschmutzt ist. Es
        gibt unterschiedliche Ursachen für eine Inkontinenz. Hier sollte
        frühzeitig die richtige Diagnose gestellt werden, um durch die
        sachgerechte Behandlung eine unbeeinträchtigte Lebensqualität zu
        erhalten.
      </p>
    ),
  },
  {
    key: 11,
    title: "Darmpolypen",
    text: "Polypen im Darm sind definiert als gutartige Wulstbildungen in der Schleimhaut.",
    content: (
      <p>
        Polypen im Darm sind definiert als gutartige Wulstbildungen in der
        Schleimhaut. Bei längerem Bestehen können einige dieser Polypen zum
        Darmkrebs entarten. Sie gelten darum als Krebsvorstufen. Bei der
        Vorsorgekoloskopie zur Früherkennung von Darmkrebs werden diese Polypen
        endoskopisch abgetragen. Hierdurch wird der Entstehung eines Darmkrebses
        vorgebeugt.
      </p>
    ),
  },
  {
    key: 12,
    title: "Darmkrebs (Kolonkarzinom, Rektumkarzinom",
    text: "Der Darmkrebs stellt eine häufig vorkommende bösartige Erkrankung dar.",
    content: (
      <p>
        Der Darmkrebs stellt eine häufig vorkommende bösartige Erkrankung dar.
        Er entwickelt sich meist aus gutartigen Vorstufen, den sogenannten
        Polypen. Im Rahmen der Vorsorgekoloskopie zur Früherkennung von
        Darmkrebs werden alle vorhandenen Polypen endoskopisch entfernt.
        Hierdurch kann die Entstehung von Darmkrebs verhindert werden. In
        Deutschland ist die Vorsorgekoloskopie für die gesetzlich versicherten
        Frauen ab dem 55., für Männer ab dem 50. Lebensjahr vorgesehen. Wird
        dabei eine Krebserkrankung festgestellt, ist eine weitergehende Therapie
        erforderlich, die neben einer Operation in besonderen Fällen auch eine
        Chemotherapie und/oder Bestrahlung umfassen kann.
      </p>
    ),
  },
  {
    key: 13,
    title: "Afterkrebs (Analkarzinom)",
    text: "Der Krebs des Afters stellt eine relativ seltene Erkrankung dar.",
    content: (
      <p>
        Der Krebs des Afters stellt eine relativ seltene Erkrankung dar. Wichtig
        ist der frühzeitige Nachweis. Die Therapie unterscheidet sich von der
        des Darmkrebses. In der Mehrzahl der Fälle erfolgt keine große
        Bauchoperation, sondern entweder eine lokale Ausschneidung oder eine
        kombinierte Behandlung mit Chemotherapie und Bestrahlung.
      </p>
    ),
  },
  {
    key: 14,
    title: "Mastdarmvorfall",
    text: "Der Mastdarmvorfall zeigt sich als eine Ausstülpung des Mastdarms durch den Afterkanal bis nach außen.",
    content: (
      <p>
        Der Mastdarmvorfall zeigt sich als eine Ausstülpung des Mastdarms durch
        den Afterkanal bis nach außen. In der Frühphase dieser gutartigen
        Erkrankung empfinden die Betroffenen ein Druckgefühl im Beckenboden und
        eine erschwerte Entleerung des Darmes. Bei längerem Bestehen kann sich
        eine Inkontinenz entwickeln. Der Mastdarmvorfall wird in der Frühphase
        häufig übersehen, da er nur bei stärkerem Pressen austritt. Er sollte
        aber rechtzeitig vor dem Auftreten einer Inkontinenz operativ behandelt
        werden.
      </p>
    ),
  },
  {
    key: 15,
    title: "Verstopfung (Obstipation)",
    text: "Über eine Verstopfung klagen sehr viele Patienten.",
    content: (
      <>
        <p>
          Über eine Verstopfung klagen sehr viele Patienten. Dabei handelt es
          sich aber nur selten um einen krankhafte Situation. Der Patient
          bemerkt lediglich, dass die Entleerung zu selten erfolgt oder der
          Stuhl zu hart ist. Diese Störungen sind oft abhängig von der Ernährung
          und auch der körperlichen Aktivität.
        </p>
        <p>
          Es gibt aber in einzelnen Fällen durchaus behandlungsbedürftige
          Störungen, wobei es sich zum einen um eine verlängerte Transportzeit
          des Darminhalts durch den Darmtrakt handelt und zum anderen um
          Probleme mit der reflexhaften Entleerung des Enddarms.
        </p>
        <p>
          Im letztgenannten Fall kommt es dann zur vermehrten Stuhlansammlung im
          Enddarm, die der Patient als ein Druckgefühl verspürt. Der
          Koloproktologe berät den betroffenen Patienten und gibt Tipps zu
          Ernährung und Entleerungshilfen. Medikamentöse und operative Maßnahmen
          sind nur selten bzw. extrem selten zu empfehlen.
        </p>
      </>
    ),
  },
  {
    key: 16,
    title: "Durchfallsneigung (Diarrhoe)",
    text: "Durchfälle treten aus unterschiedlichen Ursachen relativ häufig auf.",
    content: (
      <p>
        Durchfälle treten aus unterschiedlichen Ursachen relativ häufig auf. In
        der Mehrzahl der Fälle handelt es sich dabei um eine Darminfektion durch
        Viren oder Bakterien, die spontan wieder ausheilt (z.B. Reisediarrhoe).
        Aber auch Nebenwirkungen von Medikamenten und andere Erkrankungen können
        für Durchfälle verantwortlich sein. Daher sollte bei über mehrere Wochen
        anhaltenden Durchfällen und/oder beim Auftreten schwerwiegender
        Begleitprobleme wie Fieber, Blutabgängen oder anhaltenden Bauchschmerzen
        eine Abklärung der Ursache beispielsweise mittels Stuhlproben und einer
        Koloskopie erfolgen.
      </p>
    ),
  },
] as const;

export default deseases;
