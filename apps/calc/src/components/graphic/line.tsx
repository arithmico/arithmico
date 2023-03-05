import { Limits, Point2D } from "@arithmico/engine/lib/types";
import {
  convertToViewPortCoordinates,
  ViewBoxDimension,
} from "@local-components/graphic/graphic-utils";
import { Target } from "@local-components/graphic/graphic-container";
import GraphicPath from "@local-components/graphic/graphic-components/graphic-path";

interface LineProps {
  points: Point2D[];
  limits: Limits;
  viewBoxDimension: ViewBoxDimension;
  target: Target;
}

export default function Line({
  points,
  limits,
  viewBoxDimension,
  target,
}: LineProps) {
  const pathString = points
    .map(({ x, y }, index) => {
      const { x: viewX, y: viewY } = convertToViewPortCoordinates(
        { x, y },
        limits,
        viewBoxDimension
      );
      return `${index === 0 ? "M" : "L"} ${viewX} ${viewY}`;
    })
    .join(" ");

  return <GraphicPath d={pathString} target={target} />;
}
