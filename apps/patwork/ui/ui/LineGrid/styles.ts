export interface GridStylesParams {
  horizontalSpacing: number
  verticalSpacing: number
  lineColor: string
}

export const gridContainer = {
  position: 'relative' as const,
  width: '100%',
  height: '100%',
  overflow: 'hidden' as const,
}

export const horizontalLines = ({
  horizontalSpacing,
  lineColor,
}: Pick<GridStylesParams, 'horizontalSpacing' | 'lineColor'>) => ({
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none' as const,
  backgroundImage: `
    linear-gradient(to bottom, transparent 0, transparent calc(100% - 1px), ${lineColor} calc(100% - 1px)),
    repeating-linear-gradient(
      to bottom,
      ${lineColor} 0,
      ${lineColor} 1px,
      transparent 1px,
      transparent ${horizontalSpacing}px
    )
  `,
})

export const verticalLines = ({
  verticalSpacing,
  lineColor,
}: Pick<GridStylesParams, 'verticalSpacing' | 'lineColor'>) => ({
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none' as const,
  backgroundImage: `
    linear-gradient(to right, transparent 0, transparent calc(100% - 1px), ${lineColor} calc(100% - 1px)),
    repeating-linear-gradient(
      to right,
      ${lineColor} 0,
      ${lineColor} 1px,
      transparent 1px,
      transparent ${verticalSpacing}px
    )
  `,
})
