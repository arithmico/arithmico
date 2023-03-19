import {
  GraphicDimensions,
  GraphicLimits,
} from "@local-components/graphic-renderer/graphic-renderer.types";

export const TICK_LINE_LENGTH = 0.03;

export function transformToSvgViewport(
  { x, y }: { x: number; y: number },
  dimensions: GraphicDimensions,
  limits: GraphicLimits
) {
  const width = Math.abs(limits.xMin - limits.xMax);
  const height = Math.abs(limits.yMin - limits.yMax);

  return {
    x: ((x - limits.xMin) / width) * dimensions.width - dimensions.width / 2,
    y:
      -((y - limits.yMin) / height) * dimensions.height + dimensions.height / 2,
  };
}

export function getTickNumbers(min: number, max: number, spacing: number) {
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
    if (i !== max) {
      result.push(i);
    }
  }
  return result;
}
