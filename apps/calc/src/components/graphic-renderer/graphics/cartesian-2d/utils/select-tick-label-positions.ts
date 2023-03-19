import { TickLabelPositions } from "./calculate-tick-label-positions";
import { filterTickLabelCollisions } from "./compute-collisions";

export interface SelectTickLabelPositionsArgs {
  tickLabelPositions: TickLabelPositions;
  collisionPoints: { x: number; y: number }[];
}

export function selectTickLabelPositions({
  tickLabelPositions,
  collisionPoints,
}: SelectTickLabelPositionsArgs): TickLabelPositions {
  const result: TickLabelPositions = {};

  if (tickLabelPositions.xAxis) {
    result.xAxis = filterTickLabelCollisions({
      tickLabelPositions: tickLabelPositions.xAxis,
      collisionPoints,
    });
  }

  if (tickLabelPositions.yAxis) {
    result.yAxis = filterTickLabelCollisions({
      tickLabelPositions: tickLabelPositions.yAxis,
      collisionPoints,
    });
  }

  return result;
}
