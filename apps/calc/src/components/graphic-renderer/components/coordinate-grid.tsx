import { Circle, G } from "@react-pdf/renderer";
import classNames from "classnames";
import {
  GraphicDimensions,
  GraphicLimits,
  RenderTarget,
  Ticks,
} from "../graphic-renderer.types";
import { transformToSvgViewport } from "@local-components/graphic-renderer/graphic-utils";

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
  for (let i = start - spacing; i <= end; i += spacing) {
    result.push(i);
  }
  return result;
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
              className={classNames(
                "theme-light:fill-black",
                "theme-dark:fill-white"
              )}
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
              style={{ fill: "black" }}
            />
          ))}
        </G>
      );
  }
}
