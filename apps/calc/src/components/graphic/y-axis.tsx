import classNames from "classnames";
import { Limits } from "@arithmico/engine/lib/types/graphics.types";
import {convertToViewPortCoordinates, ViewBoxDimension} from "@local-components/graphic/graphic-utils";

interface YAxisProps {
  limits: Limits;
  yTicks: number;
  viewBoxDimension: ViewBoxDimension;
}

export default function YAxis({
  limits,
  yTicks,
  viewBoxDimension,
}: YAxisProps) {
  const startPoint = convertToViewPortCoordinates(
    { x: 0, y: limits.yMin },
    limits,
    viewBoxDimension
  );
  const endPoint = convertToViewPortCoordinates(
    { x: 0, y: limits.yMax },
    limits,
    viewBoxDimension
  );
  const arrowPoints = [
    [endPoint.x, endPoint.y - 10],
    [endPoint.x - 3, endPoint.y],
    [endPoint.x + 3, endPoint.y],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <>
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        className={classNames(
          "stroke-1",
          "theme-light:stroke-black",
          "theme-dark:stroke-white"
        )}
      />
      <polygon
        points={arrowPoints}
        className={classNames(
          "theme-light:fill-black",
          "theme-dark:fill-white"
        )}
      />
    </>
  );
}
