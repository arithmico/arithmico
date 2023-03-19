import { TickLabelPosition } from "./calculate-tick-label-positions";

export interface FilterTickLabelCollisionsArgs {
  tickLabelPositions: TickLabelPosition[];
  collisionPoints: { x: number; y: number }[];
}

export function filterTickLabelCollisions({
  tickLabelPositions,
  collisionPoints,
}: FilterTickLabelCollisionsArgs) {
  return tickLabelPositions.filter(({ hitbox }) => {
    return !collisionPoints.some(({ x: px, y: py }) => {
      return (
        px >= hitbox.x &&
        px <= hitbox.x + hitbox.wdith &&
        py >= hitbox.y &&
        py <= hitbox.y + hitbox.height
      );
    });
  });
}
