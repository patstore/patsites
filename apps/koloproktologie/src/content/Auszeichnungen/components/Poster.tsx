import settings from "@settings";
import { Button, FlexBox, SlideIn } from "@ui";
import React from "react";

const Poster = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <div
                css={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: settings.colors.light,
                    padding: "24px",
                    borderRadius: "24px"
                }}
            >
                <FlexBox
                    direction="row"
                    align="center"
                    justify="space-between"
                    hasFullWidth
                    changeToColumn
                >
                    <h4 css={{ margin: "0 !important" }}>
                        Frühere Preisträger*innen
                    </h4>
                    <Button
                        text="Preistäger*innen einblenden"
                        onClick={() => setOpen(true)}
                    />
                </FlexBox>
            </div>
            <SlideIn
                open={open}
                cancelButtonHandler={() => setOpen(false)}
                width="medium"
            >
                <div>
                    <h2>Weitere Preisträger des DGK-Poster-Preises</h2>
                    <h3>2022</h3>
                    <p>Keine Preisvergabe</p>
                    <h3>2021</h3>
                    <p>Keine Preisvergabe</p>
                    <h3>2020</h3>
                    <p>Keine Preisvergabe</p>
                    <h3>2019</h3>
                    <p>
                        <span>
                            Handnaht v. Stapler-Anastomose –
                            Hyperspektralbetrachtung der Perfusion
                        </span>
                        <br />
                        Boris Jansen-Winkeln, Johann P. Takoh, Claire Chalopin,
                        Ines Gockel, Hannes Köhler (Leipzig)
                    </p>
                    <h3>2018</h3>
                    <p>
                        <span>
                            Die Kono-S-Anastomose in der Chirurgie des Morbus
                            Crohn
                        </span>
                        <br />
                        C. Galata, S. Seyfried, P. Kienle, Mannheim
                    </p>
                    <h3>2017</h3>
                    <p>
                        <span>
                            Systematische Untersuchung von HIV-infizierten
                            homosexuellen Männern: 40% haben occulte anale
                            Zufallsbefunde!
                        </span>
                        <br />
                        C. Maurus, S. Baumeler, S. Bock, S. Bischofberger, I.
                        Brenner, L. Traine, J. Borovicka, P. Vernazza, W.
                        Brunner, L. Marti, (St. Gallen/Schweiz)
                    </p>
                    <h3>2016</h3>
                    <p>
                        <span>
                            Fistelsanierung durch Spaltung, Exzision und
                            primärer Sphinkterrekonstruktion – single center
                            experience
                        </span>
                        <br />
                        M. Ninkovic, S. Czipin, E. Gasser, S. Kuscher, M. Huth,
                        D. Öfner-Velano, I. Kronberger, Innsbruck/Österreich
                    </p>
                    <h3>2015</h3>
                    <p>
                        <span>
                            Klinischer Verlauf und Benefit unter erweiterter
                            Immunsuppression und anti-TNFα-Therapie beim
                            perianalen Crohnbefall
                        </span>
                        <br />
                        Dr. Nadia Slavova, Prof. Dr. M. E. Kreis, PD Dr. J.
                        Gröne; Berlin
                    </p>
                    <h3>2014</h3>
                    <p>
                        <span>
                            &quot;Die LIFT-Procedure zur Versorgung der hohen
                            transsphinktären Analfistel&quot;
                        </span>
                        <br />
                        S. Bouassida, T. Schefter, A. Stahl, U. Adam, Berlin
                    </p>
                    <h3>2013</h3>
                    <p>
                        <span>
                            &quot;Vergleich der Ergebnisqualität beim
                            Kolonkarzinom&quot;
                        </span>
                        <br />
                        S. Merkel, V. Schellerer, K. Weber, J. Göhl, W.
                        Hohenberger, Erlangen
                    </p>
                    <h3>2012</h3>
                    <p>
                        <span>
                            &quot;Schmerzmanagement nach Hämorrhoidektomie -
                            Patientenkontrollierte-Analgesie besser als
                            konventionelle Schmerztherapie – eine prospektive,
                            randomisierte Studie&quot;
                        </span>
                        <br />
                        Edgar Hancke, Miriam Lampinski, Knut Völke, Katrin
                        Suchan, Frankfurt
                    </p>
                    <h3>2011</h3>
                    <p>
                        <span>
                            &quot;PSMA – endotheliales Target im kolorektalen
                            Karzinom&quot;
                        </span>
                        <br /> Irmgard E. Kronberger, Innsbruck; M. C.
                        Baltimore; M. Zitt, B. Zelger, F. Aigner, J. Pratschke,
                        Innsbruck; N. H. Bander, New York
                    </p>
                    <h3>2010</h3>
                    <p>
                        <span>
                            &quot;Die Stomarückverlagerung: Ein banaler Eingriff
                            für den Patienten?&quot;
                        </span>
                        <br /> M. Siassi, K. Matzel, M. Sailer, M. Weiss
                    </p>
                    <h3>2009</h3>
                    <p>
                        <span>
                            &quot;Vergleich von Spinalanästhesie in
                            Sattelblocktechnik (SPA) und totaler intravenöser
                            Anästhesie (TIVA) bei Patienten mit proktologischen
                            Eingriffen&quot;
                        </span>
                        <br />
                        M. Schmittner, H. Schreiber, A. Janke, C. Weiss, D.
                        Bussen, T. Luecke, Mannheim
                    </p>
                    <h3>2006</h3>
                    <p>
                        <span>
                            &quot;German Artificial Sphincter System-Gass: Ein
                            neuer Neosphinkter zur Therapie der hochgradigen
                            Stuhlinkontinenz&quot;
                        </span>
                        <br />
                        O. Ruthmann, A. Doll, U. Hopt, H. Schrag, Freiburg
                    </p>
                    <h3>2005</h3>
                    <p>
                        <span>
                            &quot;Fast-track Kolonchirurgie - ein neues
                            revolutionäres Konzept&quot;
                        </span>
                        <br />
                        A. Ommer, K. Albrecht, M.K. Walz, Essen
                    </p>
                    <h3>2004</h3>
                    <p>
                        <span>
                            &quot;Anatomische Untersuchungen zum Verlauf des
                            Nervus pudendus&quot;
                        </span>
                        <br /> St. D. Bussen, D. Geiger, M. Sailer, Würzburg
                        <br /> B. Baader, Kronach, S. Baader, Bonn
                    </p>
                </div>
            </SlideIn>
        </>
    );
};

export default Poster;
