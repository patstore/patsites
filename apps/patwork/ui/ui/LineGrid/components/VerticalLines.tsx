import React from 'react'
import { verticalLines } from '../styles'

interface VerticalLinesProps {
  verticalSpacing: number
  lineColor: string
}

const VerticalLines: React.FC<VerticalLinesProps> = ({
  verticalSpacing,
  lineColor,
}) => {
  return <div css={verticalLines({ verticalSpacing, lineColor })} />
}

export default VerticalLines
