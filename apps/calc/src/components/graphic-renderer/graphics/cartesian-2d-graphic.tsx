import { GraphicNode } from "@arithmico/engine/lib/types";
import CoordinateGrid from "../components/coordinate-grid";
import { GraphicDimensions, RenderTarget } from "../graphic-renderer.types";

const autoTickSizes = [1, 2, 2.5, 5];
const desiredXTickCount = 10;

function applyMagnitudeToAutoTickSizes(m: number) {
  return autoTickSizes.map((x) => x * Math.pow(10, m));
}

function getMagnitude(x: number) {
  return x === 0 ? 0 : Math.floor(Math.log10(Math.abs(x)));
}

export interface Cartesian2DGraphicProps {
  target: RenderTarget;
  graphic: GraphicNode;
  dimensions: GraphicDimensions;
}

export default function Cartesian2DGraphic({
  target,
  graphic,
  dimensions,
}: Cartesian2DGraphicProps): JSX.Element {
  const graphicWidth = graphic.limits.xMax - graphic.limits.xMin;
  const graphicHeight = graphic.limits.yMax - graphic.limits.yMin;

  const widthMagnitude = getMagnitude(graphicWidth);
  const autoXTicks = [widthMagnitude - 1, widthMagnitude, widthMagnitude + 1]
    .flatMap((m) => applyMagnitudeToAutoTickSizes(m))
    .map((tickSize) => ({
      tickSize,
      desiredTickSizeError: Math.abs(
        graphicWidth / tickSize - desiredXTickCount
      ),
    }))
    .sort((x, y) => x.desiredTickSizeError - y.desiredTickSizeError)
    .at(0)!.tickSize;

  return (
    <CoordinateGrid
      dimensions={dimensions}
      target={target}
      limits={graphic.limits}
      ticks={{ xTicks: autoXTicks, yTicks: 2 }}
    />
  );
}
