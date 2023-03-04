import { Limits } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import XAxis from "./x-axis";
import YAxis from "./y-axis";
import {
  convertToViewPortCoordinates,
  Coordinate, ViewBoxDimension,
} from "@local-components/graphic/graphic-utils";

interface CoordinateGridProps {
  limits: Limits;
  xTicks: number;
  yTicks: number;
  viewBoxDimension: ViewBoxDimension;
}

export default function CoordinateGrid({
  limits,
  xTicks,
  yTicks,
  viewBoxDimension,
}: CoordinateGridProps) {
  const { xMin, yMin, xMax, yMax } = limits;

  const rowStartX = xMin % xTicks === 0 ? xMin : xMin - (xMin % xTicks);
  const rowStopX = xMax % xTicks === 0 ? xMax : xMax - (xMax % xTicks);
  const rowStartY = yMin % yTicks === 0 ? yMin : yMin - (yMin % yTicks);
  const rowStopY = yMax % yTicks === 0 ? yMax : yMax - (yMax % yTicks);
  const rowLevels: number[] = [];

  for (let y = rowStartY; y <= rowStopY; y += yTicks) {
    rowLevels.push(y);
  }

  return (
    <>
      {yMin <= 0 && yMax >= 0 && (
        <XAxis
          limits={limits}
          xTicks={xTicks}
          viewBoxDimension={viewBoxDimension}
        />
      )}
      {xMin <= 0 && xMax >= 0 && (
        <YAxis
          limits={limits}
          yTicks={yTicks}
          viewBoxDimension={viewBoxDimension}
        />
      )}
      {rowLevels.map((y) => (
        <GridRow
          start={rowStartX}
          stop={rowStopX}
          y={y}
          xTicks={xTicks}
          limits={limits}
          viewBoxDimension={viewBoxDimension}
          key={y}
        />
      ))}
    </>
  );
}

interface GridRowProps {
  start: number;
  stop: number;
  xTicks: number;
  y: number;
  limits: Limits;
  viewBoxDimension: ViewBoxDimension;
}

function GridRow({
  start,
  stop,
  xTicks,
  y,
  limits,
  viewBoxDimension,
}: GridRowProps) {
  const points: Coordinate[] = [];

  for (let x = start; x <= stop; x += xTicks) {
    points.push(
      convertToViewPortCoordinates({ x, y }, limits, viewBoxDimension)
    );
  }

  return (
    <>
      {points.map(({ x, y }, index) => (
        <circle
          cx={x}
          cy={y}
          r={0.5}
          key={index}
          className={classNames(
            "theme-dark:fill-white",
            "theme-light:fill-black"
          )}
        />
      ))}
      ;
    </>
  );
}
