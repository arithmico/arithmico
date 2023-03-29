import {
  TickLabelPosition,
  TickLabelPositions,
  TickLabelPositionType,
} from "./calculate-tick-label-positions";
import { filterTickLabelCollisionsWithPoints } from "./compute-collisions";

interface AxisPositions {
  axisStartPosition: { x: number; y: number };
  axisEndPosition: { x: number; y: number };
}

export interface TickLabelPositionsWithAxisPositions {
  xAxis?: { tickLabelPositions: TickLabelPosition[] } & AxisPositions;
  yAxis?: { tickLabelPositions: TickLabelPosition[] } & AxisPositions;
}

export interface SelectTickLabelPositionsArgs {
  tickLabelPositions: TickLabelPositionsWithAxisPositions;
  collisionPoints: { x: number; y: number }[];
  braille: boolean;
}

export function selectTickLabelPositions({
  tickLabelPositions,
  collisionPoints,
  braille,
}: SelectTickLabelPositionsArgs): TickLabelPositions {
  const result: TickLabelPositions = {};

  if (tickLabelPositions.xAxis) {
    const allXAxisTicks = filterTickLabelCollisionsWithPoints({
      tickLabelPositions: tickLabelPositions.xAxis.tickLabelPositions,
      otherTickLabelPositions: [],
      collisionPoints,
      braille,
    }).filter(({ position: { x, y } }) => {
      if (!tickLabelPositions.yAxis) {
        return true;
      }

      if (tickLabelPositions.yAxis.axisEndPosition.x !== x) {
        return true;
      }
      const minY = Math.min(
        tickLabelPositions.yAxis.axisEndPosition.y,
        tickLabelPositions.yAxis.axisStartPosition.y
      );
      const maxY = Math.max(
        tickLabelPositions.yAxis.axisEndPosition.y,
        tickLabelPositions.yAxis.axisStartPosition.y
      );

      if (y < minY || y > maxY) {
        return true;
      }

      return false;
    });

    const primaryXAxisTicks = allXAxisTicks.filter(
      (tick) => tick.type === TickLabelPositionType.Primary
    );
    const secondaryXAxisTicks = allXAxisTicks.filter(
      (tick) => tick.type === TickLabelPositionType.Secondary
    );

    if (primaryXAxisTicks.length >= secondaryXAxisTicks.length) {
      result.xAxis = primaryXAxisTicks;
    } else {
      result.xAxis = secondaryXAxisTicks;
    }
  }

  if (tickLabelPositions.yAxis) {
    const allYAxisTicks = filterTickLabelCollisionsWithPoints({
      tickLabelPositions: tickLabelPositions.yAxis.tickLabelPositions,
      otherTickLabelPositions: result.xAxis ?? [],
      collisionPoints,
      braille,
    }).filter(({ position: { x, y } }) => {
      if (!tickLabelPositions.xAxis) {
        return true;
      }

      if (tickLabelPositions.xAxis.axisEndPosition.y !== y) {
        return true;
      }
      const minX = Math.min(
        tickLabelPositions.xAxis.axisEndPosition.x,
        tickLabelPositions.xAxis.axisStartPosition.x
      );
      const maxX = Math.max(
        tickLabelPositions.xAxis.axisEndPosition.x,
        tickLabelPositions.xAxis.axisStartPosition.x
      );

      if (x < minX || x > maxX) {
        return true;
      }

      return false;
    });

    const primaryYAxisTicks = allYAxisTicks.filter(
      (tick) => tick.type === TickLabelPositionType.Primary
    );
    const secondaryYAxisTicks = allYAxisTicks.filter(
      (tick) => tick.type === TickLabelPositionType.Secondary
    );

    if (primaryYAxisTicks.length >= secondaryYAxisTicks.length) {
      result.yAxis = primaryYAxisTicks;
    } else {
      result.yAxis = secondaryYAxisTicks;
    }
  }

  return result;
}
