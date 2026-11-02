import { getCurrentEvents, useFindImages, useGetEvent } from '@provider';
import settings from '@settings';
import { buttonsContainer } from '@styles';
import { Button, ContentContainer, Label, Gallery } from '@ui';
import React from 'react'

const Congress: React.FC = () => {
    const {events} = useGetEvent();
    const currentEvents = getCurrentEvents(events);
    const { findImage } = useFindImages();

    if (!currentEvents?.upcoming) {
        return null;
    }

    return (
        <ContentContainer largeBackground={settings.colors.light}	>
            <div>
                <Label text="Rückblick" />
                <h2>{currentEvents?.current?.title}</h2>
                <Gallery 
                    imageIds={currentEvents?.current?.gallery || []} 
                    findImage={findImage} 
                    displayMode='mosaic'
                />

                <div css={buttonsContainer}>
                    <Button text="Ältere Kongressrückblicke" internalLink='/kongressrueckblicke' />
                    <Button text="Kongressbericht" onClick={() => {}} />
                </div>
            </div>
        </ContentContainer>
    );
};

export default Congress;