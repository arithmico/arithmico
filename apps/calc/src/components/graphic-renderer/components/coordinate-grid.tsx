import { Circle, G } from "@react-pdf/renderer";
import {
  GraphicDimensions,
  GraphicLimits,
  RenderTarget,
  Ticks,
} from "../graphic-renderer.types";

export interface CoordinateGridProps {
  target: RenderTarget;
  ticks: Ticks;
  limits: GraphicLimits;
  dimensions: GraphicDimensions;
}

function getTickNumbers(min: number, max: number, spacing: number) {
  const start =
    min + (spacing - (min % spacing)) >= min
      ? min + (spacing - (min % spacing))
      : min + (spacing - (min % spacing)) + spacing;
  const end =
    max - (max % spacing) <= max
      ? max - (max % spacing)
      : max - (max % spacing) - spacing;

  const result = [];
  for (let i = start; i <= end; i += spacing) {
    result.push(i);
  }
  return result;
}

function transformToSvgViewport(
  { x, y }: { x: number; y: number },
  dimensions: GraphicDimensions,
  limits: GraphicLimits
) {
  const width = Math.abs(limits.xMin - limits.xMax);
  const height = Math.abs(limits.yMin - limits.yMax);

  return {
    x: ((x - limits.xMin) / width) * dimensions.width - dimensions.width / 2,
    y: ((y - limits.yMin) / height) * dimensions.height - dimensions.height / 2,
  };
}

export default function CoordinateGrid({
  target,
  ticks,
  limits,
  dimensions,
}: CoordinateGridProps) {
  const xTickNumbers = getTickNumbers(limits.xMin, limits.xMax, ticks.xTicks);
  const yTickNumbers = getTickNumbers(limits.yMin, limits.yMax, ticks.yTicks);
  const gridPoints: { x: number; y: number }[] = [];
  xTickNumbers.forEach((x) => {
    yTickNumbers.forEach((y) => {
      gridPoints.push(transformToSvgViewport({ x, y }, dimensions, limits));
    });
  });

  switch (target) {
    case "web":
      return (
        <g>
          {gridPoints.map(({ x, y }) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={0.0025}
              style={{ fill: "yellow" }}
            />
          ))}
        </g>
      );

    case "pdf":
      return (
        <G>
          {gridPoints.map(({ x, y }) => (
            <Circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={0.0025}
              style={{ fill: "yellow" }}
            />
          ))}
        </G>
      );
  }
}
