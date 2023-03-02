import { Limits } from "@arithmico/engine/lib/types/graphics.types";

const viewBoxPadding = 10;

export function convertToViewPortCoordinates(
  [x, y]: [number, number],
  { xMin, yMin, xMax, yMax }: Limits,
  viewBoxWidth: number,
  viewBoxHeight: number
): [number, number] {
  const vWidth = viewBoxWidth - 2 * viewBoxPadding;
  const vHeight = viewBoxHeight - 2 * viewBoxPadding;
  const w = xMax - xMin;
  const h = yMax - yMin;
  return [
    ((x - xMin) / w) * vWidth - vWidth / 2,
    -((y - yMin) / h) * vHeight + vHeight / 2,
  ];
}
