import React, { FC } from 'react';
import Graphics from './Graphics';
import { PixiGeometricFormProps } from './PixiGeometricFormProps';

interface Props extends PixiGeometricFormProps {
  size: number;
}

const Triangle: FC<Props> = ({
  size,
  position,
  color = 0xffffff,
  fill = undefined,
  alpha = 1,
  lineWidth = 1,
}) => {
  const { x, y } = position;

  return (
    <Graphics
      fill={fill}
      draw={(g): void => {
        g.lineStyle(lineWidth, color, alpha);
        g.moveTo(x, y);
        g.lineTo(x + size / 2, y + size);
        g.lineTo(x - size / 2, y + size);
        g.lineTo(x, y);
      }}
    />
  );
};

export default Triangle;
