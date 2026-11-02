import { directorate } from "./directorate";

const history_content = [
  {
    label: "Die Gründung",
    value: "die_gruendung",
    content: (
      <div>
        <h3>Die Gründung</h3>
        <p>
          Der Berufsverband der &quot;Proktologen&quot; Deutschlands e.V. wurde
          am 23.01.1979 in München gegründet. 1980 erfolgte die Namensänderung
          in &quot;Berufsverband Coloproktologie Deutschland e.V.&quot;
          <br /> Gründungsmitglieder: Alpers, Birkner, Forstmann, Frank, Girona,
          Greifenstein, Hartleb, Helle, Braungart, Klüver, Köhnke, Mader, Mlitz,
          Ostertun, Pleuger, Schüler, Stockmann, Walter, Würker
        </p>
        <p>
          1. Vorstand: Birkner, Schüler, Frank, Girona und Alpers;Stand 1979: 34
          Mitglieder
        </p>
        <p>Die Geschäftsstelle:</p>
        <ul>
          <li>von 1980 bis 2009 in München, Registereintrag München;</li>
          <li>seit 2010 in Freiburg, Registereintrag Freiburg.</li>
        </ul>
      </div>
    ),
  },
  {
    label: "Anerkennung der Eigenständigkeit der Proktologie",
    value: "anerkennung_der_eigenstaendigkeit_der_proktologie",
    content: (
      <div>
        <h3>Anerkennung der Eigenständigkeit der Proktologie</h3>
        <p>
          Die Gründung der wissenschaftlichen Gesellschaft der Deutschen
          Gesellschaft für Koloproktologie (DGK) am 21.11.1990 war eine
          wesentliche Voraussetzung, die Proktologie als eigenständiges
          Fachgebiet zu etablieren und den interdisziplinären Charakter auf
          einem wissenschaftlichen Kongress herauszustellen. <br /> 2001 hat der
          Ärztetag die Eigenständigkeit des Faches anerkannt und die Proktologie
          als Zusatzbezeichnung in die Weiterbildungsordnung (WBO) aufgenommen.
        </p>
      </div>
    ),
  },
  {
    label: "Historie des Vorstandes",
    value: "historie_des_vorstandes",
    content: (
      <div>
        <h3>Historie des Vorstandes</h3>
        <table css={{ backgroundColor: "white", borderRadius: "6px" }}>
          <thead>
            <tr>
              <th>Jahr</th>
              <th>Vorsitzender</th>
              <th>Stellvertreter</th>
              <th>1. Schriftführer</th>
              <th>2. Schriftführer</th>
              <th>Kassenführer</th>
            </tr>
          </thead>
          <tbody>
            {directorate.map((entry) => (
              <tr key={entry.year}>
                <td>{entry.year}</td>
                <td>{entry.chairman}</td>
                <td>{entry.deputy}</td>
                <td>{entry.first_secretarary}</td>
                <td>{entry.second_secretary}</td>
                <td>{entry.treasury}</td>
              </tr>
            ))}
          </tbody>
            
        </table>
      </div>
    ),
  },
  {
    label: "Ehrenmitglieder",
    value: "ehrenmitglieder",
    content: (
      <div>
        <h3>Ehrenmitglieder</h3>
        <p>
          Kirsch (Ehrenvorsitzender) †, Mannheim;
          <br /> Strittmatter (Ehrenvorsitzender), Freiburg; <br />
          Pommer, Oldenburg;
          <br />
          Meier zu Eissen, Hannover;
          <br /> Osterholzer, München;
          <br />
          Schmidt-Lauber, Oldenburg;
          <br /> Herold, Mannheim.
        </p>
      </div>
    ),
  },
  {
    label: "Kongresse und Veranstaltungen",
    value: "kongresse_und_veranstaltungen",
    content: (
      <div>
        <h3>Kongresse &amp; Veranstaltungen</h3>
        <ul>
          <li>
            Bis 1981 Kronberger Proktologie-Tag im Schlosshotel in
            Kronberg/Taunus;
          </li>
          <li>bis 1984 insgesamt 10. Kronberger Coloproktologie-Tage;</li>
          <li>von 1985 bis 1996 Koloproktologie-Tage in Bad Homburg;</li>
          <li>
            seit 1992 organisiert die DGK gemeinsam mit dem BCD als
            Kooperationspartner den Kongress;
          </li>
          <li>
            seit 1997 findet der Deutsche Koloproktologen-Kongress in München im
            Hotel Hilton statt.
          </li>
        </ul>
        <p>
          Der BCD bietet in diesem Rahmen den Grundkurs sowie den Aufbaukurs zu
          Einzelthemen und ein berufspolitisches Seminar an. Seit 1993 wurden 53
          Grundkurse mit über 2300 Teilnehmern durchgeführt. Seit 2010 besteht
          in Zusammenarbeit mit der DGK eine Expertenkommission für
          Hygienefrage, die Empfehlungen publiziert. &quot;Leitfaden und
          Empfehlungen für die Hygiene in der Koloproktologie&quot; wurden 2017
          aktualisiert.&quot;
        </p>
      </div>
    ),
  },
  {
    label: "Verbandsorgan coloproctology",
    value: "verbandsorgan_coloproctology",
    content: (
      <div>
        <h3>Verbandsorgan coloproctology</h3>
        <p>
          1979 Gründung der Zeitschrift coloproctology durch Frank, München.
        </p>
      </div>
    ),
  },
];

export default history_content;
