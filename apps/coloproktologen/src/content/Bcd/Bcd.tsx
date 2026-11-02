import { Layout } from "@components";
import { HeadContent } from "@ui";
import React from "react";
import {
    Tasks,
    Dgk,
    Distinction,
    Committee,
    Coloproctology,
    History,
    Statute
} from "./components";
import Congress from "./components/Congress";

const Bcd: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Über den BCD"
                // subtitle="Der Deutsche Coloproktologenbund e.V."
                description="Medizinische Expertise - Politische Stimme"
                content={
                    <div>
                        <p>
                            Der BCD ist ein Interessenverband der in Deutschland interdisziplinär tätigen End- und Dickdarmspezialisten. 
                            Wir vertreten die wirtschaftlichen und sozialpolitischen Interessen unserer Mitglieder gegenüber den gesetzlichen Kostenträgern, Versicherungen, Kammern und kassenärztlichen Vereinigungen.
                        </p>
                    </div>
                }
                isInline
                image="/images/publicdomainpictures_pixabay_science-14272_xxl.jpg"
            />
            <Tasks />
            <Committee />
            <Distinction />
            <Dgk />
            <Congress />
            <Coloproctology color="light" />
            <History />
            {/* <Membership /> */}
            <Statute />
        </Layout>
    );
};

export default Bcd;
