import settings from '@settings'
import { contentBox } from '@styles'
import { Button, ContentContainer, FlexBox } from '@ui'
import React from 'react'

const Grundkurs: React.FC = () => {
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
}

export default Grundkurs