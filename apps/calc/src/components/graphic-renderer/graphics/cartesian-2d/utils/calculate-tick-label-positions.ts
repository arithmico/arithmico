import {
  GraphicDimensions,
  GraphicLimits,
  Ticks,
} from "../../../graphic-renderer.types";
import { getTickNumbers, transformToSvgViewport } from "../../../graphic-utils";

export const X_TICK_LABEL_OFFSET = 0.035;
export const Y_TICK_LABEL_OFFSET = 0.02;
export const TICK_LABEL_HITBOX_HEIGHT = 0.035;
export const TICK_LABEL_HITBOX_WIDTH_PER_CHARACTER = 0.025;

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
  hitbox: {
    x: number;
    y: number;
    wdith: number;
    height: number;
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
  ).flatMap((x): TickLabelPosition[] => {
    const position = transformToSvgViewport({ x, y: 0 }, dimensions, limits);
    const value = Math.round(x * Math.pow(10, 10)) * Math.pow(10, -10);
    const hitboxWidth =
      value.toString().length * TICK_LABEL_HITBOX_WIDTH_PER_CHARACTER;
    return [
      {
        type: TickLabelPositionType.Primary,
        value,
        position: {
          x: position.x,
          y: position.y + X_TICK_LABEL_OFFSET,
        },
        hitbox: {
          x: position.x - hitboxWidth / 2,
          y: position.y - TICK_LABEL_HITBOX_HEIGHT / 2 + X_TICK_LABEL_OFFSET,
          wdith: hitboxWidth,
          height: TICK_LABEL_HITBOX_HEIGHT,
        },
      },
      {
        type: TickLabelPositionType.Secondary,
        value,
        position: {
          x: position.x,
          y: position.y - X_TICK_LABEL_OFFSET,
        },
        hitbox: {
          x: position.x - hitboxWidth / 2,
          y: position.y - TICK_LABEL_HITBOX_HEIGHT / 2 - X_TICK_LABEL_OFFSET,
          wdith: hitboxWidth,
          height: TICK_LABEL_HITBOX_HEIGHT,
        },
      },
    ];
  });

  const yTickLabelPositions = getTickNumbers(
    limits.yMin,
    limits.yMax,
    ticks.yTicks
  ).flatMap((y): TickLabelPosition[] => {
    const position = transformToSvgViewport({ x: 0, y }, dimensions, limits);
    const value = Math.round(y * Math.pow(10, 10)) * Math.pow(10, -10);
    const hitboxWidth =
      value.toString().length * TICK_LABEL_HITBOX_WIDTH_PER_CHARACTER;
    return [
      {
        type: TickLabelPositionType.Primary,
        value,
        position: {
          x: position.x - Y_TICK_LABEL_OFFSET,
          y: position.y,
        },
        hitbox: {
          x: position.x - hitboxWidth - Y_TICK_LABEL_OFFSET,
          y: position.y - TICK_LABEL_HITBOX_HEIGHT / 2,
          wdith: hitboxWidth,
          height: TICK_LABEL_HITBOX_HEIGHT,
        },
      },
      {
        type: TickLabelPositionType.Secondary,
        value,
        position: {
          x: position.x + Y_TICK_LABEL_OFFSET,
          y: position.y,
        },
        hitbox: {
          x: position.x + Y_TICK_LABEL_OFFSET,
          y: position.y - TICK_LABEL_HITBOX_HEIGHT / 2,
          wdith: hitboxWidth,
          height: TICK_LABEL_HITBOX_HEIGHT,
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
