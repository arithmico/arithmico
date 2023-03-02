import { Limits, Point2D } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import {convertToViewPortCoordinates} from "@local-components/graphic/graphic-utils";

interface LineProps {
  points: Point2D[];
  limits: Limits;
  viewBoxWidth: number;
  viewBoxHeight: number;
}

export default function Line({
  points,
  limits,
  viewBoxWidth,
  viewBoxHeight,
}: LineProps) {
  const pathString = points
    .map(([x, y], index) => {
      const [viewX, viewY] = convertToViewPortCoordinates(
        [x, y],
        limits,
        viewBoxWidth,
        viewBoxHeight
      );
      return `${index === 0 ? "M" : "L"} ${viewX} ${viewY}`;
    })
    .join(" ");

  return (
    <path
      d={pathString}
      className={classNames(
        "stroke-1",
        "fill-none",
        "theme-dark:stroke-white",
        "theme-light:stroke-black"
      )}
    />
  );
}
