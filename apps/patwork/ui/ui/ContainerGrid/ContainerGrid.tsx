import React, { useMemo, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { gridContainer } from './styles'
import { GridSquare } from './components'
import backgroundColors from './constants/background_colors'
import type { ContainerGridProps } from './types.d'

const DEFAULT_PROXIMITY_RADIUS = 60

const getRandomColor = () =>
  backgroundColors[Math.floor(Math.random() * backgroundColors.length)]

const ContainerGrid: React.FC<ContainerGridProps> = ({
  amountOfSquares,
  squareWidth,
  id,
  proximityRadius = DEFAULT_PROXIMITY_RADIUS,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)

  const squares = useMemo(
    () =>
      Array.from({ length: amountOfSquares * amountOfSquares }, (_, index) => {
        const row = Math.floor(index / amountOfSquares)
        const column = index % amountOfSquares
        return {
          row,
          column,
          squareId: `${id}-${row + 1}-${column + 1}`,
          backgroundColor: getRandomColor(),
        }
      }),
    [amountOfSquares, id]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const mouse = mouseRef.current
        const containerEl = containerRef.current
        if (!mouse || !containerEl) return

        const squareElements = containerEl.querySelectorAll<HTMLDivElement>(
          '[data-grid-square]'
        )

        squareElements.forEach((el, index) => {
          const { row, column, backgroundColor } = squares[index]
          const centerX = (column + 0.5) * squareWidth
          const centerY = (row + 0.5) * squareWidth
          const distance = Math.hypot(mouse.x - centerX, mouse.y - centerY)

          gsap.to(el, {
            backgroundColor:
              distance < proximityRadius ? backgroundColor : 'transparent',
            duration: 0.2,
            ease: 'power2.out',
          })
        })
      })
    },
    [squareWidth, proximityRadius, squares]
  )

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null
    const containerEl = containerRef.current
    if (!containerEl) return

    const squareElements = containerEl.querySelectorAll<HTMLDivElement>(
      '[data-grid-square]'
    )
    squareElements.forEach((el) => {
      gsap.to(el, {
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      id={id}
      css={gridContainer({ amountOfSquares, squareWidth })}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {squares.map(({ squareId, backgroundColor }) => (
        <GridSquare key={squareId} id={squareId} backgroundColor={backgroundColor} />
      ))}
    </div>
  )
}

export default ContainerGrid
