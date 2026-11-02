import { ContentBox, SlideIn } from '@ui'
import React, { useState } from 'react'
import { EmailClass, RenderEmailProps } from './types'

const RenderEmail:  React.FC<RenderEmailProps> = ({email}) => {
    const [open, setOpen] = useState(false);
  return (
    <>
        <ContentBox
            title={email.title}
            date={email.createdAt}
            buttonText='Öffnen'
        />
        <SlideIn open={open} cancelButtonHandler={() => setOpen(false)}>
            
        </SlideIn>
    </>
  )
}

export default RenderEmail