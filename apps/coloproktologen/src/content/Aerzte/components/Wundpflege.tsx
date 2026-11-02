import settings from '@settings'
import { ContentContainer, FlexBox } from '@ui'
import React from 'react'

const Wundpflege: React.FC = () => {
    return (
        <ContentContainer largeBackground={settings.colors.lightgrey}>
            <FlexBox 
                direction="column"
                align='center'
                gap={settings.sizes.small}
                hasFullWidth>
                <h2>Anleitung zur Wundpflege</h2>
                <p>
                    Das Video zur Anleitung zur Wundpflege finden sie <a href="/patienten/#wundpflege">hier</a>.
                </p>
            </FlexBox>
        </ContentContainer>
    )
}

export default Wundpflege