import { ContentContainer, HeadContent } from "@ui";
import { Layout } from "@components";
import React from "react";

const Impressum: React.FC = () => {
    return (
        <Layout>
            <HeadContent title="Impressum" isInline />
            <ContentContainer noPaddingTop>
                <section id="impressum" >
                    <h2>Angaben gemäß § 5 TMG</h2>
                    <p>
                        Berufsverband Coloproktologie Deutschland e.V. (BCD)
                        <br /> Maienstr. 3<br /> 79102 Freiburg i. Br.
                    </p>
                    <p>
                        Vereinsregister: 700563
                        <br /> Registergericht: Freiburg
                    </p>
                    <p>
                        <strong>Vertreten durch:</strong>
                        <br /> Prof. Dieter Bussen (Vorsitzender)
                        <br /> Prof. Dr. Heiner Krammer (2. Vorsitzender) 
                        <br /> Dr. Claudia Breitkopf (1. Schriftführer)
                        <br /> Prof. Dr. med. Alois Fürst (2. Schriftführer)
                        <br /> Dr. Daniel Sterzing (Kassenwart)
                    </p>
                    <h2>Kontakt</h2>
                    <p>
                        Telefon: 0761 70 438 - 113
                        <br /> E-Mail: <a href="mailto:info@coloproktologen.de">info@coloproktologen.de</a>
                    </p>
                    <h2>
                        Redaktionell verantwortlich 
                    </h2>
                    <p>
                        Prof. Dr. Dieter Bussen <br />
                        Deutsches End- und Dickdarmzentrum Mannheim <br />
                        Bismarckplatz 1 <br />
                        68165 Mannheim
                    </p>

                    <p>
                        Dr. Nils Krakow <br />
                        Enddarmpraxis Heidelberg <br />
                        Poststr. 2 <br />
                        69115 Heidelberg
                    </p>
                    <h2>
                        Verbraucher­streit­beilegung/Universal­schlichtungs­stelle
                    </h2>
                    <p>
                        Wir sind nicht bereit oder verpflichtet, an
                        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                        teilzunehmen.
                    </p>
                </section>
            </ContentContainer>
        </Layout>
    );
};

export default Impressum;
