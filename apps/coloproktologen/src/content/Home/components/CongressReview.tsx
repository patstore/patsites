import { navigate } from "@router";
import { getCurrentEvents, useFindImages, useCollection } from '@provider';
import type { EventClass } from '@types';
import { contentBox } from '@styles'
import { Button, Divider, Gallery, Label } from '@ui'
import React, { useState } from 'react'

const CongressReview: React.FC = () => {
    const [showReview, setShowReview] = useState(false);
    const { items: events } = useCollection<EventClass>("Event");
    const {current} = getCurrentEvents(events);
    const {findImage} = useFindImages();

    if (!current || !current?.text) {
        return null;
    }

    
  return (
    <div css={[contentBox("1 1 100%")]}>
        <Label text="Kongressrückblick" noMarginBottom />
        <div>
            <h2>
                {current.title}
            </h2>
            {current.description && <p>{current.description}</p>}
        </div>
        <Gallery imageIds={current.gallery || []} findImage={findImage} />
        <Divider />
        <Button text="Zum Kongressrückblick" onClick={() => navigate('/kongressrueckblicke')} />
    </div>
  )
}

export default CongressReview