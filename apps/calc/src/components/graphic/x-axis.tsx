import { Limits } from "@arithmico/engine/lib/types/graphics.types";
import {
  convertToViewPortCoordinates,
  ViewBoxDimension,
} from "@local-components/graphic/graphic-utils";
import GraphicLine from "@local-components/graphic/graphic-components/graphic-line";
import { Target } from "@local-components/graphic/graphic-container";
import GraphicPolygon from "@local-components/graphic/graphic-components/graphic-polygon";

interface XAxisProps {
  limits: Limits;
  xTicks: number;
  viewBoxDimension: ViewBoxDimension;
  target: Target;
}

export default function XAxis({
  limits,
  xTicks,
  viewBoxDimension,
  target,
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
      <GraphicLine
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        target={target}
      />
      <GraphicPolygon points={arrowPoints} target={target} />
    </>
  );
}
