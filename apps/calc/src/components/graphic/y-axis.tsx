import classNames from "classnames";
import { Limits } from "@arithmico/engine/lib/types/graphics.types";
import { convertToViewPortCoordinates } from "@local-components/graphic/graphic-utils";

interface YAxisProps {
  limits: Limits;
  yTicks: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
}

export default function YAxis({
  limits,
  yTicks,
  viewBoxWidth,
  viewBoxHeight,
}: YAxisProps) {
  const startPoint = convertToViewPortCoordinates(
    [0, limits.yMin],
    limits,
    viewBoxWidth,
    viewBoxHeight
  );
  const endPoint = convertToViewPortCoordinates(
    [0, limits.yMax],
    limits,
    viewBoxWidth,
    viewBoxHeight
  );
  const arrowPoints = [
    [endPoint[0], endPoint[1] - 10],
    [endPoint[0] - 3, endPoint[1]],
    [endPoint[0] + 3, endPoint[1]],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <>
      <line
        x1={startPoint[0]}
        y1={startPoint[1]}
        x2={endPoint[0]}
        y2={endPoint[1]}
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
