import classNames from "classnames";
import { Limits } from "@arithmico/engine/lib/types/graphics.types";
import {
  convertToViewPortCoordinates,
  ViewBoxDimension,
} from "@local-components/graphic/graphic-utils";

interface XAxisProps {
  limits: Limits;
  xTicks: number;
  viewBoxDimension: ViewBoxDimension;
}

export default function XAxis({
  limits,
  xTicks,
  viewBoxDimension,
}: XAxisProps) {
  const startPoint = convertToViewPortCoordinates(
    { x: limits.xMin, y: 0 },
    limits,
    viewBoxDimension
  );
  const endPoint = convertToViewPortCoordinates(
    { x: limits.xMax, y: 0 },
    limits,
    viewBoxDimension
  );
  const arrowPoints = [
    [endPoint.x, endPoint.y - 3],
    [endPoint.x, endPoint.y + 3],
    [endPoint.x + 10, endPoint.y],
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
