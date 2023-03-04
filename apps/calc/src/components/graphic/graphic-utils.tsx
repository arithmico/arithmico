import {Limits} from "@arithmico/engine/lib/types/graphics.types";

const viewBoxPadding = 10;

export interface Coordinate {
  x: number;
  y: number;
}

export interface ViewBoxDimension {
  viewBoxWidth: number;
  viewBoxHeight: number;
}

export function convertToViewPortCoordinates(
  { x, y }: Coordinate,
  { xMin, yMin, xMax, yMax }: Limits,
  { viewBoxWidth, viewBoxHeight }: ViewBoxDimension
): Coordinate {
  const vWidth = viewBoxWidth - 2 * viewBoxPadding;
  const vHeight = viewBoxHeight - 2 * viewBoxPadding;
  const w = xMax - xMin;
  const h = yMax - yMin;
  return {
    x: ((x - xMin) / w) * vWidth - vWidth / 2,
    y: -((y - yMin) / h) * vHeight + vHeight / 2,
  };
}
