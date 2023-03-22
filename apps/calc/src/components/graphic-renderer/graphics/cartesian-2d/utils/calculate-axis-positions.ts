import { GRAPHIC_MIN_PADDING } from "../../../components/svg-graphic-container";
import {
  GraphicDimensions,
  GraphicLimits,
  Ticks,
} from "../../../graphic-renderer.types";
import { getTickNumbers, transformToSvgViewport } from "../../../graphic-utils";

export interface SingleAxisPositions {
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  tickPositions: { x: number; y: number }[];
}

export interface AxisPositions {
  xAxis?: SingleAxisPositions;
  yAxis?: SingleAxisPositions;
}

export interface CalculateAxisPrositionsArgs {
  dimensions: GraphicDimensions;
  limits: GraphicLimits;
  ticks: Ticks;
}

export function calculateAxisPrositions({
  ticks,
  limits,
  dimensions,
}: CalculateAxisPrositionsArgs) {
  const xTickPositions = getTickNumbers(
    limits.xMin,
    limits.xMax,
    ticks.xTicks
  ).map((x) => transformToSvgViewport({ x, y: 0 }, dimensions, limits));

  const yTickPositions = getTickNumbers(
    limits.yMin,
    limits.yMax,
    ticks.yTicks
  ).map((y) => transformToSvgViewport({ x: 0, y }, dimensions, limits));

  const xAxisStartPosition = transformToSvgViewport(
    {
      x: limits.xMin,
      y: 0,
    },
    dimensions,
    limits
  );

  const xAxisEndPosition = transformToSvgViewport(
    {
      x: limits.xMax,
      y: 0,
    },
    dimensions,
    limits
  );

  const yAxisStartPosition = transformToSvgViewport(
    {
      x: 0,
      y: limits.yMin,
    },
    dimensions,
    limits
  );

  const yAxisEndPosition = transformToSvgViewport(
    {
      x: 0,
      y: limits.yMax,
    },
    dimensions,
    limits
  );

  const result: AxisPositions = {};

  if (limits.yMin <= 0 && limits.yMax >= 0) {
    result.xAxis = {
      startPosition: {
        x: xAxisStartPosition.x - GRAPHIC_MIN_PADDING / 3,
        y: xAxisStartPosition.y,
      },
      endPosition: {
        x: xAxisEndPosition.x + GRAPHIC_MIN_PADDING / 3,
        y: xAxisEndPosition.y,
      },
      tickPositions: xTickPositions,
    };
  }

  console.log(limits.yMin <= 0, limits.yMax >= 0, limits.yMin);
  console.log(limits);
  if (limits.xMin <= 0 && limits.xMax >= 0) {
    result.yAxis = {
      startPosition: {
        x: yAxisStartPosition.x,
        y: yAxisStartPosition.y + GRAPHIC_MIN_PADDING / 3,
      },
      endPosition: {
        x: yAxisEndPosition.x,
        y: yAxisEndPosition.y - GRAPHIC_MIN_PADDING / 3,
      },
      tickPositions: yTickPositions,
    };
  }

  return result;
}
