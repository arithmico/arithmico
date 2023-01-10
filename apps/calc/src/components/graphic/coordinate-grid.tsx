import classNames from "classnames";
import { convertToViewPortCoordinates, Limits } from "./graphic";
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
  const [xMin, yMin, xMax, yMax] = limits;
  const rowStartX =
    xMin % xTicks === 0 ? xMin : xMin + xTicks - (xMin % xTicks);
  const rowStopX = xMax % xTicks === 0 ? xMax : xMax - xTicks + (xMax % xTicks);
  const rowStartY =
    yMin % yTicks === 0 ? yMin : yMin + yTicks - (yMin % yTicks);
  const rowStopY = yMax % yTicks === 0 ? yMax : yMax - yTicks + (yMax % yTicks);
  const rowLevels: number[] = [];

  for (let y = rowStartY; y <= rowStopY; y += yTicks) {
    rowLevels.push(y);
  }

  return (
    <>
      {yMin <= 0 && yMax >= 0 && <XAxis limits={limits} xTicks={xTicks} />}
      {xMin <= 0 && xMax >= 0 && <YAxis limits={limits} yTicks={yTicks} />}
      {rowLevels.map((y) => (
        <GridRow
          start={rowStartX}
          stop={rowStopX}
          y={y}
          xTicks={1}
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

  for (let x = start; x <= stop; x += xTicks) {
    points.push(convertToViewPortCoordinates([x, y], limits));
  }

  return (
    <>
      {points.map(([x, y]) => (
        <circle cx={x} cy={y} r={0.5} className={classNames("fill-white")} />
      ))}
      ;
    </>
  );
}
