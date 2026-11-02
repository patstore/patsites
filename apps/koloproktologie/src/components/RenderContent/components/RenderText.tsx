import React, { FC } from 'react'
import { RenderTextProps } from '../types'

const RenderText: FC<RenderTextProps> = ({text}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: text.text}} />
  )
}

export default RenderText;