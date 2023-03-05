import { Limits } from "@arithmico/engine/lib/types/graphics.types";
import {
  convertToViewPortCoordinates,
  ViewBoxDimension,
} from "@local-components/graphic/graphic-utils";
import GraphicLine from "@local-components/graphic/graphic-components/graphic-line";
import GraphicPolygon from "@local-components/graphic/graphic-components/graphic-polygon";
import { Target } from "@local-components/graphic/graphic-container";

interface YAxisProps {
  limits: Limits;
  yTicks: number;
  viewBoxDimension: ViewBoxDimension;
  target: Target;
}

export default function YAxis({
  limits,
  yTicks,
  viewBoxDimension,
  target,
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
