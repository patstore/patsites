/* eslint-disable max-len */
import { topline } from "@styles";
import { Button, SlideIn } from "@ui";
import React, { useState } from "react";

const BcdContent: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      css={{
        h2: {
          maxWidth: "100%",
        },
        h3: {
          marginTop: "42px",
          maxWidth: "100%",
        },
        p: {
          maxWidth: "100%",
        },
      }}
    >
      <div css={topline}></div>
      <h2>
        Willkommen im Berufsverband Coloproktologie Deutschland e.V. (BCD)!
      </h2>

      <p>
        Sehr geehrte Kolleginnen und Kollegen, liebe Mitglieder, Interessierte
        und Partner, wir freuen uns, Sie im Berufsverband Coloproktologie
        Deutschland (BCD), der Vereinigung der End- und Dickdarmspezialisten
        Deutschlands, herzlich begrüßen zu dürfen.
      </p>

      <p>
        Der BCD vereint seit vielen Jahren die Fachkompetenz von Ärztinnen und
        Ärzten, die sich der Diagnostik und Therapie koloproktologischer
        Krankheitsbilder widmen. Als berufsständische Interessenvertretung und
        fachlicher Zusammenschluss setzen wir uns dafür ein, die
        Rahmenbedingungen für optimale Patientenversorgung kontinuierlich zu
        verbessern und zugleich unseren Mitgliedern eine starke berufliche
        Heimat zu bieten.
      </p>

      <p>
        Die Koloproktologie ist ein anspruchsvolles und interdisziplinäres
        Fachgebiet, das nicht nur hohe medizinische Expertise, sondern auch eine
        enge interdisziplinäre Vernetzung erfordert. Hervorzuheben ist hier die
        enge Zusammenarbeit zwischen den einzelnen medizinischen Fakultäten:
        Chirurgie, Gastroenterologie, Urologie, Gynäkologie, Dermatologie,
        Allgemeinmedizin sowie der Anatomie.
      </p>

      <p>
        Der BCD versteht sich hierbei als zentrales Bindeglied zwischen Praxis,
        Klinik, Wissenschaft, Politik, Kostenträgern und Öffentlichkeit. Unsere
        Arbeit ist geprägt vom Anspruch, die Qualität der koloproktologischen
        Medizin in Deutschland zu sichern und weiterzuentwickeln - fachlich,
        organisatorisch und berufspolitisch.
      </p>

      <p>
        Im Folgenden möchten wir Ihnen einen Überblick über die Kernaufgaben und
        Ziele unseres Verbandes geben:
      </p>
      <Button text="Mehr Informationen über unsere Tätigkeiten" onClick={() => setOpen(true)} size="medium" />

      <SlideIn open={open} cancelButtonHandler={() => setOpen(false)}>
        <h3>Vertretung des Berufsstandes</h3>

        <p>
          Eine der wichtigsten Aufgaben des BCD ist die vertretungsstarke und
          kompetente Repräsentation des Berufsstandes gegenüber politischen
          Entscheidungsträgern, Kassenärztlichen Vereinigungen, Fachgesellschaften
          und weiteren Institutionen im Gesundheitswesen.
        </p>

        <p>
          <strong>
            Kurzgefasst bedeutet dies: Wir geben der Koloproktologie eine Stimme!
          </strong>
        </p>

        <p>
          Wir engagieren uns dafür, dass die besonderen Anforderungen unseres
          Fachgebietes in gesundheitspolitischen Diskussionen berücksichtigt
          werden, etwa bei Fragen der Versorgungsgestaltung, der Vergütung, der
          Qualitätsanforderungen oder der Weiterentwicklung medizinischer
          Strukturen. Der BCD nimmt Stellung zu Gesetzesvorhaben, arbeitet in
          Gremien und Arbeitsgruppen mit und setzt sich für faire, praxistaugliche
          Rahmenbedingungen ein.
        </p>

        <h3>
          Erarbeitung grundlegender beruflicher Standards und
          Handlungsempfehlungen
        </h3>

        <p>
          Eine weitere zentrale Aufgabe des Verbandes ist die Entwicklung,
          Definition und kontinuierliche Aktualisierung fachlicher und beruflicher
          Standards sowie Handlungsempfehlungen.
        </p>

        <p>
          <strong>Das heißt:</strong> Wir formulieren, welche strukturellen,
          organisatorischen und medizinischen Anforderungen für eine moderne und
          qualitativ hochwertige koloproktologische Versorgung unerlässlich sind.
        </p>

        <p>
          Dazu zählen beispielsweise Handlungsempfehlungen zur Hygiene,
          Praxisorganisation, Qualitätskriterien, leitliniennahe
          Behandlungsempfehlungen, praxisrelevante Standards in Diagnostik und
          Therapie sowie die Mitwirkung an Zertifizierungs- und
          Qualitätssicherungsmaßnahmen.
        </p>

        <p>
          Unser Ziel ist es, einheitliche und nachvollziehbare Rahmenbedingungen
          zu schaffen, die sowohl allen ärztlich Tätigen als auch den
          Patient*innen zugutekommen.
        </p>

        <p>
          Der BCD arbeitet in allen Fragen zu beruflichen Standards und
          Handlungsempfehlungen eng mit der Deutschen Gesellschaft für
          Koloproktologie (DGK) zusammen.
        </p>

        <h3>Interessenvertretung in der Öffentlichkeit</h3>

        <p>
          Als Berufsverband vertreten wir die Anliegen der Koloproktolog*innen
          auch gegenüber der breiten Öffentlichkeit.
        </p>

        <p>
          <strong>Das sieht konkret so aus:</strong> Wir informieren über das
          Fachgebiet, klären über typische Krankheitsbilder auf und schaffen
          Bewusstsein für die Bedeutung spezialisierter Versorgung.
        </p>

        <p>
          Hierzu gehören Pressearbeit, Informationskampagnen,
          Öffentlichkeitsveranstaltungen sowie die Zusammenarbeit mit
          Patientenorganisationen und Medien. Wir möchten damit dazu beitragen,
          Hemmschwellen abzubauen, Fehlinformationen zu vermeiden und das
          Vertrauen in die Kompetenz unseres Fachgebietes zu stärken.
        </p>

        <h3>
          Kompetenter Ansprechpartner bei Fragen der vertrags- und
          privatärztlichen Honorierung
        </h3>

        <p>
          Die Honorierung ärztlicher Leistungen ist ein komplexes Feld - sowohl im
          vertragsärztlichen als auch im privatärztlichen Bereich. Der BCD
          unterstützt seine Mitglieder als zuverlässiger, fachkundiger
          Ansprechpartner bei allen Fragen rund um EBM, GOÄ, Hybrid-DRG,
          Abrechnung, Wirtschaftlichkeit und vertragsrechtliche Rahmenbedingungen.
        </p>

        <p>
          Wir informieren regelmäßig über aktuelle Änderungen, bieten Beratung,
          unterstützen bei der Auslegung von Abrechnungsmodalitäten und setzen uns
          für eine angemessene Bewertung koloproktologischer Leistungen ein. Unser
          Ziel ist es, die ökonomischen Grundlagen einer hochwertigen
          Patientenversorgung zu sichern.
        </p>

        <h3>Fort- und Weiterbildung</h3>

        <p>
          Die kontinuierliche fachliche Weiterentwicklung ist für unser Fachgebiet
          unverzichtbar.
        </p>

        <p>
          Deshalb bietet der BCD ein breites Spektrum an Fort- und
          Weiterbildungsangeboten an, darunter:
        </p>

        <ul>
          <li>
            ein jährlich stattfindender Koloproktologen-Kongress mit Symposien und
            internationaler Beteiligung in enger Zusammenarbeit mit der deutschen
            Gesellschaft für Koloproktologie (DGK)
          </li>
          <li>praxisorientierte Workshops</li>
          <li>
            zertifizierte Fortbildungsveranstaltungen, insbesondere auch den
            &quot;Grundkurs Koloproktologie&quot;, der die theoretische Basis zum
            Erwerb der Zusatzbezeichnung &quot;Proktologie&quot; bildet
          </li>
          <li>digitale Lernformate</li>
          <li>
            Austauschmöglichkeiten mit Experten unterschiedlichster Bereiche
          </li>
        </ul>

        <p>
          Damit tragen wir dazu bei, dass unsere Mitglieder stets über aktuelle
          wissenschaftliche Erkenntnisse, technische Innovationen und bewährte
          Behandlungsmethoden informiert sind.
        </p>

        <h3>
          Unterstützung bei Hospitationen / Erwerb der Zusatzbezeichnung
          Proktologie
        </h3>

        <p>
          Ein besonderes Anliegen des Verbandes ist die Förderung kollegialen
          Austauschs und praktischer Lernerfahrungen.
        </p>

        <p>
          Wir unterstützen unsere Mitglieder bei der Organisation und Vermittlung
          von Hospitationen in spezialisierten Praxen und Kliniken. Damit
          ermöglichen wir Einblicke in unterschiedliche Behandlungs- und
          Versorgungsmodelle und fördern hiermit speziell den Erwerb praktischer
          Fähigkeiten, um die Voraussetzungen für den Erwerb der Zusatzbezeichnung
          Proktologie zu erhalten. Die persönliche Vernetzung innerhalb des
          Fachgebietes mit Hospitationen sind ein wichtiger Baustein, um die
          Qualität der koloproktologischen Versorgung nachhaltig zu sichern und
          weiterzuentwickeln.
        </p>

        <h3>Gemeinsam die Zukunft gestalten</h3>

        <p>
          Der BCD steht für Kompetenz, kollegiale Gemeinschaft und
          berufspolitisches Engagement. Wir möchten Sie herzlich einladen, sich
          aktiv in unseren Verband einzubringen, unsere Angebote zu nutzen und
          gemeinsam mit uns die Zukunft der Koloproktologie in Deutschland zu
          gestalten.
        </p>

        <p>Wir freuen uns auf die Zusammenarbeit und den Austausch mit Ihnen.</p>

        <p>
          <strong>
            Ihr Berufsverband Coloproktologie Deutschland e.V. (BCD)
          </strong>
        </p>

        <div style={{ marginTop: "2rem" }}>
          <p>
            <strong>Prof. Dr. med Dieter Bussen</strong>
            <br />
            Vorsitzender des BCD
          </p>
          <p>
            <strong>Prof. Dr. med. Heiner Krammer</strong>
            <br />
            Stellvertretender Vorsitzender des BCD
          </p>
        </div>
      </SlideIn>
    </div>
  );
};

export default BcdContent;
