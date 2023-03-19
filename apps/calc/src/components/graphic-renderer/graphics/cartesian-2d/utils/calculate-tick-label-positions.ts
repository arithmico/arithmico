import {
  GraphicDimensions,
  GraphicLimits,
  Ticks,
} from "../../../graphic-renderer.types";
import { getTickNumbers, transformToSvgViewport } from "../../../graphic-utils";

export const X_TICK_LABEL_OFFSET = 0.035;
export const Y_TICK_LABEL_OFFSET = 0.02;

export enum TickLabelPositionType {
  Primary,
  Secondary,
}

export interface TickLabelPosition {
  type: TickLabelPositionType;
  value: number;
  position: {
    x: number;
    y: number;
  };
}

export interface TickLabelPositions {
  xAxis?: TickLabelPosition[];
  yAxis?: TickLabelPosition[];
}

export interface CalculateTickLabelPrositionsArgs {
  dimensions: GraphicDimensions;
  limits: GraphicLimits;
  ticks: Ticks;
}

export function calculateTickLabelPositions({
  dimensions,
  limits,
  ticks,
}: CalculateTickLabelPrositionsArgs): TickLabelPositions {
  const xTickLabelPositions = getTickNumbers(
    limits.xMin,
    limits.xMax,
    ticks.xTicks
  ).flatMap((x) => {
    const position = transformToSvgViewport({ x, y: 0 }, dimensions, limits);
    const value = Math.round(x * Math.pow(10, 10)) * Math.pow(10, -10);
    return [
      {
        type: TickLabelPositionType.Primary,
        value,
        position: {
          x: position.x,
          y: position.y + X_TICK_LABEL_OFFSET,
        },
      },
      {
        type: TickLabelPositionType.Secondary,
        value,
        position: {
          x: position.x,
          y: position.y - X_TICK_LABEL_OFFSET,
        },
      },
    ];
  });

  const yTickLabelPositions = getTickNumbers(
    limits.yMin,
    limits.yMax,
    ticks.yTicks
  ).flatMap((y) => {
    const position = transformToSvgViewport({ x: 0, y }, dimensions, limits);
    const value = Math.round(y * Math.pow(10, 10)) * Math.pow(10, -10);
    return [
      {
        type: TickLabelPositionType.Primary,
        value,
        position: {
          x: position.x - Y_TICK_LABEL_OFFSET,
          y: position.y,
        },
      },
      {
        type: TickLabelPositionType.Secondary,
        value,
        position: {
          x: position.x + Y_TICK_LABEL_OFFSET,
          y: position.y,
        },
      },
    ];
  });

  const result: TickLabelPositions = {};

  if (limits.xMin <= 0 && limits.xMax >= 0) {
    result.xAxis = xTickLabelPositions;
  }

  if (limits.yMin <= 0 && limits.yMax >= 0) {
    result.yAxis = yTickLabelPositions;
  }

  return result;
}
