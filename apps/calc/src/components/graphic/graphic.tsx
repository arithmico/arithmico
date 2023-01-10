import { GraphicNode } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import CoordinateGrid from "./coordinate-grid";
import Line from "./line";

const viewBoxPadding = 10;
const viewBoxHeight = 210;
const viewBoxWidth = 297;
const viewBox = `${-viewBoxWidth / 2} ${
  -viewBoxHeight / 2
} ${viewBoxWidth} ${viewBoxHeight}`;

export type Limits = [number, number, number, number];

export function convertToViewPortCoordinates(
  [x, y]: [number, number],
  [xMin, yMin, xMax, yMax]: Limits
): [number, number] {
  const vWidth = viewBoxWidth - 2 * viewBoxPadding;
  const vHeight = viewBoxHeight - 2 * viewBoxPadding;
  const w = xMax - xMin;
  const h = yMax - yMin;
  return [
    ((x - xMin) / w) * vWidth - vWidth / 2,
    -((y - yMin) / h) * vHeight + vHeight / 2,
  ];
}

interface GraphicProps {
  graphic: GraphicNode;
}

export default function Graphic({ graphic }: GraphicProps) {
  const limits: Limits = [
    graphic.xMin,
    graphic.yMin,
    graphic.xMax,
    graphic.yMax,
  ];
  return (
    <div
      className={classNames(
        "flex",
        "w-full",
        "h-full",
        "max-h-full",
        "items-center",
        "justify-center"
      )}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="meet"
        className={classNames("max-h-full")}
      >
        <CoordinateGrid
          limits={limits}
          xTicks={graphic.xTicks}
          yTicks={graphic.yTicks}
        />
        {graphic.lines.map(({ points }, index) => (
          <Line points={points} limits={limits} key={index} />
        ))}
      </svg>
    </div>
  );
}
