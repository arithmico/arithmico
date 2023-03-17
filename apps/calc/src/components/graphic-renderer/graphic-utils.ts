import {
  GraphicDimensions,
  GraphicLimits,
} from "@local-components/graphic-renderer/graphic-renderer.types";

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
