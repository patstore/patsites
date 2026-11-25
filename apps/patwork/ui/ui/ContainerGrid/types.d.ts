export interface ContainerGridProps {
  /** The amount of squares used horizontally (number of columns) */
  amountOfSquares: number
  /** The exact width of each square in pixels */
  squareWidth: number
  /** The id of the parent container (used for square ids: id-row-column) */
  id: string
  /** Radius in pixels - squares within this distance of the cursor get highlighted */
  proximityRadius?: number
}

export interface GridSquareProps {
  id: string
  /** Background color to animate to on hover */
  backgroundColor: string
}
