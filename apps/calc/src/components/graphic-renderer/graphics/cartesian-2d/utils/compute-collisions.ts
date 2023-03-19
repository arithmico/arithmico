import { TickLabelPosition } from "./calculate-tick-label-positions";

const TICK_LABEL_HITBOX_SIZE = 0.05;

export interface FilterTickLabelCollisionsArgs {
  tickLabelPositions: TickLabelPosition[];
  collisionPoints: { x: number; y: number }[];
}

export function filterTickLabelCollisions({
  tickLabelPositions,
  collisionPoints,
}: FilterTickLabelCollisionsArgs) {
  return tickLabelPositions.filter(({ position: { x, y }, value }) => {
    const hitboxLength = value.toString().length * TICK_LABEL_HITBOX_SIZE;
    return !collisionPoints.some(({ x: px, y: py }) => {
      return (
        px >= x - hitboxLength / 2 &&
        px <= x + hitboxLength / 2 &&
        py >= y - TICK_LABEL_HITBOX_SIZE / 2 &&
        py <= y + TICK_LABEL_HITBOX_SIZE / 2
      );
    });
  });
}
