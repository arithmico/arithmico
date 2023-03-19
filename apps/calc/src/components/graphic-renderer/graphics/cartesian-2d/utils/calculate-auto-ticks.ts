import { GraphicNode } from "@arithmico/engine/lib/types";
import { GraphicDimensions } from "../../../graphic-renderer.types";

const autoTickSizes = [1, 2, 2.5, 5];
const desiredXTickCount = 10;

function applyMagnitudeToAutoTickSizes(m: number) {
  return autoTickSizes.map((x) => x * Math.pow(10, m));
}

function getMagnitude(x: number) {
  return x === 0 ? 0 : Math.floor(Math.log10(Math.abs(x)));
}

export interface CalculateAutoTicksArgs {
  graphic: GraphicNode;
  dimensions: GraphicDimensions;
}

export function calculateAutoTicks({
  graphic,
  dimensions,
}: CalculateAutoTicksArgs) {
  const graphicWidth = graphic.limits.xMax - graphic.limits.xMin;
  const graphicHeight = graphic.limits.yMax - graphic.limits.yMin;
  const scaledGraphicWidth = graphicWidth * dimensions.width;
  const scaledGraphicHeight = graphicHeight * dimensions.height;

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

  const heightMagnitudeCorrection =
    getMagnitude(scaledGraphicWidth / scaledGraphicHeight) + 1;

  const heightMagnitude = widthMagnitude - heightMagnitudeCorrection;
  console.log(widthMagnitude, heightMagnitude, heightMagnitudeCorrection);
  const autoYTicks = [heightMagnitude - 1, heightMagnitude, heightMagnitude + 1]
    .flatMap((m) => applyMagnitudeToAutoTickSizes(m))
    .map((tickSize) => {
      const xTickLength = (autoXTicks / graphicWidth) * dimensions.width;
      const yTickLength = (tickSize / graphicHeight) * dimensions.height;
      return {
        tickSize,
        desiredTickSizeError: Math.abs(
          Math.max(xTickLength / yTickLength, yTickLength / xTickLength)
        ),
      };
    })
    .sort((x, y) => x.desiredTickSizeError - y.desiredTickSizeError)
    .at(0)!.tickSize;

  return {
    xTicks: autoXTicks,
    yTicks: autoYTicks,
  };
}
