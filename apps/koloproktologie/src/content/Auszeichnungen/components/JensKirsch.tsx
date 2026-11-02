import settings from "@settings";
import { Button, FlexBox, SlideIn } from "@ui";
import React from "react";

const JensKirsch = () => {
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
                    <h2>Weitere Preisträger des Jens J. Kirsch-Preises</h2>
                    <h3>2022</h3>
                    <p>
                        <span>
                            Laparoscopic resection rectopexy versus Delormes
                            procedure in full thickness rectal prolapse - a
                            randomized multicenter trial (DeloRes-Trial-Group)
                        </span>
                        <br />
                        A. Joos, P. Kienle, S. Post, A. Herold, F. Herrle, D.
                        Bussen, S. Rothenhoefer
                    </p>
                    <h3>2021</h3>
                    <p>
                        <span>
                            Prädiktoren für einen dauerhaften Therapieerfolg
                            nach konservativer und operativer Therapie von
                            kindlichen Analabszessen
                        </span>
                        <br />
                        Lars Bönicke (Wuppertal), J. Dörner (Wuppertal), S.
                        Denecke (Wuppertal), H. Zirngibl (Wuppertal), M.
                        Langenbach (Lippstadt)
                    </p>
                    <h3>2020</h3>
                    <p>keine Preisvergabe</p>
                    <h3>2019</h3>
                    <p>
                        <span>
                            Einfluss von Erkrankungsschwere und
                            Behandlungsmodalität auf die langfristige
                            Lebensqualität von Patienten mit akuter
                            Sigmadivertikulitis: eine Propensity score Analyse
                        </span>
                        <br />
                        Dr. Maximilian Sohn, Prof. Dr. Ayman Agha, Daphne
                        Roussos, Fabian Bloss, Prof. Dr. Igors Iesalnieks,
                        München
                    </p>
                    <h3>2018</h3>
                    <p>
                        <span>
                            Coffee accelerates recovery of bowel function after
                            elective laparoscopic colorectal resection – a
                            randomized controlled trial
                        </span>
                        <br />
                        S. Hasler-Gehrer, M. Linecker, A. Keerl, A. Descloux,
                        Baden / Schweiz; R. Rosenberg, Liestal / Schweiz; A.
                        Nocito, Baden / Schweiz
                    </p>
                    <h3>2017</h3>
                    <p>
                        <span>
                            Nervi sphincter ani internus – eine makroanatomische
                            Untersuchung der extrinsischen autonomen
                            Nervenversorgung des M. sphincter ani internus
                        </span>
                        <br />
                        S. Stelzner, Dresden; M. Böttner, Kiel; H. Witzigmann,
                        Dresden; T. Wedel, Kiel
                    </p>
                    <h3>2016</h3>
                    <p>
                        <span>
                            Experimentelle Untersuchungen zum intraanalen
                            Oberflächen-EMG - Ein Ansatz zur Überwachung der
                            extrinsischen Innervation während TaTME
                        </span>
                        <br />
                        D. W. Kauff, N. Wachter, Mainz; K.-P. Hoffmann, St.
                        Ingbert; T. B. Krüger, Emmendingen; A. Heimann, H. Lang,
                        W. Kneist, Mainz
                    </p>
                    <h3>2015</h3>
                    <p>
                        <span>
                            Hybrid-TAMIS TME - Eine neue Perspektive in der
                            Rektumkarzinomchirurgie
                        </span>
                        <br />
                        PD Dr. A. D. Rink, Prof. Dr. K.-H. Vestweber,
                        Leverkusen; Prof. Dr. H. Lang, Prof. Dr. W. Kneist;
                        Mainz
                    </p>
                    <h3>2014</h3>
                    <p>
                        <span>
                            &quot;Alte Zöpfe abschneiden –
                            Klinisch-randomisierte Studie zur Einlage von
                            Analtampons nach Hämorrhoidektomie&quot;
                        </span>
                        <br />
                        <span className="label">
                            M. R. Langenbach, S. Chondros, Oberhausen; S.
                            Sauerland, Köln
                        </span>
                    </p>
                    <h3>2013</h3>
                    <p>
                        <span>
                            &quot;Erste Resultate einer randomisierten
                            doppelblinden kontrollierten Studie zum Vergleich
                            der Sakralen Nerven Modulation (SNM) und der
                            Pudendalen Nerven Stimulation (PNS) in der
                            Behandlung der Stuhlinkontinenz&quot;
                        </span>
                        <br />
                        P. Folie, St. Gallen/Schweiz; F.-H. Hetzer,
                        Schaffhausen/Schweiz; C. Maurus, U. Beutner, L. Marti,
                        St. Gallen/Schweiz
                    </p>
                    <h3>2012</h3>
                    <p>
                        <span>
                            &quot;Intraoperative laparoskopische
                            Infrarot-Perfusionsmessung kolorektaler
                            Anastomosen&quot;
                        </span>
                        <br />
                        Markus Kleemann, Hamed Esnaashari, Thomas Jungbluth,
                        Tilman Laubert, Uwe Roblick, Hans-Peter Bruch, Lübeck
                    </p>
                    <h3>2011</h3>
                    <p>
                        <span>
                            &quot;Veränderungen in α- und β-adrenerger
                            Neurotransmission zwischen enterischem Nervensystem
                            und zirkulärer Muskulatur des Jejunums der Ratte
                            während des postoperativen Ileus&quot;
                        </span>
                        <br />
                        Michael S. Kasparek, B. Götz, B. Stoklas, P. Benhaai,
                        K.-W. Jauch, M. H. Müller, M. E. Kreis, München
                    </p>
                    <h3>2010</h3>
                    <p>
                        <span>
                            &quot;Die Drei-Ziele-Behandlung (3T) ist wirksamer
                            als alleiniges Biofeedback bei analer Inkontinenz:
                            Die 3T-Al Studie&quot;
                        </span>
                        <br /> T. Schwandner, W. Kierer, R. Scherer, R.
                        Bouchard, A. Ziegler, G. Kolbert, Gießen
                    </p>
                    <h3>2009</h3>
                    <p>
                        <span>
                            &quot;Hämorrhoiden: arterieller Schwellkörper, Vene
                            oder Varize?&quot;
                        </span>
                        <br />
                        V. Engelhardt, U. Böhler, A. Lametschwandtner, T. Wedel,
                        V. Wienert, Salzburg
                    </p>
                    <h3>2008</h3>
                    <p>
                        <span>
                            &quot;STARR - Bewirkt die anatomische Korrektur eine
                            funktionelle Verbesserung?&quot;
                        </span>
                        <br />
                        R. Lang, S. Kirchhoff, C. Lautenschlager, M. Müller, K.
                        Jauch, M. Kreis, München
                    </p>
                    <h3>2007</h3>
                    <p>
                        <span>
                            &quot;Hypermethylierung des SFRP 1 Genes als ein
                            epigenetischer Marker der sporadischen kolorektalen
                            Karzinome im DANN-Stuhl-Test&quot;
                        </span>
                        <br />
                        W. Zhang, M. Bauer, R. Croner, M. Stürzl, W.
                        Hohenberger, K. M
                    </p>
                    <h3>2006</h3>
                    <p>
                        <span>
                            &quot;Untersuchung der Kollagenbeschaffenheit bei
                            Patienten mit Hämorrhoidalleiden&quot;
                        </span>
                        <br /> St. Willis, K. Junge, R. Ebrahimi, A. V.
                        Schumpelick, Aachen
                    </p>
                    <h3>2005</h3>
                    <p>
                        <span>
                            &quot;Laparoskopisch assistierte oder offene
                            Sigmaresektion bei perforierter Divertikulitis
                            Einfluss auf den postoperativen Verlauf&quot;
                        </span>
                        <br />
                        A.J. Kroesen, J.P. Ritz, H.J. Buhr, Berlin
                    </p>
                    <h3>2004</h3>
                    <p>
                        <span>
                            &quot;Neorektale Entleerungsfunktion von Coloplasty
                            und Colon-J-Pouch Eine prospektive Vergleichsstudie
                            mit dynamischer Becken-MRT&quot;
                        </span>
                        <br />
                        A. Fürst, S. Suttner, A. Beham, I. Iesalnieks, J.
                        Swol-Ben, C. Paetzel, H.J. Schlitt, Regensburg
                    </p>
                    <h3>2003</h3>
                    <p>
                        <span>
                            &quot;Stapler-Hämorrhoidektomie versus geschlossene
                            Hämorrhoidektomie: Analyse einer prospektiven
                            randomisierten Studie mit Langzeitergebnissen&quot;
                        </span>
                        <br /> C. Hasse, H. Sitter, W. Lorenz, M. Rothmund,
                        Marburg
                    </p>
                </div>
            </SlideIn>
        </>
    );
};

export default JensKirsch;
