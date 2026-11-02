import settings from "@settings";
import { MultiContentElement } from "@ui";
import React from "react";

const additional_title: MultiContentElement[] = [
  {
    label: "Definition",
    value: "definition",
    content: (
      <p>
        Die Zusatzweiterbildung Proktologie umfasst in Ergänzung zu einer
        Facharztkompetenz die Vorbeugung, Erkennung, Behandlung und
        Rehabilitation von Erkrankungen, Verletzungen, Formveränderungen und
        funktionellen Störungen des Mastdarms, des Afters, des Kontinenzorgans,
        der Beckenbodenmuskulatur, von Analekzemen, anorektalen
        Geschlechtskrankheiten und analen Dermatosen.
      </p>
    ),
  },
  {
    label: "Weiterbildungsziel",
    value: "weiterbildungsziel",
    content: (
      <p>
        Ziel der Zusatzweiterbildung ist die Erlangung einer fachlichen
        Kompetenz in der Proktologie nach Ableistung von vorgeschriebener
        Weiterbildungszeit und Weiterbildungsinhalten. Voraussetzung zum Erwerb
        der Bezeichnung: Facharztanerkennung für Allgemeine Chirurgie,
        Kinderchirurgie, Visceralchirurgie, Dermatologie, Gynäkologie und
        Geburtshilfe, Innere Medizin, Allgemeinmedizin, Gastroenterologie oder
        Urologie.
      </p>
    ),
  },
  {
    label: "Weiterbildungszeit",
    value: "weiterbildungszeit",
    content: (
      <>
        <p>
          12 Monate bei einem Weiterbildungsbefugten gemäß § 5 Abs. 1 Satz 2,
          davon können sechs Monate während der Facharztweiterbildung über
          Allgemeine Chirurgie, Dermatologie, Gynäkologie und Geburtshilfe,
          Innere Medizin, Allgemeinmedizin, Gastroenterologie oder Urologie
          abgeleistet werden.
        </p>
        <p css={{ fontSize: `${settings.fontSize.tiny} !important` }}>
          (Deutsche Muster-Weiterbildungsordnung (WBO) von 2018)
        </p>
      </>
    ),
  },
  {
    label: "Weiterbildungsinhalt",
    value: "weiterbildungsinhalt",
    content: (
      <>
        <p>Erwerb von Kenntnissen, Erfahrungen und Fertigkeiten in</p>

        <ul>
          <li>
            Den konservativen und operativen Behandlungsmethoden der
            Proktologie, einschließlich:
            <ul>
              <li>
                Der konservativen Fissurbehandlung und der Mitwirkung bei
                operativer Fissurbehandlung
              </li>
              <li>
                Exzision von kleineren peri- und intraanalen Geschwülsten wie
                Thrombosen, Marisken und hypertrophen Analpapillen
              </li>
              <li>
                Behandlung des Hämorrhoidalleidens, z.B. Verödung,
                Gummibandligaturen
              </li>
              <li>
                Aufsuchen und Sondierung von Analfisteln und Krypten
                einschließlich Fadendrainagen
              </li>
              <li>
                Mitwirkung bei der operativen Therapie von Sinus pilonidalis,
                der Akne inversa und Analabszessen
              </li>
            </ul>
          </li>
          <li>
            Der Differentialdiagnostik des Analekzems einschließlich Diagnostik
            und Therapie anorektaler Geschlechtskrankheiten und analer
            Dermatosen
          </li>
          <li>Der Versorgung und Beratung von Stomaträgern</li>
          <li>Der Nachsorge bei malignen Tumoren</li>
          <li>Der digitalen Austastung und Befundung des Analkanals</li>
          <li>Der Spekulumuntersuchung des Analkanals</li>
          <li>Proktoskopien und Rektoskopien</li>
          <li>
            Der funktionellen und morphologischen Diagnostik der analen
            Schließmuskulatur, z.B. Manometrie, Endosonographie
          </li>
          <li>Der Lokal- oder Regionalanästhesie</li>
        </ul>
      </>
    ),
  },
];

export default additional_title;
