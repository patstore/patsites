import type { ContainerGridProps } from './types.d'
import { colors } from '@/settings'

const borderColor = colors.gridLines

export const gridContainer = ({
  amountOfSquares,
  squareWidth,
}: Pick<ContainerGridProps, 'amountOfSquares' | 'squareWidth'>) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${amountOfSquares}, ${squareWidth}px)`,
  gridTemplateRows: `repeat(${amountOfSquares}, ${squareWidth}px)`,
  overflow: 'hidden',
  borderRight: `1px solid ${borderColor}`,
  borderBottom: `1px solid ${borderColor}`,
  boxSizing: 'border-box' as const,
  position: 'absolute' as const,
})

export const gridSquare = {
  minWidth: 0,
  minHeight: 0,
  aspectRatio: '1',
  backgroundColor: 'transparent',
  borderTop: `1px solid ${borderColor}`,
  borderLeft: `1px solid ${borderColor}`,
  boxSizing: 'border-box' as const,
  transition: 'background-color 0.3s ease',
  position: 'relative' as const,
  zIndex: 1,
}
