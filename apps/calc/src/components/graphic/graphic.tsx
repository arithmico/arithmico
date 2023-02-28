import { GraphicNode, Limits } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import CoordinateGrid from "./coordinate-grid";
import Line from "./line";

const viewBoxPadding = 10;
const viewBoxHeight = 210;
const viewBoxWidth = 297;
const viewBox = `${-viewBoxWidth / 2} ${
  -viewBoxHeight / 2
} ${viewBoxWidth} ${viewBoxHeight}`;

const tickSizes = [
  1 / 2,
  5 / 2,
  10 / 3,
  2,
  1,
  1 / 2,
  1 / 3,
  1 / 4,
  1 / 5,
  1 / 8,
];

function getMagnitude(x: number) {
  return x === 0 ? 1 : Math.floor(Math.log10(x));
}

function getXTicks(width: number, preferredTickCount = 14) {
  const magnitude = getMagnitude(width);

  return tickSizes
    .map((tickSize) => ({
      tickSize: Math.pow(10, magnitude) * tickSize,
    }))
    .map(({ tickSize }) => ({
      tickSize,
      tickCount: width / tickSize,
    }))
    .sort(
      (a, b) =>
        Math.abs(a.tickCount - preferredTickCount) -
        Math.abs(b.tickCount - preferredTickCount)
    )[0].tickSize;
}

function getYTicks(height: number, xTicks: number) {
  const magnitude = getMagnitude(height);

  return tickSizes
    .map((tickSize) => ({ tickSize: Math.pow(10, magnitude) * tickSize }))
    .map(({ tickSize }) => ({
      tickSize,
      aspectRatio: tickSize / Math.SQRT2 / xTicks,
    }))
    .map(({ tickSize, aspectRatio }) => ({
      tickSize,
      maxAspectRatio: Math.max(aspectRatio, 1 / aspectRatio),
    }))
    .sort((a, b) => a.maxAspectRatio - b.maxAspectRatio)[0].tickSize;
}

function getTicks(limits: Limits) {
  const width = limits.xMax - limits.xMin;
  const height = limits.yMax - limits.yMin;
  const xTicks = getXTicks(width);
  const yTicks = getYTicks(height, xTicks);

  return {
    xTicks,
    yTicks,
  };
}

export function convertToViewPortCoordinates(
  [x, y]: [number, number],
  { xMin, yMin, xMax, yMax }: Limits
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
  const limits = graphic.limits;
  const ticks = getTicks(limits);
  console.log(graphic);
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
      <svg viewBox={viewBox} className={classNames("max-h-full")}>
        <CoordinateGrid
          limits={limits}
          xTicks={graphic.xTicks === "auto" ? ticks.xTicks : graphic.xTicks}
          yTicks={graphic.yTicks === "auto" ? ticks.yTicks : graphic.yTicks}
        />
        {graphic.lines.map(({ points }, index) => (
          <Line points={points} limits={limits} key={index} />
        ))}
      </svg>
    </div>
  );
}
