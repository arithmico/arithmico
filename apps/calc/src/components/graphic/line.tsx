import { Limits, Point2D } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import {convertToViewPortCoordinates, ViewBoxDimension} from "@local-components/graphic/graphic-utils";

interface LineProps {
  points: Point2D[];
  limits: Limits;
  viewBoxDimension: ViewBoxDimension;
}

export default function Line({ points, limits, viewBoxDimension }: LineProps) {
  const pathString = points
    .map(([x, y], index) => {
      const { x: viewX, y: viewY } = convertToViewPortCoordinates(
        { x, y },
        limits,
        viewBoxDimension
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
