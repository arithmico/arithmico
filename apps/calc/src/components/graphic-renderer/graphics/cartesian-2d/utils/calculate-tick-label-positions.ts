import {
  GraphicDimensions,
  GraphicLimits,
  Ticks,
} from "../../../graphic-renderer.types";
import { getTickNumbers, transformToSvgViewport } from "../../../graphic-utils";

export const X_TICK_LABEL_OFFSET = 0.035;
export const X_TICK_LABEL_OFFSET_BRAILLE = 0.05;
export const Y_TICK_LABEL_OFFSET = 0.02;
export const TICK_LABEL_HITBOX_HEIGHT = 0.035;
export const TICK_LABEL_HITBOX_HEIGHT_BRAILLE = 0.065;
export const TICK_LABEL_HITBOX_WIDTH_PER_CHARACTER = 0.0275;
export const TICK_LABEL_HITBOX_WIDTH_PER_CHARACTER_BRAILLE = 0.08;

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
  braille: boolean;
}

export function calculateTickLabelPositions({
  dimensions,
  limits,
  ticks,
  braille,
}: CalculateTickLabelPrositionsArgs): TickLabelPositions {
  const charWidth = braille
    ? TICK_LABEL_HITBOX_WIDTH_PER_CHARACTER_BRAILLE
    : TICK_LABEL_HITBOX_WIDTH_PER_CHARACTER;
  const hitboxHeight = braille
    ? TICK_LABEL_HITBOX_HEIGHT_BRAILLE
    : TICK_LABEL_HITBOX_HEIGHT;

  const xTickLabelPositions = getTickNumbers(
    limits.xMin,
    limits.xMax,
    ticks.xTicks
  ).flatMap((x): TickLabelPosition[] => {
    const position = transformToSvgViewport({ x, y: 0 }, dimensions, limits);
    const value = Math.round(x * Math.pow(10, 10)) * Math.pow(10, -10);
    const hitboxWidth = value.toString().length * charWidth;
    const xTickOffset = braille
      ? X_TICK_LABEL_OFFSET_BRAILLE
      : X_TICK_LABEL_OFFSET;

    return [
      {
        type: TickLabelPositionType.Primary,
        value,
        position: {
          x: position.x,
          y: position.y + xTickOffset,
        },
        hitbox: {
          x: position.x - hitboxWidth / 2,
          y: position.y - hitboxHeight / 2 + xTickOffset,
          wdith: hitboxWidth,
          height: hitboxHeight,
        },
      },
      {
        type: TickLabelPositionType.Secondary,
        value,
        position: {
          x: position.x,
          y: position.y - xTickOffset,
        },
        hitbox: {
          x: position.x - hitboxWidth / 2,
          y: position.y - hitboxHeight / 2 - xTickOffset,
          wdith: hitboxWidth,
          height: hitboxHeight,
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
    const hitboxWidth = value.toString().length * charWidth;

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
          y: position.y - hitboxHeight / 2,
          wdith: hitboxWidth,
          height: hitboxHeight,
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
          y: position.y - hitboxHeight / 2,
          wdith: hitboxWidth,
          height: hitboxHeight,
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
