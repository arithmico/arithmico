import { Limits } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { convertToViewPortCoordinates } from "./graphicContainer";
import XAxis from "./x-axis";
import YAxis from "./y-axis";

interface CoordinateGridProps {
  limits: Limits;
  xTicks: number;
  yTicks: number;
}

export default function CoordinateGrid({
  limits,
  xTicks,
  yTicks,
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

  console.log(rowLevels);

  return (
    <>
      {yMin <= 0 && yMax >= 0 && <XAxis limits={limits} xTicks={xTicks} />}
      {xMin <= 0 && xMax >= 0 && <YAxis limits={limits} yTicks={yTicks} />}
      {rowLevels.map((y) => (
        <GridRow
          start={rowStartX}
          stop={rowStopX}
          y={y}
          xTicks={xTicks}
          limits={limits}
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
}

function GridRow({ start, stop, xTicks, y, limits }: GridRowProps) {
  const points: [number, number][] = [];
  console.log(start, stop, xTicks);

  for (let x = start; x <= stop; x += xTicks) {
    points.push(convertToViewPortCoordinates([x, y], limits));
  }

  return (
    <>
      {points.map(([x, y]) => (
        <circle
          cx={x}
          cy={y}
          r={0.5}
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
