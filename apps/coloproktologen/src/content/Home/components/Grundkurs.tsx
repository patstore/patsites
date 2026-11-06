import settings from '@settings'
import { contentBox } from '@styles'
import { Button, ContentBox, ContentContainer, FlexBox } from '@ui'
import React from 'react'
import { env } from '@env'

const Grundkurs: React.FC = () => {
    console.log(env.previewMode);
    if (env.previewMode === "true") {
        return (
        <ContentContainer >
            <FlexBox direction='column' align='start' gap={settings.sizes.small} hasFullWidth>
                <h2>Wissen Vertiefen. <br />Berufspolitik mitgestalten.</h2>
                <h3>
                    KoloproktologieKongress 2027
                </h3>
                <p>
                    11. - 13. März - Kongress am Park Augsburg
                </p>
            </FlexBox>
            <FlexBox direction="row" align="stretch" changeToColumn gap={settings.sizes.medium}>
                <ContentBox
                    label='Grundkurs'
                    title="Die Basis für Ihre Praxis"
                    text="Grundlagen der Koloproktologie verständlich und praxisnah vertiefen."
                    image="/20260312-51.webp"
                    buttonText='Zum Kursprogramm'
                    buttonBackground={settings.colors.primary}
                    externalLink="https://www.koloproktologen-kongress.de/index.php"
                >
                    <div css={{paddingTop: "36px"}}>
                        <p>
                            11.März 2027 - 9:00 - 17:00 Uhr <br />
                            Kongress am Park Augsburg
                        </p>
                    </div>
                </ContentBox>
                <ContentBox
                    label='Aufbaukurs'
                    title="Die Basis für Ihre Praxis"
                    text="Erfahrene Referenten stellen ihr Vorgehen vor - von Sklerosierung und Logatur bis zur Fistelchirurgie."
                    image="/aufbaukurs.jpg"
                    externalLink="https://www.koloproktologen-kongress.de/index.php"
                    buttonText='Zum Kursprogramm'
                    buttonBackground={settings.colors.primary}
                >
                    <div css={{paddingTop: settings.sizes.medium}}>
                        <p >
                            11.März 2027 - 9:00 - 17:00 Uhr <br />
                            Kongress am Park Augsburg
                        </p>
                    </div>
                </ContentBox>
                <ContentBox
                    label='Berufspolitisches  Seminar'
                    title="Berufspolitik im Fokus"
                    text="Drei Jahre Hybrid-DRG - was bleibt offen? Ambulatnte Koloskopie und Stand der GOÄ-Novellierung."
                    image="/grundkurs.jpg"
                    buttonText='Zum Seminarprogramm'
                    buttonBackground={settings.colors.primary}
                    externalLink="https://www.koloproktologen-kongress.de/index.php"
                >
                    <div css={{paddingTop: settings.sizes.medium}}>
                        <p >
                            11.März 2027 - 9:00 - 17:00 Uhr <br />
                            Kongress am Park Augsburg
                        </p>
                    </div>
                </ContentBox>
            </FlexBox>

            </ContentContainer>
        )
    } else {
  return (
    <ContentContainer 
    >
        <h2 css={{maxWidth: "100% !important"}}>
            Koloproktologischer Grundkurs <br />
            Koloproktologen-Kongress 2027, Augsburg
        </h2>
        <FlexBox direction="row" align="stretch" changeToColumn gap={settings.sizes.medium}>
            <div css={[contentBox(), {backgroundColor: settings.colors.light}]}>
            <p>
                Am 11.03.2027 laden der BCD und die DGK zum <strong>Koloproktologischen Grundkurs</strong> nach Augsburg ein. Die Veranstaltung findet im Kongress am Park im Rahmen des Deutschen Koloproktologen-Kongress 2027 statt.
            </p>
            <p>
                Der Kurs richtet sich an Ärztinnen und Ärzte, die ihre Kenntnisse in der Koloproktologie erweitern oder vertiefen möchten. 
                Es erwarten Sie praxisnahe und evidenzbasierte Fachvorträge von erfahrenen proktologisch tätigen Kolleginnen und Kollegen.
            </p>
            <p>
                Das ausführliche Programm sowie die Informationen zur Anmeldung werden in Kürze veröffentlicht.
            </p>
            <Button 
                externalLink="https://www.koloproktologen-kongress.de/index.php"
                text="DGK Kongress 2027" 
                size="medium" 
            />
            </div>
            <div css={{flex: "1 1 60%", overflow: "hidden"}}>
                <img 
                    height={"100%"} 
                    src="/grundkurs.jpg" 
                    alt="Koloproktologischer Grundkurs 2026" 
                    css={{width: "100%", height: "100%", objectFit: "cover", margin: 0, borderRadius: settings.sizes.small}}
                />
            </div>
        </FlexBox>
    </ContentContainer>
  )
}}

export default Grundkurs