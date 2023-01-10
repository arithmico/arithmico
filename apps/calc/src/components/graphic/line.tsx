import { Limits, Point2D } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { convertToViewPortCoordinates } from "./graphic";

interface LineProps {
  points: Point2D[];
  limits: Limits;
}

export default function Line({ points, limits }: LineProps) {
  const pathString = points
    .map(([x, y], index) => {
      const [viewX, viewY] = convertToViewPortCoordinates([x, y], limits);
      return `${index === 0 ? "M" : "L"} ${viewX} ${viewY}`;
    })
    .join(" ");

  return (
    <path
      d={pathString}
      className={classNames("stroke-1", "stroke-white", "fill-none")}
    />
  );
}
