import React from 'react'
import { Graphics } from '@inlet/react-pixi';

function Circle({ radius, position, color = 0xffffff, alpha = 1, lineWidth = 1 }) {
  const { x, y } = position
  return (
    <Graphics
      draw={
        g => {
          // clear the graphics
          g.clear()
          // start drawing
          g.lineStyle(lineWidth, color, alpha)
          g.drawCircle(x, y, radius)
        }
      }
    />
  )
}

export default Circle