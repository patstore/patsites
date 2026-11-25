import React from 'react'
import { gridSquare } from '../styles'
import type { GridSquareProps } from '../types.d'

const GridSquare: React.FC<GridSquareProps> = ({ id }) => (
  <div id={id} data-grid-square css={gridSquare} />
)

export default GridSquare
