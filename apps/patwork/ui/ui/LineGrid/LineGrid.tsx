import React from 'react'
import { gridContainer } from './styles'
import { HorizontalLines, VerticalLines } from './components'
import { colors } from '@/settings'

export interface GridProps {
  /** Distance between horizontal lines in pixels */
  horizontalSpacing?: number
  /** Distance between vertical lines in pixels */
  verticalSpacing?: number
  /** Color of the grid lines (CSS color value) */
  lineColor?: string
  /** Show horizontal lines */
  showHorizontal?: boolean
  /** Show vertical lines */
  showVertical?: boolean
  /** Optional className for the container */
  className?: string
  /** Optional children to render inside the grid */
  children?: React.ReactNode
}

const LineGrid: React.FC<GridProps> = ({
  horizontalSpacing = 24,
  verticalSpacing = 24,
  lineColor = colors.gridLinesLight,
  showHorizontal = true,
  showVertical = true,
  className,
  children,
}) => {
  return (
    <div css={gridContainer} className={className}>
      {showHorizontal && (
        <HorizontalLines
          horizontalSpacing={horizontalSpacing}
          lineColor={lineColor}
        />
      )}
      {showVertical && (
        <VerticalLines
          verticalSpacing={verticalSpacing}
          lineColor={lineColor}
        />
      )}
      {children}
    </div>
  )
}

export default LineGrid
