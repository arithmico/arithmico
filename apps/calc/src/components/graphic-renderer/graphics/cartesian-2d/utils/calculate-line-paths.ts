import { Limits, Line2D } from "@arithmico/engine/lib/types";
import { GraphicDimensions } from "../../../graphic-renderer.types";
import { transformToSvgViewport } from "../../../graphic-utils";

interface CalculateLinePathsArgs {
  lines: Line2D[];
  limits: Limits;
  dimensions: GraphicDimensions;
}

export interface LinePathPositions {
  points: { x: number; y: number }[];
  style: Line2D["style"];
}

export function calculateLinePaths({
  lines,
  limits,
  dimensions,
}: CalculateLinePathsArgs): LinePathPositions[] {
  return lines.map((line) => ({
    points: line.points.map((point) =>
      transformToSvgViewport(point, dimensions, limits)
    ),
    style: line.style,
  }));
}
