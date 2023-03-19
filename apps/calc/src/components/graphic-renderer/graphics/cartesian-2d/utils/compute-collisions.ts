import { TickLabelPosition } from "./calculate-tick-label-positions";

function check1DCollision(
  x1: number,
  w1: number,
  x2: number,
  w2: number
): boolean {
  return (x2 >= x1 && x2 <= x1 + w1) || (x2 + w2 >= x1 && x2 + w2 <= x1 + w1);
}

function checkSymmetric1DCollision(
  x1: number,
  w1: number,
  x2: number,
  w2: number
): boolean {
  return check1DCollision(x1, w1, x2, w2) || check1DCollision(x2, w2, x1, w1);
}
function checkHitboxCollision(
  hitboxA: TickLabelPosition["hitbox"],
  hitboxB: TickLabelPosition["hitbox"]
): boolean {
  return (
    checkSymmetric1DCollision(
      hitboxA.x,
      hitboxA.wdith,
      hitboxB.x,
      hitboxB.wdith
    ) &&
    checkSymmetric1DCollision(
      hitboxA.y,
      hitboxA.height,
      hitboxB.y,
      hitboxB.height
    )
  );
}

export interface FilterTickLabelCollisionsArgs {
  tickLabelPositions: TickLabelPosition[];
  collisionPoints: { x: number; y: number }[];
}

export function filterTickLabelCollisions({
  tickLabelPositions,
  collisionPoints,
}: FilterTickLabelCollisionsArgs) {
  const filteredTicks = tickLabelPositions.filter(({ hitbox }) => {
    return !collisionPoints.some(({ x: px, y: py }) => {
      return (
        px >= hitbox.x &&
        px <= hitbox.x + hitbox.wdith &&
        py >= hitbox.y &&
        py <= hitbox.y + hitbox.height
      );
    });
  });
  const result: TickLabelPosition[] = [];
  filteredTicks.forEach((tick) => {
    if (
      !result.some((otherTick) =>
        checkHitboxCollision(tick.hitbox, otherTick.hitbox)
      )
    ) {
      result.push(tick);
    }
  });
  return result;
}
