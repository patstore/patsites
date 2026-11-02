import { ContentContainer, HeadContent } from "@ui";
import { Layout } from "@components";
import React from "react";

const Impressum: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Impressum"
                isInline
            />
            <ContentContainer noPaddingTop>
                <section id="impressum">
                    <h2 className="dgk-h-default">Angaben gemäß § 5 TMG</h2>
                    <p>
                        Deutsche Gesellschaft für Koloproktologie e.V.
                        <br /> Maienstr. 3<br /> 79102 Freiburg i. Br.
                    </p>
                    <p>
                        Vereinsregister: 701945
                        <br /> Registergericht: Freiburg
                    </p>
                    <p>
                        <strong>Vertreten durch:</strong>
                        <br /> Prof. Dr. Thomas Schiedeck (Präsident)
                        <br /> Prof. Dr. Thomas Seufferlein (1. Vizepräsident)
                        <br /> Prof. Dr. Roland Croner (2. Vizepräsident)
                        <br /> Prof. Dr. Oliver Schwandner (Generalsekretär)
                        <br /> Prof. Dr. Felix Aigner (Schatzmeister)
                    </p>
                    <h2 className="dgk-h-default">Kontakt</h2>
                    <p>
                        Telefon: 0761 70 438 - 113
                        <br /> Telefax: 0761 70 438 - 114
                        <br /> E-Mail: info@koloproktologie.org
                    </p>
                    <h2 className="dgk-h-default">
                        Verbraucher­streit­beilegung/Universal­schlichtungs­stelle
                    </h2>
                    <p>
                        Wir sind nicht bereit oder verpflichtet, an
                        Streitbeilegungsverfahren vor einer
                        Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                </section>
            </ContentContainer>
        </Layout>
    );
};

export default Impressum;
