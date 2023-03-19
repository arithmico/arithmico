import {
  GraphicDimensions,
  GraphicLimits,
  Ticks,
} from "../../../graphic-renderer.types";
import { getTickNumbers, transformToSvgViewport } from "../../../graphic-utils";

export interface CalculateGridPointPositionsArgs {
  ticks: Ticks;
  limits: GraphicLimits;
  dimensions: GraphicDimensions;
}

export function calculateGridPointPositions({
  limits,
  ticks,
  dimensions,
}: CalculateGridPointPositionsArgs) {
  const xTickNumbers = getTickNumbers(limits.xMin, limits.xMax, ticks.xTicks);
  const yTickNumbers = getTickNumbers(limits.yMin, limits.yMax, ticks.yTicks);
  const gridPoints: { x: number; y: number }[] = [];
  xTickNumbers.forEach((x) => {
    yTickNumbers.forEach((y) => {
      if (
        x >= limits.xMin &&
        x <= limits.xMax &&
        y >= limits.yMin &&
        y <= limits.yMax
      ) {
        gridPoints.push(transformToSvgViewport({ x, y }, dimensions, limits));
      }
    });
  });
  return gridPoints;
}
