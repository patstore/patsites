import React from 'react'
import { horizontalLines } from '../styles'

interface HorizontalLinesProps {
  horizontalSpacing: number
  lineColor: string
}

const HorizontalLines: React.FC<HorizontalLinesProps> = ({
  horizontalSpacing,
  lineColor,
}) => {
  return <div css={horizontalLines({ horizontalSpacing, lineColor })} />
}

export default HorizontalLines
