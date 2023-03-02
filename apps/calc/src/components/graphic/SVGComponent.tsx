import classNames from "classnames";
import CoordinateGrid from "@local-components/graphic/coordinate-grid";
import Line from "@local-components/graphic/line";
import {GraphicNode,} from "@arithmico/engine/lib/types/graphics.types";

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
  return x === 0 ? 1 : Math.floor(Math.log10(Math.abs(x)));
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

interface SVGComponentProps {
  graphic: GraphicNode;
  viewBoxWidth: number;
  viewBoxHeight: number;
}

export default function SVGComponent({
  graphic,
  viewBoxWidth,
  viewBoxHeight,
}: SVGComponentProps) {
  const viewBox = `${-viewBoxWidth / 2} ${
    -viewBoxHeight / 2
  } ${viewBoxWidth} ${viewBoxHeight}`;

  const limits = graphic.limits;
  const width = limits.xMax - limits.xMin;
  const height = limits.yMax - limits.yMin;
  const xTicks = graphic.xTicks === "auto" ? getXTicks(width) : graphic.xTicks;
  const yTicks =
    graphic.yTicks === "auto" ? getYTicks(height, xTicks) : graphic.yTicks;

  return (
    <svg viewBox={viewBox} className={classNames("max-h-full")}>
      <CoordinateGrid
        limits={limits}
        xTicks={xTicks}
        yTicks={yTicks}
        viewBoxWidth={viewBoxWidth}
        viewBoxHeight={viewBoxHeight}
      />
      {graphic.lines.map(({ points }, index) => (
        <Line
          points={points}
          limits={limits}
          viewBoxHeight={viewBoxHeight}
          viewBoxWidth={viewBoxWidth}
          key={index}
        />
      ))}
    </svg>
  );
}
